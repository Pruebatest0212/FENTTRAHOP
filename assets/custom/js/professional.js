// Navegacion profesional: marca pestaña activa segun la URL actual
(function () {
  function safeDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return value;
    }
  }

  function normalizePath(p) {
    return safeDecode((p || "").replace(/\\/g, "/"))
      .split("?")[0]
      .split("#")[0]
      .trim()
      .toLowerCase();
  }

  function getFileName(path) {
    var parts = normalizePath(path).split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "index.html";
  }

  function getCurrentFile() {
    return getFileName(window.location.pathname);
  }

  function markActiveNav() {
    var current = getCurrentFile();
    var links = document.querySelectorAll(".navbar-nav .nav-link[href]");
    links.forEach(function (link) {
      var hrefFile = getFileName(link.getAttribute("href") || "");
      var isActive = hrefFile === current || (current === "" && hrefFile === "index.html");
      if (isActive) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function enforceMobileLayout() {
    if (window.matchMedia("(max-width: 991.98px)").matches) {
      document.querySelectorAll(".navbar .navbar-buttons.mbr-section-btn").forEach(function (el) {
        el.style.display = "none";
      });

      document.querySelectorAll(".collapse, .panel-collapse").forEach(function (el) {
        el.style.display = "block";
        el.style.height = "auto";
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.position = "static";
      });

      document.querySelectorAll(".tab-content > .tab-pane").forEach(function (el) {
        el.style.display = "block";
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      markActiveNav();
      enforceMobileLayout();
    });
  } else {
    markActiveNav();
    enforceMobileLayout();
  }

  window.addEventListener("resize", enforceMobileLayout);
})();
