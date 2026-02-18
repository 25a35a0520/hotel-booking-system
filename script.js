<script>
const MAX_ROOMS = 30;
const PRICE = 2000;

let totalBookedRooms = 0;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const rooms = document.getElementById("rooms");
const amount = document.getElementById("amount");
const bookedCount = document.getElementById("bookedCount");
const msg = document.getElementById("msg");

/* ---- PAST DATE NOT ALLOWED ---- */
checkin.addEventListener("change", function () {
  let today = new Date();
  today.setHours(0,0,0,0);
  let selected = new Date(this.value);

  if (selected < today) {
    alert("Past date not allowed");
    this.value = "";
  }
});

/* ---- AMOUNT CALCULATION ---- */
rooms.addEventListener("input", calculateAmount);
checkout.addEventListener("change", calculateAmount);

function calculateAmount() {
  if (!checkin.value || !checkout.value || !rooms.value) {
    amount.value = "";
    return;
  }

  let inDate = new Date(checkin.value);
  let outDate = new Date(checkout.value);
  let days = (outDate - inDate) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    alert("Check-out must be after check-in");
    checkout.value = "";
    amount.value = "";
    return;
  }

  amount.value = "₹ " + (days * rooms.value * PRICE);
}

/* ---- BOOK NOW BUTTON ---- */
function bookNow() {
  let r = Number(rooms.value);

  if (!checkin.value || !checkout.value || !r) {
    alert("Please fill all details");
    return;
  }

  if (totalBookedRooms + r > MAX_ROOMS) {
    msg.innerText = "Rooms Filled!";
    return;
  }

  totalBookedRooms += r;
  bookedCount.innerText = totalBookedRooms;

  msg.innerText = "Booking Successful!";
  rooms.value = "";
  amount.value = "";

  if (totalBookedRooms === MAX_ROOMS) {
    msg.innerText = "Rooms Filled!";
  }
}
</script>
