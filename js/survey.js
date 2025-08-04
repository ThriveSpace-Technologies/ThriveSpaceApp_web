// Survey Page JavaScript
let currentSection = 1;
const totalSections = 4;
let surveyResponses = {};

// Initialize survey functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSurvey();
});

function initializeSurvey() {
    // Start survey button
    const startBtn = document.getElementById('startSurveyBtn');
    const modal = document.getElementById('surveyModal');
    const closeBtn = document.getElementById('closeBtn');
    const backdrop = document.getElementById('modalBackdrop');

    startBtn.addEventListener('click', openSurveyModal);
    closeBtn.addEventListener('click', closeSurveyModal);
    backdrop.addEventListener('click', closeSurveyModal);

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', previousSection);
    document.getElementById('nextBtn').addEventListener('click', nextSection);
    
    // Form submission
    document.getElementById('surveyForm').addEventListener('submit', handleSubmission);

    // Option selection handlers
    setupOptionHandlers();
    
    // Initialize UI
    updateProgress();
    updateNavigation();
    
    // Initialize checkbox states
    initializeCheckboxes();
}

function openSurveyModal() {
    const modal = document.getElementById('surveyModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track survey start
    trackEvent('survey_started');
    
    // Add entrance animation
    setTimeout(() => {
        const modalContainer = modal.querySelector('.modal-container');
        modalContainer.style.transform = 'scale(1)';
        modalContainer.style.opacity = '1';
    }, 50);
}

function closeSurveyModal() {
    const modal = document.getElementById('surveyModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Track survey exit
    trackEvent('survey_exited', { section: currentSection });
}

function setupOptionHandlers() {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', handleOptionClick);
    });
    
    // Special handling for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const card = checkbox.closest('.option-card');
    const questionCard = card.closest('.question-card');
    const maxSelections = 2;
    
    // Prevent the card click from firing
    event.stopPropagation();
    
    // Count currently selected checkboxes in this question
    const selectedCheckboxes = questionCard.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkbox.checked) {
        // Trying to select
        if (selectedCheckboxes.length > maxSelections) {
            // Too many selected, uncheck this one
            checkbox.checked = false;
            showNotification('Please select only 2 features', 'warning');
            return;
        }
        // Mark card as selected
        card.classList.add('selected');
    } else {
        // Uncheck - remove selection
        card.classList.remove('selected');
    }
    
    // Store response
    storeResponse(checkbox.name, checkbox.value, true);
    
    // Update progress and navigation
    updateProgress();
    updateNavigation();
    
    // Track selection
    trackEvent('option_selected', {
        question: checkbox.name,
        value: checkbox.value,
        selected: checkbox.checked,
        section: currentSection
    });
}

function handleOptionClick(event) {
    const card = event.currentTarget;
    const input = card.querySelector('input');
    const isCheckbox = input.type === 'checkbox';
    const questionCard = card.closest('.question-card');
    
    if (isCheckbox) {
        // For checkboxes, trigger the checkbox change instead
        const maxSelections = 2;
        const selectedCount = questionCard.querySelectorAll('input[type="checkbox"]:checked').length;
        
        if (!input.checked && selectedCount >= maxSelections) {
            showNotification('Please select only 2 features', 'warning');
            return;
        }
        
        // Toggle checkbox
        input.checked = !input.checked;
        
        // Trigger change event
        input.dispatchEvent(new Event('change'));
        
    } else {
        // Handle radio button selection
        questionCard.querySelectorAll('.option-card').forEach(otherCard => {
            otherCard.classList.remove('selected');
        });
        
        card.classList.add('selected');
        input.checked = true;
        
        // Add satisfying click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Store response
        storeResponse(input.name, input.value, isCheckbox);
        
        // Update progress and navigation
        updateProgress();
        updateNavigation();
        
        // Track selection
        trackEvent('option_selected', {
            question: input.name,
            value: input.value,
            section: currentSection
        });
    }
}

function initializeCheckboxes() {
    // Make sure all checkboxes have proper initial state
    document.querySelectorAll('.checkbox-option').forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            card.classList.add('selected');
        } else if (checkbox) {
            card.classList.remove('selected');
        }
    });
}

function storeResponse(name, value, isCheckbox) {
    if (isCheckbox) {
        if (!surveyResponses[name]) surveyResponses[name] = [];
        const index = surveyResponses[name].indexOf(value);
        if (index > -1) {
            surveyResponses[name].splice(index, 1);
        } else {
            surveyResponses[name].push(value);
        }
    } else {
        surveyResponses[name] = value;
    }
}

function nextSection() {
    if (currentSection < totalSections) {
        // Hide current section with animation
        const currentSectionEl = document.querySelector(`.question-section[data-section="${currentSection}"]`);
        currentSectionEl.style.opacity = '0';
        currentSectionEl.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            currentSectionEl.classList.remove('active');
            currentSection++;
            
            // Show next section with animation
            const nextSectionEl = document.querySelector(`.question-section[data-section="${currentSection}"]`);
            nextSectionEl.classList.add('active');
            nextSectionEl.style.opacity = '0';
            nextSectionEl.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                nextSectionEl.style.opacity = '1';
                nextSectionEl.style.transform = 'translateX(0)';
            }, 50);
            
            updateProgress();
            updateNavigation();
            scrollToTop();
        }, 200);
    }
    
    trackEvent('section_advanced', { from: currentSection - 1, to: currentSection });
}

