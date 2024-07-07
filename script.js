const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');

const inventory = [
  { model: "Luxury Sedan", price: 30000, features: ["Leather seats", "Navigation system"], available: 5 },
  { model: "Family SUV", price: 35000, features: ["7 seats", "Advanced safety features"], available: 3 },
  { model: "Sports Car", price: 45000, features: ["High-performance engine", "Premium sound system"], available: 2 }
];

const availableSlots = [
  "2024-07-08 10:00", "2024-07-08 14:00", "2024-07-09 11:00", "2024-07-09 15:00"
];

const faqs = {
  "financing": "We offer competitive financing options with rates as low as 2.9% APR for qualified buyers.",
  "warranty": "All our new vehicles come with a 5-year/60,000-mile basic warranty and a 10-year/100,000-mile powertrain warranty.",
  "trade-in": "We accept trade-ins and offer fair market value for your vehicle. Bring your car for an appraisal or use our online estimator."
};

let userPreferences = {};

function sendMessage() {
    const message = userInput.value;
    if (message.trim() === '') return;

    appendMessage('You', message);
    userInput.value = '';

    // Enhanced chatbot logic
    setTimeout(() => {
        let response;
        if (message.toLowerCase().includes('appointment')) {
            response = handleAppointment(message);
        } else if (message.toLowerCase().includes('inventory') || message.toLowerCase().includes('car')) {
            response = handleInventory(message);
        } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
            response = handlePricing(message);
        } else if (message.toLowerCase().includes('financing') || message.toLowerCase().includes('warranty') || message.toLowerCase().includes('trade-in')) {
            response = handleFAQ(message);
        } else if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('suggestion')) {
            response = handleRecommendation(message);
        } else if (message.toLowerCase().includes('human') || message.toLowerCase().includes('representative')) {
            response = "Certainly! I'll connect you with one of our sales representatives. Please hold for a moment.";
        } else {
            response = "Thank you for your message. How can I assist you today? Feel free to ask about our inventory, pricing, appointments, or any other questions you may have.";
        }
        appendMessage('Chatbot', response);
    }, 1000);
}

function handleAppointment(message) {
    if (availableSlots.length > 0) {
        const slot = availableSlots[0];
        if (bookAppointment(slot)) {
            setTimeout(() => {
                appendMessage('Chatbot', `Reminder: You have an appointment scheduled for ${slot}. Looking forward to seeing you!`);
            }, 10000);
            return `Great! I've booked an appointment for you on ${slot}. Is there anything specific you'd like to discuss during your visit?`;
        }
    }
    return "I'm sorry, all our appointment slots are currently full. Please try again tomorrow or contact us directly to arrange a suitable time.";
}

function handleInventory(message) {
    let response = "Here's our current inventory:\n";
    inventory.forEach(car => {
        response += `${car.model}: ${car.available} available\n`;
    });
    return response;
}

function handlePricing(message) {
    let response = "Here are our current prices:\n";
    inventory.forEach(car => {
        response += `${car.model}: Starting at $${car.price}\n`;
    });
    return response;
}

function handleFAQ(message) {
    for (let key in faqs) {
        if (message.toLowerCase().includes(key)) {
            return faqs[key];
        }
    }
    return "I'm sorry, I couldn't find information on that specific topic. Is there something else I can help you with?";
}

function handleRecommendation(message) {
    if (Object.keys(userPreferences).length === 0) {
        userPreferences.asked = true;
        return "To give you a personalized recommendation, could you tell me what's most important to you? Price, performance, or family-friendliness?";
    } else if (userPreferences.asked && !userPreferences.preference) {
        if (message.toLowerCase().includes('price')) {
            userPreferences.preference = 'price';
        } else if (message.toLowerCase().includes('performance')) {
            userPreferences.preference = 'performance';
        } else if (message.toLowerCase().includes('family')) {
            userPreferences.preference = 'family';
        }
        
        switch(userPreferences.preference) {
            case 'price':
                return "Based on your preference for price, I'd recommend our Luxury Sedan. It offers great value with a starting price of $30,000. Would you like more details about this model?";
            case 'performance':
                return "For performance enthusiasts, our Sports Car is the way to go. It comes with a high-performance engine and starts at $45,000. Would you like to know more about its features?";
            case 'family':
                return "For family-friendliness, I'd suggest our Family SUV. It has 7 seats and advanced safety features, starting at $35,000. Would you like to schedule a test drive?";
            default:
                return "I'm sorry, I couldn't determine your preference. Could you please specify if you're more interested in price, performance, or family-friendliness?";
        }
    }
    return "Based on your preferences, I've already made a recommendation. Is there anything specific you'd like to know about that vehicle?";
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function bookAppointment(slot) {
    const index = availableSlots.indexOf(slot);
    if (index > -1) {
        availableSlots.splice(index, 1);
        return true;
    }
    return false;
}

// Event listener for the Enter key
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ... (keep all the previous code)

// Add these new functions at the end of the file

const minimizeButton = document.getElementById('minimize-chatbot');
const chatbotBody = document.getElementById('chatbot-body');

minimizeButton.addEventListener('click', toggleChatbot);

function toggleChatbot() {
    if (chatbotBody.style.display === 'none') {
        chatbotBody.style.display = 'flex';
        minimizeButton.textContent = '_';
    } else {
        chatbotBody.style.display = 'none';
        minimizeButton.textContent = '+';
    }
}

// Initialize chatbot with a welcome message
window.addEventListener('load', () => {
    appendMessage('Chatbot', "Welcome to Sunrise Motors! How can I assist you today? Feel free to ask about our inventory, pricing, or schedule an appointment.");
});