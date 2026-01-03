document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initMobileMenu();
  initThemeToggle();
  initScrollEffects();
  initProjectFilter();
  initContactForm();
  initScrollToTop();
  initTypingAnimation();

  console.log("Portfolio loaded successfully!");
});

function initLoader() {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("loaded");
    6;
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 4000);
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (!menuToggle || !navLinks) {
    console.error("Menu elements not found");
    return;
  }

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    navLinks.classList.toggle("active");

    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    }
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");

    const isDark = body.classList.contains("dark-theme");

    if (isDark) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

function initScrollEffects() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveNavLink();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") return;

      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || filterValue === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const loader = submitBtn.querySelector(".submit-loader");
    const formStatus = document.getElementById("formStatus");

    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    loader.style.display = "flex";

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    setTimeout(() => {
      this.reset();

      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      loader.style.display = "none";

      if (formStatus) {
        formStatus.textContent =
          "Thank you! Your message has been sent successfully.";
        formStatus.className = "form-status success";

        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      }
    }, 2000);
  });
}

function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTop");

  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initTypingAnimation() {
  const typingElement = document.querySelector(".typing");

  if (!typingElement) return;

  const texts = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Continuous Learner",
    "Creative Thinker",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, isPaused ? 1000 : speed);
  }

  setTimeout(type, 3500);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".skill-category, .project-card, .contact-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
