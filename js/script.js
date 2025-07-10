// Attach event listeners to all "Book Now" buttons
const bookNowButtons = document.querySelectorAll(".book-now");
bookNowButtons.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();

    const hotelName = button.getAttribute("data-hotel");
    const priceSol = parseFloat(button.getAttribute("data-sol"));
    const priceBtc = parseFloat(button.getAttribute("data-btc"));
    const priceUsdt = parseFloat(button.getAttribute("data-usdt"));

    const booking = {
      hotelName,
      priceSol,
      priceBtc,
      priceUsdt
    };

    localStorage.setItem("staycryptoHotelSelection", JSON.stringify(booking));

    const base = `/${window.location.pathname.split("/")[1]}`;
    window.location.href = `${base}/hotel.html`;
  });
});
