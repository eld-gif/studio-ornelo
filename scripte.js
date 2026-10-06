document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE AUTOMATIQUE
    ====================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       DÉTECTION DU TYPE DE POINTEUR
    ====================================================== */

    const finePointer = window.matchMedia("(pointer: fine)").matches;


    /* =====================================================
       CURSEUR PERSONNALISÉ
    ====================================================== */

    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".cursor-dot");

    if (cursor && cursorDot && finePointer) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let cursorX = mouseX;
        let cursorY = mouseY;

        let cursorAnimation;


        /* ---------------------------------------------
           POSITION DE LA SOURIS
        --------------------------------------------- */

        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        /* ---------------------------------------------
           ANIMATION DU CURSEUR PRINCIPAL
        --------------------------------------------- */

        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            cursorAnimation =
                window.requestAnimationFrame(animateCursor);

        }

        animateCursor();


        /* ---------------------------------------------
           ÉLÉMENTS INTERACTIFS
        --------------------------------------------- */

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, " +
            ".approach-card, .service-item, .price-plan, " +
            ".process-step, .floating-card, .browser-window, " +
            ".contact-card, .contact-sticker"
        );


        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {

                cursor.classList.add("cursor-hover");
                cursorDot.classList.add("dot-hover");

            });


            element.addEventListener("mouseleave", () => {

                cursor.classList.remove("cursor-hover");
                cursorDot.classList.remove("dot-hover");

            });

        });


        /* ---------------------------------------------
           SORTIE DE LA FENÊTRE
        --------------------------------------------- */

        window.addEventListener("blur", () => {

            cursor.classList.remove("cursor-hover");
            cursorDot.classList.remove("dot-hover");

        });


        window.addEventListener("mouseenter", () => {

            cursor.style.opacity = "1";
            cursorDot.style.opacity = "1";

        });


        window.addEventListener("mouseleave", () => {

            cursor.style.opacity = "0";
            cursorDot.style.opacity = "0";

        });

    }


    /* =====================================================
       APPARITION DES ÉLÉMENTS AU SCROLL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".approach-card, " +
        ".service-item, " +
        ".price-plan, " +
        ".process-step, " +
        ".contact-card, " +
        ".contact-sticker"
    );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            element.style.transitionDelay =
                `${Math.min(index * 0.055, 0.3)}s`;

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       HERO — EFFET 3D
    ====================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        finePointer &&
        window.innerWidth > 700
    ) {

        let heroFrame = null;


        heroVisual.addEventListener("mousemove", (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            if (!rect.width || !rect.height) {
                return;
            }


            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            if (heroFrame) {
                window.cancelAnimationFrame(heroFrame);
            }


            heroFrame =
                window.requestAnimationFrame(() => {

                    heroVisual.style.transform = `
                        perspective(1000px)
                        rotateY(${x * 5}deg)
                        rotateX(${-y * 5}deg)
                    `;

                });

        });


        heroVisual.addEventListener("mouseleave", () => {

            if (heroFrame) {
                window.cancelAnimationFrame(heroFrame);
            }


            heroVisual.style.transform = `
                perspective(1000px)
                rotateY(0deg)
                rotateX(0deg)
            `;

        });

    }


    /* =====================================================
       NAVIGATION FLUIDE
    ====================================================== */

    const navigationLinks = document.querySelectorAll(
        [
            ".main-nav a",
            ".header-button",
            ".primary-button",
            ".secondary-button",
            ".plan-button",
            ".footer-links a",
            ".contact-sticker"
        ].join(", ")
    );


    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#") ||
                targetId === "#"
            ) {
                return;
            }


            let target = null;


            try {
                target =
                    document.querySelector(targetId);
            } catch (error) {
                return;
            }


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".site-header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;


            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       FORMULES — EFFET 3D
    ====================================================== */

    const pricePlans =
        document.querySelectorAll(".price-plan");


    if (finePointer) {

        pricePlans.forEach((plan) => {

            plan.addEventListener("mousemove", (event) => {

                if (window.innerWidth <= 700) {
                    return;
                }


                const rect =
                    plan.getBoundingClientRect();


                if (!rect.width || !rect.height) {
                    return;
                }


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                if (
                    plan.classList.contains(
                        "signature-plan"
                    )
                ) {

                    plan.style.transform = `
                        translateY(-18px)
                        rotate(${1 + x * 1.5}deg)
                        rotateX(${-y * 2}deg)
                        rotateY(${x * 2}deg)
                    `;

                } else {

                    plan.style.transform = `
                        translateY(-8px)
                        rotateX(${-y * 2}deg)
                        rotateY(${x * 2}deg)
                    `;

                }

            });


            plan.addEventListener("mouseleave", () => {

                if (
                    plan.classList.contains(
                        "signature-plan"
                    )
                ) {

                    plan.style.transform =
                        "translateY(-18px) rotate(1deg)";

                } else {

                    plan.style.transform = "";

                }

            });

        });

    }


    /* =====================================================
       FORMULE CHOISIE → CONTACT
    ====================================================== */

    const planButtons =
        document.querySelectorAll(".plan-button");


    const formulaSelect =
        document.querySelector(
            'select[name="formule"]'
        );


    planButtons.forEach((button) => {

        button.addEventListener("click", () => {

            if (!formulaSelect) {
                return;
            }


            const plan =
                button.closest(".price-plan");


            if (!plan) {
                return;
            }


            if (
                plan.classList.contains(
                    "essential-plan"
                )
            ) {

                formulaSelect.value =
                    "Essentielle — 90,50 €";

            }


            if (
                plan.classList.contains(
                    "signature-plan"
                )
            ) {

                formulaSelect.value =
                    "Signature — 130 €";

            }


            /* -----------------------------------------
               PETIT RETOUR VISUEL
            ----------------------------------------- */

            formulaSelect.classList.add(
                "formula-selected"
            );


            window.setTimeout(() => {

                formulaSelect.classList.remove(
                    "formula-selected"
                );

            }, 900);

        });

    });


    /* =====================================================
       PARALLAXE DES DÉCORATIONS DU HERO
    ====================================================== */

    const heroStar =
        document.querySelector(".hero-star");


    const heroFlower =
        document.querySelector(".hero-flower");


    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        if (heroStar) {

            heroStar.style.transform =
                `translateY(${scrollY * 0.035}px)`;

        }


        if (heroFlower) {

            heroFlower.style.transform =
                `translateY(${scrollY * -0.018}px)`;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       CARTE CONTACT — MICRO INTERACTION
    ====================================================== */

    const contactCard =
        document.querySelector(".contact-card");


    if (
        contactCard &&
        finePointer
    ) {

        let contactFrame = null;


        contactCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    contactCard.getBoundingClientRect();


                if (!rect.width || !rect.height) {
                    return;
                }


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                if (contactFrame) {
                    window.cancelAnimationFrame(
                        contactFrame
                    );
                }


                contactFrame =
                    window.requestAnimationFrame(() => {

                        contactCard.style.transform = `
                            translateY(-5px)
                            rotateX(${-y * 1.5}deg)
                            rotateY(${x * 1.5}deg)
                        `;

                    });

            }
        );


        contactCard.addEventListener(
            "mouseleave",
            () => {

                if (contactFrame) {
                    window.cancelAnimationFrame(
                        contactFrame
                    );
                }


                contactCard.style.transform = "";

            }
        );

    }


    /* =====================================================
       FORMULAIRE — FOCUS DES CHAMPS
    ====================================================== */

    const contactForm =
        document.querySelector("#contactForm");


    const formStatus =
        document.querySelector("#formStatus");


    if (contactForm) {

        const fields =
            contactForm.querySelectorAll(
                "input, textarea, select"
            );


        fields.forEach((field) => {

            field.addEventListener("focus", () => {

                const label =
                    field.closest("label");


                if (label) {
                    label.classList.add(
                        "field-active"
                    );
                }

            });


            field.addEventListener("blur", () => {

                const label =
                    field.closest("label");


                if (label) {
                    label.classList.remove(
                        "field-active"
                    );
                }

            });


            /* -----------------------------------------
               EFFACER LE MESSAGE D'ERREUR
               LORSQUE L'UTILISATEUR CORRIGE
            ----------------------------------------- */

            field.addEventListener("input", () => {

                if (formStatus) {

                    formStatus.textContent = "";

                    formStatus.className =
                        "form-status";

                }

            });

        });


        /* =================================================
           ENVOI / VALIDATION DU FORMULAIRE
        ================================================== */

        contactForm.addEventListener(
    "submit",
    (event) => {

        /* Vérification des champs */

        if (!contactForm.checkValidity()) {

            event.preventDefault();

            contactForm.reportValidity();

            if (formStatus) {

                formStatus.textContent =
                    "Vérifiez les informations indiquées.";

                formStatus.className =
                    "form-status error";

            }

            return;

        }


        /* Formulaire valide : on laisse FormSubmit envoyer */

        if (formStatus) {

            formStatus.textContent =
                "Envoi de votre demande…";

            formStatus.className =
                "form-status success";

        }


        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );


        if (submitButton) {

            const buttonText =
                submitButton.querySelector("span");


            if (buttonText) {

                buttonText.textContent =
                    "Envoi en cours…";

            }

            submitButton.disabled = true;

        }

    }
);
    }


    /* =====================================================
       ACCESSIBILITÉ — ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            if (document.activeElement) {

                document.activeElement.blur();

            }

        }
    );


    /* =====================================================
       FIN
    ====================================================== */

});
