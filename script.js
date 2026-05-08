const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const tabButtons = document.querySelectorAll(".tab-button");
const productPanels = document.querySelectorAll(".product-panel");

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        productPanels.forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.panel === target);
        });
    });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const indicator = button?.querySelector("span:last-child");

    button?.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));

        if (indicator) {
            indicator.textContent = isOpen ? "−" : "+";
        }
    });
});

const lightbox = document.getElementById("certificateLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const certificateButtons = document.querySelectorAll(".certificate-button");

let lastFocusedElement = null;

function openCertificate(button) {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCaption) {
        return;
    }

    const src = button.dataset.certificate;
    const title = button.dataset.title || "Сертификат";

    if (!src) {
        return;
    }

    lastFocusedElement = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxCaption.textContent = "Нажмите Esc или область вне окна, чтобы закрыть.";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    lightboxClose?.focus();
}

function closeCertificate() {
    if (!lightbox || !lightboxImage) {
        return;
    }

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lightboxImage.src = "";

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
}

certificateButtons.forEach((button) => {
    button.addEventListener("click", () => openCertificate(button));
});

lightboxClose?.addEventListener("click", closeCertificate);

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeCertificate();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
        closeCertificate();
    }
});
