/**
 * Portfolio Interactive Scripts
 * Developer: Chaitanya Sharad Patil
 */

document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------
    // 1. PRELOADER
    // ------------------------------------------------------------------
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => loader.remove(), 500);
            }, 400);
        });
    }

    // ------------------------------------------------------------------
    // 2. DYNAMIC FOOTER YEAR
    // ------------------------------------------------------------------
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ------------------------------------------------------------------
    // 3. THEME TOGGLE (NO PAGE RELOAD)
    // ------------------------------------------------------------------
    const themeBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio_theme", newTheme);
            
            showToast(`Switched to ${newTheme.toUpperCase()} mode 🌙`);
        });
    }

    // ------------------------------------------------------------------
    // 4. MOBILE HAMBURGER MENU
    // ------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                icon.className = navLinks.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });

        // Close menu on click outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });
    }

    // ------------------------------------------------------------------
    // 5. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
    // ------------------------------------------------------------------
    const progressBar = document.getElementById("progress-bar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercentage + "%";
        }

        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ------------------------------------------------------------------
    // 6. HERO TYPING EFFECT
    // ------------------------------------------------------------------
    const typingElement = document.getElementById("typing");
    if (typingElement) {
        const titles = [
            "Administrator Desktop Support L3",
            "Senior Technical Support Specialist",
            "VIP Executive Support (CEO / C-Suite)",
            "PowerShell & Batch Automation Specialist",
            "ITIL® 4 & IT Infrastructure Engineer"
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end of sentence
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // ------------------------------------------------------------------
    // 7. SKILLS CATEGORY TAB FILTERING
    // ------------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".tab-btn");
    const skillCards = document.querySelectorAll(".skill-category-card");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");

            skillCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ------------------------------------------------------------------
    // 8. SCROLLSPY ACTIVE NAV HIGHLIGHTING
    // ------------------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function scrollSpy() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${sectionId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", scrollSpy);

    // ------------------------------------------------------------------
    // 9. CLICK-TO-COPY & TOAST NOTIFICATION UTILITY
    // ------------------------------------------------------------------
    const copyButtons = document.querySelectorAll(".copy-btn");
    copyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const textToCopy = button.getAttribute("data-copy");
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`);
                }).catch(() => {
                    showToast("Failed to copy text");
                });
            }
        });
    });

    function showToast(message) {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-primary"></i> ${message}`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
