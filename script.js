let totalRooms = 0;
let totalAmount = 0;

const prices = {
    Single: 2000,
    Double: 3500,
    Deluxe: 5000
};

function openBooking() {
    document.getElementById("bookingModal").style.display = "flex";
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").min = today;
    document.getElementById("date").value = today;
}

function closeBooking() {
    document.getElementById("bookingModal").style.display = "none";
}

function bookNow() {
    const name = document.getElementById("name").value;
    const roomType = document.getElementById("roomType").value;

    if (name === "" || roomType === "") {
        alert("Please fill all details");
        return;
    }

    totalRooms++;
    totalAmount += prices[roomType];

    document.getElementById("totalRooms").textContent = totalRooms;
    document.getElementById("totalAmount").textContent = totalAmount;

    alert("Booking Successful ✅");
    closeBooking();
}

/* SCROLL EFFECT */
window.addEventListener("scroll", () => {
    const heroText = document.getElementById("heroText");
    if (window.scrollY > 100) {
        heroText.classList.add("sticky");
    } else {
        heroText.classList.remove("sticky");
    }
});
