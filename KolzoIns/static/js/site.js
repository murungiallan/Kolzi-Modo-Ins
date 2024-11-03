// site.js
let currentPosition = 0;
const testimonials = document.querySelectorAll('.user1, .user2, .user3');
const testimonialWidth = 330; // 300px width + 30px gap
const visibleCount = 2;

function moveTestimonials() {
    const usersContainer = document.querySelector('.users');
    currentPosition++;

    if (currentPosition >= testimonials.length) {
        currentPosition = 0;
    }

    const offset = -currentPosition * testimonialWidth;
    usersContainer.style.transform = `translateX(${offset}px)`;
}

// Clone the first two testimonials and append them to the end
const users = document.querySelector('.users');
const firstTwo = Array.from(testimonials).slice(0, 2);
firstTwo.forEach(testimonial => {
    const clone = testimonial.cloneNode(true);
    users.appendChild(clone);
});

// Start the animation
setInterval(moveTestimonials, 6000); // Move every minute



let lastScrollTop = 0;
let timer = null;

// Function to handle scroll events
function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('.navs');

    // Show/hide based on scroll direction
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll;

    // Reset timer
    if (timer !== null) {
        clearTimeout(timer);
    }

    // Set timer to hide nav after 3 seconds of no scrolling
    timer = setTimeout(() => {
        if (currentScroll > 100) { // Only hide if not at top of page
            nav.classList.add('nav-hidden');
        }
    }, 3000);
}

// Function to handle smooth scrolling
function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Function to update active section in navbar
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.pageYOffset;

        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const targetId = '#' + section.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Function to show navbar when mouse moves to top of screen
function handleMouseMove(e) {
    if (e.clientY < 50) { // Mouse is within 50px of top
        document.querySelector('.navs').classList.remove('nav-hidden');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveSection();
    });

    // Add click listeners to nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Add mousemove listener
    document.addEventListener('mousemove', handleMouseMove);

    // Show navbar when mouse moves to top
    document.addEventListener('mousemove', handleMouseMove);
});




document.getElementById('appointment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form submission started"); // Debug log

    // Get form data
    const formData = {
        from_name: document.getElementById('full_name').value,
        to_name: "Admin", // Add if your template uses it
        full_name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        insurance: document.getElementById('insurance').value,
        appointment_time: document.getElementById('appointment_time').value,
        file_type: Array.from(document.getElementById('file_type').selectedOptions)
            .map(option => option.value)
            .join(', ')
    };

    // Debug logs
    console.log("Form Data:", formData);
    console.log("Service ID:", 'service_jgsjklxq'); // Replace with your actual service ID
    console.log("Template ID:", 'template_3dqg3sb');

    // Send email
    emailjs.send(
        'service_jgsjklxq',     // Replace with your actual service ID
        'template_3dqg3sb',    // Your template ID
        formData
    ).then(
        function (response) {
            console.log('SUCCESS!', response);
            alert('Appointment request sent successfully!');
            document.getElementById('appointment-form').reset();
        },
        function (error) {
            console.error('FAILED...', error);
            alert(`Failed to send email: ${error.text}`);
        }
    );
});