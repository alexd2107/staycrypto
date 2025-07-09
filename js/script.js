document.addEventListener("DOMContentLoaded", () => {

  // Fetch live crypto prices from CoinGecko
  function updatePrices() {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin&vs_currencies=usd")
      .then(response => response.json())
      .then(data => {
        document.getElementById("sol-price").textContent = `SOL: $${data.solana.usd.toFixed(2)}`;
        document.getElementById("btc-price").textContent = `BTC: $${data.bitcoin.usd.toLocaleString()}`;
      })
      .catch(error => {
        console.error("Error fetching crypto prices:", error);
      });
  }

  updatePrices();
  setInterval(updatePrices, 60000); // refresh every 60 seconds

  // Booking form on index or hotels page
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      const guests = parseInt(document.getElementById("guests").value);

      if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates.");
        return;
      }

      if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
      }

      if (guests < 1) {
        alert("Please enter a valid number of guests.");
        return;
      }

      const booking = {
        hotelName: "Skyline Villa, Dubai",
        priceSol: 2.5,
        priceBtc: 0.04,
        priceUsdt: 1200,
        checkin,
        checkout,
        guests
      };
      localStorage.setItem("staycryptoBooking", JSON.stringify(booking));

      window.location.href = "checkout.html";
    });
  }

  // Quick booking form on hotel details page
  const quickBookingForm = document.getElementById("quickBookingForm");
  if (quickBookingForm) {
    quickBookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      const guests = parseInt(document.getElementById("guests").value);

      if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates.");
        return;
      }

      if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
      }

      if (guests < 1) {
        alert("Please enter a valid number of guests.");
        return;
      }

      const booking = {
        hotelName: "Skyline Villa, Dubai",
        priceSol: 2.5,
        priceBtc: 0.04,
        priceUsdt: 1200,
        checkin,
        checkout,
        guests
      };
      localStorage.setItem("staycryptoBooking", JSON.stringify(booking));

      window.location.href = "checkout.html";
    });
  }

  // Checkout page logic
  if (window.location.pathname.endsWith("checkout.html")) {
    const booking = JSON.parse(localStorage.getItem("staycryptoBooking"));

    if (!booking) {
      alert("No booking found. Please select a hotel first.");
      window.location.href = "hotels.html";
      return;
    }

    const checkinDate = new Date(booking.checkin);
    const checkoutDate = new Date(booking.checkout);
    const diffTime = checkoutDate - checkinDate;
    const nights = diffTime / (1000 * 60 * 60 * 24);

    const totalSol = (booking.priceSol * nights).toFixed(2);
    const totalBtc = (booking.priceBtc * nights).toFixed(4);
    const totalUsdt = (booking.priceUsdt * nights).toFixed(2);

    const summaryDiv = document.querySelector(".summary");
    summaryDiv.innerHTML = `
      <p><strong>Hotel:</strong> ${booking.hotelName}</p>
      <p><strong>Check-in:</strong> ${booking.checkin}</p>
      <p><strong>Check-out:</strong> ${booking.checkout}</p>
      <p><strong>Guests:</strong> ${booking.guests}</p>
      <p><strong>Total:</strong> ${totalSol} SOL / ${totalBtc} BTC / ${totalUsdt} USDT</p>
    `;

    const confirmBtn = document.querySelector(".button");
    confirmBtn.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "confirmation.html";
    });
  }

  // Confirmation page logic
  if (window.location.pathname.endsWith("confirmation.html")) {
    const refSpan = document.getElementById("bookingRef");
    if (refSpan) {
      const randomRef = "SC-" + Math.floor(100000 + Math.random() * 900000);
      refSpan.textContent = randomRef;
    }
  }

});
