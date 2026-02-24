let totalRooms = 0;
let totalAmount = 0;

const prices = {
    Single: 2000,
    Double: 3500,
    Deluxe: 5000
};

function goToDetails() {
    document.getElementById("details").scrollIntoView({ behavior: "smooth" });
}

function scrollToBooking() {
    document.querySelector(".booking-box").scrollIntoView({ behavior: "smooth" });

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").min = today;
    document.getElementById("date").value = today;
}

function bookNow() {
    const name = document.getElementById("name").value;
    const roomType = document.getElementById("roomType").value;

    if (name === "" || roomType === "") {
        alert("Fill all details");
        return;
    }

    totalRooms++;
    totalAmount += prices[roomType];

    document.getElementById("totalRooms").textContent = totalRooms;
    document.getElementById("totalAmount").textContent = totalAmount;

    alert("Booking Successful ✅");
}
