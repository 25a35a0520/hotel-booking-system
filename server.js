const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let rooms = {
  single: { price: 1000, available: 10 },
  double: { price: 2000, available: 5 },
  deluxe: { price: 3000, available: 5 }
};

let bookings = [];

app.post("/book", (req, res) => {
  const { name, phone, roomType, checkin, checkout } = req.body;

  let start = new Date(checkin);
  let end = new Date(checkout);
  let today = new Date();

  if (start < today.setHours(0,0,0,0)) {
    return res.json({ message: "Past date not allowed" });
  }

  let days = (end - start) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    return res.json({ message: "Invalid dates" });
  }

  if (rooms[roomType].available <= 0) {
    return res.json({ message: "No rooms available" });
  }

  let total = days * rooms[roomType].price;

  rooms[roomType].available--;

  bookings.push({ name, phone, roomType, days, total });

  let totalBookings = bookings.length;
  let totalRevenue = bookings.reduce((sum, b) => sum + b.total, 0);

  res.json({
    message: "Booking Successful",
    days,
    total,
    totalBookings,
    totalRevenue
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
