const form = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const totalRoomsEl = document.getElementById("totalRooms");
const totalAmountEl = document.getElementById("totalAmount");
const dateInput = document.getElementById("date");

let totalRooms = 0;
let totalAmount = 0;

// Room prices
const roomPrices = {
    Single: 2000,
    Double: 3500,
    Deluxe: 5000
};

// Today date (block past)
const today = new Date();
today.setHours(0, 0, 0, 0);

const todayStr = today.toISOString().split("T")[0];
dateInput.min = todayStr;
dateInput.value = todayStr;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const roomType = document.getElementById("roomType").value;
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(0, 0, 0, 0);

    // ❌ Past date block
    if (selectedDate < today) {
        alert("Past date booking is NOT allowed!");
        return;
    }

    const price = roomPrices[roomType];

    totalRooms += 1;
    totalAmount += price;

    totalRoomsEl.textContent = totalRooms;
    totalAmountEl.textContent = totalAmount;

    const li = document.createElement("li");
    li.textContent = `${name} booked ${roomType} Room – ₹${price}`;
    bookingList.appendChild(li);

    form.reset();
    dateInput.value = todayStr;
});
