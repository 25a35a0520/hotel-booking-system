const form = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const totalRoomsEl = document.getElementById("totalRooms");
const totalAmountEl = document.getElementById("totalAmount");
const dateInput = document.getElementById("date");

const roomPrices = {
    Single: 2000,
    Double: 3500,
    Deluxe: 5000
};

// Store bookings date-wise
let bookings = {};

const today = new Date();
today.setHours(0,0,0,0);

// Block past dates
const todayStr = today.toISOString().split("T")[0];
dateInput.min = todayStr;
dateInput.value = todayStr;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const roomType = document.getElementById("roomType").value;
    const selectedDateStr = dateInput.value;

    const selectedDate = new Date(selectedDateStr);
    selectedDate.setHours(0,0,0,0);

    // ❌ Past date not allowed
    if (selectedDate < today) {
        alert("Past date booking is NOT allowed!");
        return;
    }

    const price = roomPrices[roomType];

    if (!bookings[selectedDateStr]) {
        bookings[selectedDateStr] = {
            rooms: 0,
            amount: 0,
            list: []
        };
    }

    bookings[selectedDateStr].rooms += 1;
    bookings[selectedDateStr].amount += price;
    bookings[selectedDateStr].list.push(
        `${name} booked ${roomType} Room – ₹${price}`
    );

    displaySummary(selectedDateStr);
    form.reset();
    dateInput.value = selectedDateStr;
});

function displaySummary(date) {
    bookingList.innerHTML = "";

    totalRoomsEl.textContent = bookings[date].rooms;
    totalAmountEl.textContent = bookings[date].amount;

    bookings[date].list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        bookingList.appendChild(li);
    });
}
