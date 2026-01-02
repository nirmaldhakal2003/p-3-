const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.querySelector(".nav-links");
const scrollTopBtn = document.getElementById("scrollTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const skillProgressBars = document.querySelectorAll(".skill-progress");
const contactForm = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  updateActiveNavLink();
});

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  navLinksContainer.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

document.addEventListener("click", (e) => {
  if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinksContainer.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

window.addEventListener("resize", () => {
  if (
    window.innerWidth > 768 &&
    navLinksContainer.classList.contains("active")
  ) {
    navLinksContainer.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

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
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

const observerOptions = {
  threshold: 0.5,
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const width = progressBar.getAttribute("data-width");

      setTimeout(() => {
        progressBar.style.width = `${width}%`;
      }, 300);

      skillObserver.unobserve(progressBar);
    }
  });
}, observerOptions);

skillProgressBars.forEach((bar) => {
  skillObserver.observe(bar);
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const subject = contactForm.querySelector(
    'input[placeholder="Subject"]'
  ).value;
  const message = contactForm.querySelector("textarea").value;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`
    );
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  heroTitle.style.opacity = "0";
  heroTitle.style.transform = "translateY(30px)";

  setTimeout(() => {
    heroTitle.style.transition = "opacity 1s ease, transform 1s ease";
    heroTitle.style.opacity = "1";
    heroTitle.style.transform = "translateY(0)";
  }, 300);

  skillProgressBars.forEach((bar) => {
    bar.style.width = "0%";
  });
});

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
