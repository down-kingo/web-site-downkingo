(function () {
  try {
    var redirectKey = "downkingo_redirected";
    if (!sessionStorage.getItem(redirectKey)) {
      var lang = navigator.language || navigator.userLanguage;
      if (lang && lang.toLowerCase().indexOf("pt") === 0) {
        sessionStorage.setItem(redirectKey, "true");
        window.location.href = "/pt/";
      }
    }
  } catch (e) {}
})();
