document.addEventListener("DOMContentLoaded", () => {
  const base = `/${window.location.pathname.split("/")[1]}`;

  // Handle Book Now clicks
  const bookNowButtons = document.querySelectorAll(".book-now");
  bookNowButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();

      const booking = {
        hotelName: button.getAttribute("data-hotel"),
        priceSol: parseFloat(button.getAttribute("data-sol")),
        priceBtc: parseFloat(button.getAttribute("data-btc")),
        priceUsdt: parseFloat(button.getAttribute("data-usdt"))
      };

      localStorage.setItem("staycryptoHotelSelection", JSON.stringify(booking));
      window.location.href = `${base}/hotel.html`;
    });
  });

  // Populate hotel info on hotel.html
  if (window.location.pathname.endsWith("hotel.html")) {
    const booking = JSON.parse(localStorage.getItem("staycryptoHotelSelection"));
    if (booking) {
      document.getElementById("hotelName").textContent = booking.hotelName;
      document.getElementById("prices").textContent = `From ${booking.priceSol} SOL / ${booking.priceBtc} BTC / ${booking.priceUsdt} USDT per night`;
    }

    const form = document.getElementById("quickBookingForm");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      const guests = parseInt(document.getElementById("guests").value);

      const fullBooking = {
        ...booking,
        checkin,
        checkout,
        guests
      };

      localStorage.setItem("staycryptoBooking", JSON.stringify(fullBooking));
      window.location.href = `${base}/checkout.html`;
    });
  }

  // Display checkout summary
  if (window.location.pathname.endsWith("checkout.html")) {
    const booking = JSON.parse(localStorage.getItem("staycryptoBooking"));
    if (booking) {
      const nights = Math.ceil((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24));
      const totalSol = booking.priceSol * nights;
      const totalBtc = booking.priceBtc * nights;
      const totalUsdt = booking.priceUsdt * nights;

      document.querySelector(".summary").innerHTML = `
        <h2>${booking.hotelName}</h2>
        <p><strong>Check-in:</strong> ${booking.checkin}</p>
        <p><strong>Check-out:</strong> ${booking.checkout}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Total for ${nights} night(s):</strong></p>
        <ul>
          <li>${totalSol.toFixed(2)} SOL</li>
          <li>${totalBtc.toFixed(4)} BTC</li>
          <li>${totalUsdt.toFixed(2)} USDT</li>
        </ul>
      `;
    }

    const confirmBtn = document.getElementById("confirmBtn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        window.location.href = `${base}/confirmation.html`;
      });
    }
  }
});
