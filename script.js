const sections = document.querySelectorAll("section[id], header[id]");// for scroll animation and active link highlighting: meaning when the user scrolls to a section, the corresponding link in the navigation bar will be highlighted.
const navLinks = document.querySelectorAll(".nav-links a");

const updateActiveLink = () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

};

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// For scroll reveal animations

const animatedElements = document.querySelectorAll(
    ".section-label, section h2, .about p, .skill, .project, .timeline-item, .contact-form"
);

animatedElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {
    revealObserver.observe(element);
});


const projects = document.querySelectorAll(".project");

projects.forEach((project, index) => {

    project.style.transitionDelay = `${index * 100}ms`;

});


const skills = document.querySelectorAll(".skill");

skills.forEach((skill, index) => {

    skill.style.transitionDelay = `${index * 100}ms`;

});



// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

// Contact form handling

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkodqap"; // we use Formspree to handle form submissions. You can replace this with your own endpoint if you have one.


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            contactForm.querySelector(".submit-btn");


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        

        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Veuillez remplir tous les champs.",
                "error"
            );

            return;
        }


        // email validation using regex
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            showFormMessage(
                "Veuillez entrer une adresse email valide.",
                "error"
            );

            return;
        }




        submitButton.disabled = true;

        submitButton.textContent = "ENVOI EN COURS...";


        try {

            const response = await fetch(
                FORMSPREE_ENDPOINT,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                }
            );




            if (response.ok) {

                showFormMessage(
                    "✓ Merci ! Votre message a bien été envoyé.",
                    "success"
                );

                contactForm.reset();

            } else {

                throw new Error(
                    "Erreur lors de l'envoi."
                );

            }

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            showFormMessage(
                "Une erreur est survenue. Veuillez réessayer.",
                "error"
            );

        } finally {

            submitButton.disabled = false;

            submitButton.textContent =
                "ENVOYER LE MESSAGE";

        }

    });

}

// Function to show form messages

function showFormMessage(message, type) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent = message;

    formMessage.style.display = "block";


    if (type === "success") {

        formMessage.classList.remove("error");

        formMessage.classList.add("success");

    } else {

        formMessage.classList.remove("success");

        formMessage.classList.add("error");

    }


    /* Automatically hide */

    setTimeout(() => {

        formMessage.style.display = "none";

    }, 6000);

}



// Scroll to top button
const createScrollTopButton = () => {

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.className = "scroll-top";

    button.setAttribute(
        "aria-label",
        "Retour en haut"
    );

    document.body.appendChild(button);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

};


createScrollTopButton();



// Hero section scroll effect
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");


if (hero && heroContent) {

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;


        if (scrollY < window.innerHeight) {

            heroContent.style.transform =
                `translateY(${scrollY * 0.15}px)`;

            heroContent.style.opacity =
                Math.max(
                    0,
                    1 - scrollY / 700
                );

        }

    });

}



// Custom cursor glow effect
const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


