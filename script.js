document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const nameInput = document.getElementById("name");
    const dateInput = document.getElementById("date");
    const roomTypeInput = document.getElementById("roomType");

    const totalRoomsEl = document.getElementById("totalRooms");
    const totalAmountEl = document.getElementById("totalAmount");
    const bookingList = document.getElementById("bookingList");

    let totalRooms = 0;
    let totalAmount = 0;

    const prices = {
        Single: 2000,
        Double: 3500,
        Deluxe: 5000
    };

    // Set today as minimum date
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const date = dateInput.value;
        const roomType = roomTypeInput.value;

        if (name === "" || roomType === "") {
            alert("Please fill all fields");
            return;
        }

        const price = prices[roomType];

        totalRooms += 1;
        totalAmount += price;

        totalRoomsEl.textContent = totalRooms;
        totalAmountEl.textContent = totalAmount;

        const li = document.createElement("li");
        li.textContent = name + " booked " + roomType + " Room – ₹" + price;
        bookingList.appendChild(li);

        alert("Booking Successful ✅");

        form.reset();
        dateInput.value = today;
    });

});
