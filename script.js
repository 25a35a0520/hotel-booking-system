function bookRoom() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let roomType = document.getElementById("room").value;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  fetch("http://localhost:3000/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, phone, roomType, checkin, checkout
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerHTML =
      data.message + "<br>" +
      "Days: " + data.days + "<br>" +
      "Total: ₹" + data.total + "<br>" +
      "Total Bookings: " + data.totalBookings + "<br>" +
      "Total Revenue: ₹" + data.totalRevenue;
  });
}