function previousSection() {
    if (currentSection > 1) {
        // Hide current section with animation
        const currentSectionEl = document.querySelector(`.question-section[data-section="${currentSection}"]`);
        currentSectionEl.style.opacity = '0';
        currentSectionEl.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            currentSectionEl.classList.remove('active');
            currentSection--;
            
            // Show previous section with animation
            const prevSectionEl = document.querySelector(`.question-section[data-section="${currentSection}"]`);
            prevSectionEl.classList.add('active');
            prevSectionEl.style.opacity = '0';
            prevSectionEl.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                prevSectionEl.style.opacity = '1';
                prevSectionEl.style.transform = 'translateX(0)';
            }, 50);
            
            updateProgress();
            updateNavigation();
            scrollToTop();
        }, 200);
    }
    
    trackEvent('section_back', { from: currentSection + 1, to: currentSection });
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentQ = document.getElementById('currentQ');
    const totalQ = document.getElementById('totalQ');
    
    // Calculate progress based on answered questions
    const totalQuestions = 11; // Total questions across all sections
    let answeredQuestions = 0;
    
    // Count answered questions
    document.querySelectorAll('input:checked').forEach(input => {
        if (input.type === 'radio' || (input.type === 'checkbox' && input.checked)) {
            answeredQuestions++;
        }
    });
    
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    progressFill.style.width = `${Math.max(8.33, progressPercentage)}%`;
    
    currentQ.textContent = Math.min(answeredQuestions + 1, totalQuestions);
    totalQ.textContent = totalQuestions;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Update previous button
    prevBtn.disabled = currentSection === 1;
    
    // Update next/submit button
    if (currentSection === totalSections) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

function scrollToTop() {
    const surveyContent = document.querySelector('.survey-content');
    surveyContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleSubmission(event) {
    event.preventDefault();
    
    // Collect all form data
    const formData = new FormData(event.target);
    const finalResponses = {};
    
    // Merge form data with stored responses
    for (let [key, value] of formData.entries()) {
        if (finalResponses[key]) {
            if (!Array.isArray(finalResponses[key])) {
                finalResponses[key] = [finalResponses[key]];
            }
            finalResponses[key].push(value);
        } else {
            finalResponses[key] = value;
        }
    }
    
    // Merge with checkbox responses
    Object.assign(finalResponses, surveyResponses);
    
    console.log('Survey Completed:', finalResponses);
    
    // Track completion
    trackEvent('survey_completed', {
        responses: Object.keys(finalResponses).length,
        completion_time: Date.now()
    });
    
    // Show success screen with animation
    showSuccessScreen();
    
    // Send data to Google Sheets via Apps Script
    sendToGoogleSheets(finalResponses);
}

function showSuccessScreen() {
    const surveyContent = document.querySelector('.survey-content');
    const successScreen = document.getElementById('successScreen');
    
    // Hide form with fade out
    surveyContent.style.opacity = '0';
    
    setTimeout(() => {
        // Hide all question sections
        document.querySelectorAll('.question-section').forEach(section => {
            section.style.display = 'none';
        });
        document.querySelector('.survey-navigation').style.display = 'none';
        
        // Show success screen
        successScreen.style.display = 'block';
        successScreen.style.opacity = '0';
        
        setTimeout(() => {
            surveyContent.style.opacity = '1';
            successScreen.style.opacity = '1';
        }, 100);
    }, 300);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function sendToGoogleSheets(data) {
    // Your Google Apps Script web app URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxWtmJrrz3Eni6P4IsEzACVwPjuwKA6879pmyil40iCm7x4AWWo7C9DPkVAlOO5TqyNw/exec';
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Survey data sent to Google Sheets successfully');
        trackEvent('survey_data_sent', { method: 'google_sheets' });
    })
    .catch((error) => {
        console.error('Error sending survey data:', error);
        trackEvent('survey_data_error', { error: error.message });
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, data = {}) {
    console.log('Event:', eventName, data);
    // Here you would integrate with your analytics service
    // gtag('event', eventName, data);
    // analytics.track(eventName, data);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .option-card {
        transition: all 0.3s ease, transform 0.15s ease;
    }
    
    .question-section {
        transition: opacity 0.2s ease, transform 0.2s ease;
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Enhanced checkbox styling */
    .checkbox-option {
        position: relative;
        cursor: pointer;
    }
    
    .checkbox-option input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    
    .checkbox-option.selected {
        border: 2px solid #667eea !important;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)) !important;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
    }
    
    .checkbox-option.selected::after {
        content: '✓';
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #667eea;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        z-index: 10;
    }
`;
document.head.appendChild(style);