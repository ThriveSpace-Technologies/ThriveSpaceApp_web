// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive Questionnaire Logic
let currentSection = 1;
const totalSections = 4;
let responses = {};

// Initialize questionnaire
function initializeQuestionnaire() {
    updateProgressBar();
    updateNavigation();
    
    // Add event listeners for all options
    document.querySelectorAll('.card-option').forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });
    
    // Add navigation event listeners
    document.getElementById('prev-button').addEventListener('click', previousSection);
    document.getElementById('next-button').addEventListener('click', nextSection);
}

// Handle option clicks
function handleOptionClick() {
    const input = this.querySelector('input');
    const isCheckbox = input.type === 'checkbox';
    
    if (isCheckbox) {
        // Handle checkbox (multiple selection)
        const maxSelections = 2; // For feature selection question
        const checkedBoxes = this.parentNode.querySelectorAll('input[type="checkbox"]:checked');
        
        if (input.checked) {
            // Unchecking
            input.checked = false;
            this.classList.remove('selected');
        } else if (checkedBoxes.length < maxSelections) {
            // Checking (within limit)
            input.checked = true;
            this.classList.add('selected');
        } else {
            // At limit, show message or do nothing
            showTemporaryMessage('Please select only 2 features');
            return;
        }
    } else {
        // Handle radio button (single selection)
        // Remove selected class from siblings
        this.parentNode.querySelectorAll('.card-option').forEach(sibling => {
            sibling.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');
        input.checked = true;
    }
    
    // Store response
    storeResponse(input.name, input.value, isCheckbox);
    
    // Update navigation
    updateNavigation();
}

// Store responses
function storeResponse(name, value, isCheckbox) {
    if (isCheckbox) {
        if (!responses[name]) responses[name] = [];
        const index = responses[name].indexOf(value);
        if (index > -1) {
            responses[name].splice(index, 1);
        } else {
            responses[name].push(value);
        }
    } else {
        responses[name] = value;
    }
}

// Show temporary message
function showTemporaryMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000);
}

// Navigation functions
function nextSection() {
    if (currentSection < totalSections) {
        // Hide current section
        document.querySelector(`.question-section[data-section="${currentSection}"]`).classList.remove('active');
        
        // Show next section
        currentSection++;
        document.querySelector(`.question-section[data-section="${currentSection}"]`).classList.add('active');
        
        updateProgressBar();
        updateNavigation();
        scrollToTop();
    }
}

function previousSection() {
    if (currentSection > 1) {
        // Hide current section
        document.querySelector(`.question-section[data-section="${currentSection}"]`).classList.remove('active');
        
        // Show previous section
        currentSection--;
        document.querySelector(`.question-section[data-section="${currentSection}"]`).classList.add('active');
        
        updateProgressBar();
        updateNavigation();
        scrollToTop();
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const currentQuestion = document.getElementById('current-question');
    
    // Calculate progress based on sections and questions within sections
    const questionsPerSection = [5, 2, 2, 3]; // Number of questions in each section
    let totalQuestions = 0;
    let completedQuestions = 0;
    
    for (let i = 0; i < totalSections; i++) {
        totalQuestions += questionsPerSection[i];
        if (i < currentSection - 1) {
            completedQuestions += questionsPerSection[i];
        } else if (i === currentSection - 1) {
            // Count completed questions in current section
            const currentSectionElement = document.querySelector(`.question-section[data-section="${currentSection}"]`);
            const questionsInSection = currentSectionElement.querySelectorAll('.question');
            questionsInSection.forEach(question => {
                const hasAnswer = question.querySelector('input:checked');
                if (hasAnswer) completedQuestions++;
            });
        }
    }
    
    const progressPercentage = (completedQuestions / totalQuestions) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update question counter
    document.getElementById('total-questions').textContent = totalQuestions;
    currentQuestion.textContent = Math.min(completedQuestions + 1, totalQuestions);
}

function updateNavigation() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    
    // Update previous button
    prevButton.disabled = currentSection === 1;
    
    // Update next/submit button
    if (currentSection === totalSections) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'flex';
    } else {
        nextButton.style.display = 'flex';
        submitButton.style.display = 'none';
    }
}

function scrollToTop() {
    document.querySelector('.quiz-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Quiz submission
document.getElementById('wellness-quiz').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect all form data
    const formData = new FormData(this);
    const finalResponses = {};
    
    // Handle regular form data
    for (let [key, value] of formData.entries()) {
        if (finalResponses[key]) {
            // Convert to array if multiple values
            if (!Array.isArray(finalResponses[key])) {
                finalResponses[key] = [finalResponses[key]];
            }
            finalResponses[key].push(value);
        } else {
            finalResponses[key] = value;
        }
    }
    
    // Merge with stored responses (for checkboxes)
    Object.assign(finalResponses, responses);
    
    // Here you would typically send data to your backend
    console.log('Complete Survey Responses:', finalResponses);
    
    // Show success message
    document.getElementById('success-message').style.display = 'block';
    
    // Scroll to success message
    document.getElementById('success-message').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Hide the form
    setTimeout(() => {
        document.querySelector('.quiz-container form').style.display = 'none';
    }, 1000);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionnaire();
    initializeBanner();
});

// Survey Banner functionality
function initializeBanner() {
    const banner = document.getElementById('surveyBanner');
    const closeBtn = document.getElementById('closeBanner');
    const header = document.querySelector('header');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            banner.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                banner.classList.add('hidden');
                banner.style.display = 'none';
                header.style.top = '0';
            }, 300);
        });
    }
    
    // Auto-hide banner after 10 seconds (optional)
    setTimeout(() => {
        if (banner && !banner.classList.contains('hidden')) {
            const closeEvent = new Event('click');
            closeBtn.dispatchEvent(closeEvent);
        }
    }, 10000);
}


// Analytics placeholder
function trackEvent(eventName, data = {}) {
    console.log('Analytics Event:', eventName, data);
    // Here you would integrate with your analytics service
    // gtag('event', eventName, data);
    // analytics.track(eventName, data);
}

// Add slide up animation
const style = document.createElement('style');
style.textContent += `
    @keyframes slideUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100%);
        }
    }
`;
document.head.appendChild(style);

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});