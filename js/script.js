// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // HOTEL.HTML booking form logic
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

      // Store booking info in localStorage
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

      // Redirect to checkout page
      window.location.href = "checkout.html";
    });
  }

  // CHECKOUT.HTML logic
  if (window.location.pathname.endsWith("checkout.html")) {
    const booking = JSON.parse(localStorage.getItem("staycryptoBooking"));

    if (!booking) {
      alert("No booking found. Please select a hotel first.");
      window.location.href = "hotels.html";
      return;
    }

    // Calculate nights
    const checkinDate = new Date(booking.checkin);
    const checkoutDate = new Date(booking.checkout);
    const diffTime = checkoutDate - checkinDate;
    const nights = diffTime / (1000 * 60 * 60 * 24);

    // Calculate total prices
    const totalSol = (booking.priceSol * nights).to*
