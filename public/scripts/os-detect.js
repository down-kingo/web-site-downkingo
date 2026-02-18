document.addEventListener("DOMContentLoaded", () => {
  const platform = window.navigator.platform;
  const userAgent = window.navigator.userAgent;

  const winCard = document.getElementById("card-windows");
  const macCard = document.getElementById("card-mac");
  const linCard = document.getElementById("card-linux");

  // Homepage explicit update
  const btnText = document.getElementById("hero-download-text");
  let osName = null;

  if (platform.indexOf("Win") !== -1) {
    osName = "Windows";
    if (winCard) {
      winCard.classList.remove("opacity-80");
      winCard.classList.add(
        "scale-105",
        "border-blue-500",
        "shadow-[0_0_30px_rgba(59,130,246,0.2)]",
        "z-10",
        "opacity-100",
      );
    }
  } else if (platform.indexOf("Mac") !== -1) {
    osName = "macOS";
    if (macCard) {
      macCard.classList.remove("opacity-80");
      macCard.classList.add(
        "scale-105",
        "border-yellow-500",
        "shadow-[0_0_30px_rgba(234,179,8,0.2)]",
        "z-10",
        "opacity-100",
      );
    }
  } else if (platform.indexOf("Linux") !== -1) {
    if (userAgent.indexOf("Ubuntu") !== -1) osName = "Linux (Ubuntu)";
    else osName = "Linux";

    if (linCard) {
      linCard.classList.remove("opacity-80");
      linCard.classList.add(
        "scale-105",
        "border-cyan-500",
        "shadow-[0_0_30px_rgba(6,182,212,0.2)]",
        "z-10",
        "opacity-100",
      );
    }
  } else if (/Android/.test(userAgent)) {
    osName = "Android";
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    osName = "iOS";
  }

  if (osName && btnText) {
    btnText.textContent = `Download for ${osName}`;
  }
});
