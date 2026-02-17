let bookings = [];   // all bookings store avuthayi

document.getElementById("bookingForm").onsubmit = function () {

    let name = document.getElementById("name").value;
    let room = document.getElementById("room").value;
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;

    // booking object create
    let booking = {
        name: name,
        room: room,
        checkin: checkin,
        checkout: checkout
    };

    // add booking to array
    bookings.push(booking);

    // success message
    document.getElementById("result").innerText =
        "Booking successful for " + name;

    // show booking list
    showBookings();

    // clear form
    document.getElementById("bookingForm").reset();

    return false; // page reload avvakunda
};

function showBookings() {

    let list = document.getElementById("bookingList");
    list.innerHTML = "";   // old list clear

    for (let i = 0; i < bookings.length; i++) {

        let li = document.createElement("li");

        li.innerText =
            bookings[i].name + " | " +
            bookings[i].room + " | " +
            bookings[i].checkin + " to " +
            bookings[i].checkout;

        list.appendChild(li);
    }
}