document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("rotating-text");

  if (textElement) {
    let words = [];
    if (textElement.dataset.words) {
      try {
        words = JSON.parse(textElement.dataset.words);
      } catch (e) {
        console.error("Invalid rotating words data");
      }
    }

    // Fallback or fallback logic
    if (words.length === 0) {
      const isPt = document.documentElement.lang.startsWith("pt");
      words = isPt
        ? ["BAIXE", "CONVERTA", "TRANSCREVA"]
        : ["DOWNLOAD", "CONVERT", "TRANSCRIBE"];
    }

    // Initial Text
    textElement.innerText = words[0];
    let currentIndex = 0;

    setInterval(() => {
      // Exit
      textElement.style.opacity = "0";
      textElement.style.transform = "translateY(-0.5em) scale(0.95)";
      textElement.style.filter = "blur(10px)";

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        textElement.innerText = words[currentIndex];

        // Reset for entry
        textElement.style.transition = "none";
        textElement.style.transform = "translateY(0.5em) scale(1.1)";
        textElement.style.filter = "blur(10px)";

        // Hardware acceleration hint
        void textElement.offsetWidth; // Force Reflow

        // Enter
        textElement.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        textElement.style.opacity = "1";
        textElement.style.transform = "translateY(0) scale(1)";
        textElement.style.filter = "blur(0)";
      }, 400); // Wait for exit
    }, 2500); // 2.5s display time
  }
});
