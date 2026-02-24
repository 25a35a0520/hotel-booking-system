document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const bookingList = document.getElementById("bookingList");
    const totalRoomsEl = document.getElementById("totalRooms");
    const totalAmountEl = document.getElementById("totalAmount");
    const dateInput = document.getElementById("date");

    let totalRooms = 0;
    let totalAmount = 0;

    const roomPrices = {
        Single: 2000,
        Double: 3500,
        Deluxe: 5000
    };

    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const roomType = document.getElementById("roomType").value;
        const selectedDate = dateInput.value;

        if (selectedDate < today) {
            alert("Past date booking not allowed!");
            return;
        }

        const price = roomPrices[roomType];

        totalRooms++;
        totalAmount += price;

        totalRoomsEl.textContent = totalRooms;
        totalAmountEl.textContent = totalAmount;

        const li = document.createElement("li");
        li.textContent = name + " booked " + roomType + " Room - ₹" + price;
        bookingList.appendChild(li);

        form.reset();
        dateInput.value = today;
    });

});
