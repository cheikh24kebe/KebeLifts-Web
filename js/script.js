// Kebelifts Data
const programs = [
    {
        title: "Core Coaching Package",
        description: "14 personalized training sessions per month, weekly check-ins, and exclusive access to educational resources.",
        image: "img/core-coaching.jpg", // Replace with your image path
        features: ["Personalized Training", "Nutrition Guidance", "Progress Tracking"],
        price: "$750/month",
        link: "#contact"
    },
    {
        title: "Flex Coaching Package",
        description: "5 in-person training sessions per month, monthly check-ins, and tailored training programs.",
        image: "img/flex-coaching.jpg", // Replace with your image path
        features: ["In-Person Sessions", "Custom Programs", "Email Support"],
        price: "$349/month",
        link: "#contact"
    },
    {
        title: "Online Training",
        description: "Customized online training programs with unlimited check-ins and FaceTime support.",
        image: "img/online-training.jpg", // Replace with your image path
        features: ["Remote Coaching", "Flexible Scheduling", "Custom Pricing"],
        price: "Custom Pricing",
        link: "#contact"
    }
];

const merchandise = [
    {
        title: "Kebelifts T-Shirt",
        description: "High-quality cotton T-shirt with the Kebelifts logo. Available in multiple sizes and colors.",
        image: "img/merch1.jpg", // Replace with your image path
        price: "$29.99",
        link: "#"
    },
    {
        title: "Kebelifts Hoodie",
        description: "Comfortable and stylish hoodie with the Kebelifts logo. Perfect for workouts or casual wear.",
        image: "img/merch2.jpg", // Replace with your image path
        price: "$49.99",
        link: "#"
    },
    {
        title: "Kebelifts Water Bottle",
        description: "Durable and eco-friendly water bottle with the Kebelifts logo. Stay hydrated in style.",
        image: "img/merch3.jpg", // Replace with your image path
        price: "$19.99",
        link: "#"
    }
];

const testimonials = [
    {
        text: "Kebelifts transformed my fitness journey! The personalized training and support are unmatched.",
        author: "John Doe"
    },
    {
        text: "I love the Kebelifts merchandise! The hoodie is so comfortable and stylish.",
        author: "Jane Smith"
    },
    {
        text: "The water bottle is my favorite! It's durable and eco-friendly.",
        author: "Mike Johnson"
    },
    {
        text: "The gym bag is spacious and perfect for my workouts. Highly recommend!",
        author: "Sarah Lee"
    },
    {
        text: "The wristbands are a game-changer for my workouts. They absorb sweat perfectly.",
        author: "Alex Brown"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize animations
    initAnimations();

    // Load training programs
    loadPrograms();

    // Load merchandise
    loadMerchandise();

    // Load testimonials
    loadTestimonials();

    // Initialize contact form
    initContactForm();
});

// Initialize scroll animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', entry.target.dataset.animation);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Load training programs into the programs section
function loadPrograms() {
    const programsContainer = document.querySelector('#programs .row');

    programs.forEach((program, index) => {
        const programHTML = `
            <div class="col-md-4 animate-on-scroll" data-animation="animate__fadeInUp" style="animation-delay: ${index * 0.2}s">
                <div class="card program-card h-100">
                    <img src="${program.image}" class="card-img-top" alt="${program.title}">
                    <div class="card-body">
                        <h5 class="card-title">${program.title}</h5>
                        <p class="card-text">${program.description}</p>
                        <div class="mb-3">
                            ${program.features.map(feature => 
                                `<span class="badge bg-secondary feature-badge">${feature}</span>`
                            ).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">${program.price}</span>
                            <a href="${program.link}" class="btn btn-primary btn-sm">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        programsContainer.insertAdjacentHTML('beforeend', programHTML);
    });
}

// Load merchandise into the merchandise section
function loadMerchandise() {
    const merchandiseContainer = document.querySelector('#merchandise .row');

    merchandise.forEach((item, index) => {
        const merchandiseHTML = `
            <div class="col-md-4 animate-on-scroll" data-animation="animate__fadeInUp" style="animation-delay: ${index * 0.2}s">
                <div class="card merchandise-card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">${item.price}</span>
                            <a href="${item.link}" class="btn btn-primary btn-sm">
                                Buy Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        merchandiseContainer.insertAdjacentHTML('beforeend', merchandiseHTML);
    });
}

// Load testimonials into the testimonials section
function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.reviews-scroll');

    testimonials.forEach((testimonial, index) => {
        const testimonialHTML = `
            <div class="review-item">
                <div class="review-text">
                    "${testimonial.text}"
                </div>
                <div class="review-author">
                    <strong>— ${testimonial.author}</strong>
                </div>
            </div>
        `;
        testimonialsContainer.insertAdjacentHTML('beforeend', testimonialHTML);
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            package: document.querySelector('select').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        form.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add background to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Load saved reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsScroll = document.getElementById('reviewsScroll');

    // Display saved reviews on page load
    savedReviews.forEach(review => {
        const newReview = document.createElement('div');
        newReview.classList.add('review-item');
        newReview.innerHTML = `
            <div class="review-text">"${review.text}"</div>
            <div class="review-author"><strong>— ${review.name}</strong></div>
        `;
        reviewsScroll.appendChild(newReview);
    });

    // Handle form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting and refreshing the page

            // Get the values from the form
            const name = document.getElementById('reviewName').value;
            const review = document.getElementById('reviewText').value;

            // Save the review to localStorage
            savedReviews.push({ name, text: review });
            localStorage.setItem('reviews', JSON.stringify(savedReviews));

            // Create a new review element
            const newReview = document.createElement('div');
            newReview.classList.add('review-item');
            newReview.innerHTML = `
                <div class="review-text">"${review}"</div>
                <div class="review-author"><strong>— ${name}</strong></div>
            `;

            // Append the new review to the reviews section
            reviewsScroll.appendChild(newReview);

            // Clear the form fields
            document.getElementById('reviewName').value = '';
            document.getElementById('reviewText').value = '';

            // Optional: Scroll to the newly added review
            newReview.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

//chatbot AI
document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    const openChat = document.getElementById("openChat");
    const closeChat = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatbotMessages");
    const chatInput = document.getElementById("chatInput");
    const sendChat = document.getElementById("sendChat");

    openChat.addEventListener("click", () => chatbot.style.display = "block");
    closeChat.addEventListener("click", () => chatbot.style.display = "none");

    sendChat.addEventListener("click", function () {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessage("You", userMessage);
        chatInput.value = "";
        
        const response = getAIResponse(userMessage);
        setTimeout(() => addMessage("Kebelifts AI", response), 1000);
    });

    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        
        const responses = {
            "hello": "Hello! How can I help you with your fitness goals today?",
            "weight loss": "For weight loss, focus on a calorie deficit, cardio, and strength training.",
            "muscle": "I have some progam for you.",
            "best training": "Our Core Coaching Package is the best for personalized training!",
            "diet plan": "A balanced diet with protein, healthy fats, and carbs will help you reach your fitness goals!"
        };
        
        for (const key in responses) {
            if (lowerInput.includes(key)) {
                return responses[key];
            }
        }
        return "I'm not sure about that. Try asking about workouts, diet, or training plans!";
    }
});