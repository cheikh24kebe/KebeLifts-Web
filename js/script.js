// Kebelifts Data
const programs = [
    {
        title: "Core Coaching Package",
        description: "14 personalized training sessions per month, weekly check-ins, and exclusive access to educational resources.",
        image: "img/core-coaching.jpg",
        features: ["Personalized Training", "Nutrition Guidance", "Progress Tracking"],
        price: "$750/month",
        link: "#contact"
    },
    {
        title: "Flex Coaching Package",
        description: "5 in-person training sessions per month, monthly check-ins, and tailored training programs.",
        image: "img/flex-coaching.jpg",
        features: ["In-Person Sessions", "Custom Programs", "Email Support"],
        price: "$349/month",
        link: "#contact"
    },
    {
        title: "Online Training",
        description: "Customized online training programs with unlimited check-ins and FaceTime support.",
        image: "img/online-training.jpg",
        features: ["Remote Coaching", "Flexible Scheduling", "Custom Pricing"],
        price: "Custom Pricing",
        link: "#contact"
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
    console.log('Kebelifts website initialized');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize animations
    initAnimations();

    // Load training programs
    loadPrograms();

    // Load testimonials
    loadTestimonials();

    // Initialize contact form
    initContactForm();

    // Initialize review system
    initReviewSystem();

    // Initialize newsletter
    initNewsletter();

    // Initialize chatbot
    initChatbot();

    // Initialize FAQ functionality
    initFAQ();

    // Initialize navbar functionality
    initNavbar();

    // Initialize smooth scrolling
    initSmoothScrolling();
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Load training programs
function loadPrograms() {
    const programsContainer = document.querySelector('#programs .row');
    if (!programsContainer) return;

    programs.forEach((program, index) => {
        const programHTML = `
            <div class="col-md-4 animate-on-scroll" data-animation="animate__fadeInUp" style="animation-delay: ${index * 0.2}s">
                <div class="card program-card h-100">
                    <img src="${program.image}" class="card-img-top" alt="${program.title}" onerror="this.src='img/Kebelifts.jpeg'">
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

// Load testimonials
function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.reviews-scroll');
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = '';

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
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            package: document.querySelector('select').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        setTimeout(() => {
            console.log('Form submitted:', formData);
            
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Initialize review system
function initReviewSystem() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsScroll = document.getElementById('reviewsScroll');

    if (!reviewForm || !reviewsScroll) return;

    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    savedReviews.forEach(review => {
        const newReview = document.createElement('div');
        newReview.classList.add('review-item');
        newReview.innerHTML = `
            <div class="review-text">"${review.text}"</div>
            <div class="review-author"><strong>— ${review.name}</strong></div>
        `;
        reviewsScroll.appendChild(newReview);
    });

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('reviewName').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();

        if (!name || !reviewText) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        const review = { 
            name, 
            text: reviewText,
            timestamp: new Date().toISOString()
        };

        savedReviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));

        const newReview = document.createElement('div');
        newReview.classList.add('review-item');
        newReview.innerHTML = `
            <div class="review-text">"${reviewText}"</div>
            <div class="review-author"><strong>— ${name}</strong></div>
        `;

        reviewsScroll.appendChild(newReview);
        reviewForm.reset();
        showNotification('Thank you for your review!', 'success');
        newReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Initialize newsletter
function initNewsletter() {
    const newsletterForm = document.getElementById("newsletterForm");
    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
        subscriptions.push({
            email: email,
            subscribedAt: new Date().toISOString()
        });
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));

        showNotification("Thank you for joining 'THE PERSISTER'! Keep an eye on your inbox for weekly insights.", 'success');
        this.reset();
    });
}

// Initialize chatbot
function initChatbot() {
    const chatbot = document.getElementById("chatbot");
    const openChat = document.getElementById("openChat");
    const closeChat = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatbotMessages");
    const chatInput = document.getElementById("chatInput");
    const sendChat = document.getElementById("sendChat");

    if (!chatbot || !openChat) return;

    openChat.addEventListener("click", () => {
        chatbot.style.display = 'block';
        openChat.style.display = 'none';
        chatInput.focus();
    });

    if (closeChat) {
        closeChat.addEventListener("click", () => {
            chatbot.style.display = 'none';
            openChat.style.display = 'block';
        });
    }

    const sendMessage = () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addChatMessage("You", userMessage);
        chatInput.value = "";
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(userMessage);
            addChatMessage("Kebelifts AI", response);
        }, 1500);
    };

    if (sendChat) {
        sendChat.addEventListener("click", sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

    setTimeout(() => {
        addChatMessage("Kebelifts AI", "Hello! I'm your Kebelifts AI assistant. How can I help you with your fitness goals today?");
    }, 1000);
}

// Chatbot functions
function addChatMessage(sender, text) {
    const chatMessages = document.getElementById("chatbotMessages");
    if (!chatMessages) return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById("chatbotMessages");
    if (!chatMessages) return;

    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.classList.add("chat-message", "typing");
    indicator.innerHTML = `<strong>Kebelifts AI:</strong> <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
        indicator.remove();
    }
}

function getAIResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    const responses = {
        "hello": "Hello! How can I help you with your fitness goals today?",
        "hi": "Hi there! Ready to transform your fitness journey?",
        "price": "We have several packages: Core Coaching at $750/month, Flex Coaching at $349/month, and custom online training programs. Which one interests you?",
        "training": "We offer personalized training programs, 1:1 coaching sessions, and online training. What are your specific fitness goals?",
        "weight loss": "For weight loss, I recommend a combination of strength training and cardio, along with proper nutrition. Our Core Coaching package includes personalized nutrition guidance!",
        "muscle": "For muscle building, focus on progressive overload, proper nutrition with adequate protein, and consistency. Our programs are designed specifically for muscle growth!",
        "thanks": "You're welcome! Let me know if you have any other questions about our training programs or services."
    };
    
    for (const key in responses) {
        if (lowerInput.includes(key)) {
            return responses[key];
        }
    }
    
    return "I'm here to help with fitness and training questions! You can ask me about training programs, pricing, nutrition, or getting started. What would you like to know?";
}

// Initialize FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll(".accordion-button");
    
    faqItems.forEach(button => {
        button.addEventListener('click', function() {
            faqItems.forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                }
            });
            this.classList.toggle('active');
        });
    });
}

// Initialize navbar functionality
function initNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Initialize smooth scrolling - FIXED
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border: none;
        border-radius: 10px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize sample data
function initializeSampleData() {
    if (!localStorage.getItem('reviews')) {
        const sampleReviews = [
            {
                name: "Sarah Johnson",
                text: "Kebelifts completely transformed my approach to fitness. The personalized attention and expert guidance helped me achieve results I never thought possible!",
                timestamp: new Date('2024-01-15').toISOString()
            }
        ];
        localStorage.setItem('reviews', JSON.stringify(sampleReviews));
    }
}

initializeSampleData();

console.log('Kebelifts JavaScript loaded successfully!');