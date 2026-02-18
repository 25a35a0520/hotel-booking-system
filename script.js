// ===== CONFIG =====
const PRICE_PER_ROOM = 2000;
const MAX_ROOMS_PER_DAY = 30;

// ===== GET ELEMENTS =====
const nameInput = document.getElementById("name");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomsInput = document.getElementById("rooms");
const amountInput = document.getElementById("amount");
const bookBtn = document.getElementById("bookBtn");
const msg = document.getElementById("msg");
const detailsTable = document.getElementById("details");
const summaryTable = document.getElementById("summary");

// ===== LOAD EXISTING BOOKINGS =====
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// ===== PAST DATE NOT ALLOWED =====
checkin.addEventListener("change", () => {
  if (!checkin.value) return;

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let selected = new Date(checkin.value);

  if (selected < today) {
    alert("Past date not allowed");
    checkin.value = "";
  }
});

// ===== AUTO AMOUNT CALCULATOR =====
roomsInput.addEventListener("input", calculateAmount);
checkout.addEventListener("change", calculateAmount);

function calculateAmount() {
  if (!checkin.value || !checkout.value || !roomsInput.value) {
    amountInput.value = "";
    return;
  }

  let inDate = new Date(checkin.value);
  let outDate = new Date(checkout.value);

  let days = (outDate - inDate) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    alert("Check-out must be after check-in");
    checkout.value = "";
    amountInput.value = "";
    return;
  }

  let total = days * roomsInput.value * PRICE_PER_ROOM;
  amountInput.value = "₹ " + total;
}

// ===== BOOK NOW =====
bookBtn.addEventListener("click", () => {
  if (
    !nameInput.value ||
    !checkin.value ||
    !checkout.value ||
    !roomsInput.value ||
    !amountInput.value
  ) {
    alert("Please fill all details");
    return;
  }

  let bookedToday = bookings
    .filter(b => b.date === checkin.value)
    .reduce((sum, b) => sum + b.rooms, 0);

  let requestedRooms = Number(roomsInput.value);

  if (bookedToday + requestedRooms > MAX_ROOMS_PER_DAY) {
    msg.innerText = "Rooms Filled for this date!";
    return;
  }

  bookings.push({
    name: nameInput.value,
    date: checkin.value,
    rooms: requestedRooms,
    amount: Number(amountInput.value.replace("₹", "").trim())
  });

  localStorage.setItem("bookings", JSON.stringify(bookings));
  msg.innerText = "Booking Successful!";

  renderTables();
  clearForm();
});

// ===== RENDER TABLES =====
function renderTables() {
  detailsTable.innerHTML = "";
  summaryTable.innerHTML = "";

  let dailySummary = {};

  bookings.forEach(b => {
    //
