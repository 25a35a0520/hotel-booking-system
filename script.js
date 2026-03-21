function bookRoom() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let roomType = document.getElementById("room").value;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  let today = new Date().toISOString().split("T")[0];

  if (checkin < today) {
    document.getElementById("result").innerHTML = "Past date not allowed";
    return;
  }

  let start = new Date(checkin);
  let end = new Date(checkout);

  let days = (end - start) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    document.getElementById("result").innerHTML = "Invalid dates";
    return;
  }

  let price = {
    single: 1000,
    double: 2000,
    deluxe: 3000
  };

  let total = days * price[roomType];

  document.getElementById("result").innerHTML =
    "Booking Successful<br>" +
    "Days: " + days + "<br>" +
    "Total: ₹" + total;
}
