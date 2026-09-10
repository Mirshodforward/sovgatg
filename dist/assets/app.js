/* SovgaTG — kichik interaktivlik. Kutubxonasiz, ~1 KB.
   Hech narsa render qilmaydi: sahifa JS'siz ham to'liq o'qiladi (SEO uchun muhim). */
(function () {
  "use strict";

  // Navigatsiya scroll'da chegara oladi
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("stuck", window.scrollY > 8);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobil menyu
  var burger = document.getElementById("burger");
  var mmenu = document.getElementById("mmenu");
  if (burger && mmenu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mmenu.hidden = open;
    });
    mmenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        burger.setAttribute("aria-expanded", "false");
        mmenu.hidden = true;
      }
    });
  }

  // Ko'rinishga kirganda yumshoq paydo bo'lish
  var targets = document.querySelectorAll(".rv");
  if (targets.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    targets.forEach(function (t) {
      io.observe(t);
    });
  } else {
    targets.forEach(function (t) {
      t.classList.add("in");
    });
  }

  // Bir vaqtda bitta savol ochiq tursin
  var qas = document.querySelectorAll(".faq .qa");
  qas.forEach(function (qa) {
    qa.addEventListener("toggle", function () {
      if (!qa.open) return;
      qas.forEach(function (o) {
        if (o !== qa && o.parentElement === qa.parentElement) o.open = false;
      });
    });
  });
})();
