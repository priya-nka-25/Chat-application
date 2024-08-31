// Sample contacts data
const contacts = [
    { name: 'Jaison', email: 'john@example.com' },
    { name: 'Janani', email: 'jane@example.com' },
    { name: 'Rindhiya', email: 'sam@example.com' },
    { name: 'Sathish sir', email: 'emily@example.com' },
    { name: 'Appa', email: 'michael@example.com' }
];

let currentContact = null;

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login (Replace this logic with actual authentication)
    if (email && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('contacts-page').style.display = 'block';
        loadContacts();
    } else {
        alert('Please enter your email and password');
    }
}

function logout() {
    document.getElementById('chat-page').style.display = 'none';
    document.getElementById('contacts-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function loadContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('li');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <span>${contact.name}</span>
            <button onclick="selectContact(${index})">Chat</button>
        `;
        contactsList.appendChild(contactItem);
    });
}

function selectContact(index) {
    currentContact = contacts[index];
    document.getElementById('current-contact').innerText = currentContact.name;
    document.getElementById('contacts-page').style.display = 'none';
    document.getElementById('chat-page').style.display = 'block';
}

function backToContacts() {
    document.getElementById('chat-page').style.display = 'none';
    document.getElementById('contacts-page').style.display = 'block';
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const mediaInput = document.getElementById('media-input');
    const chatBox = document.getElementById('chat-box');

    if (messageInput.value.trim() !== '') {
        const message = document.createElement('div');
        message.className = 'message sent';
        message.innerHTML = `
            ${messageInput.value}
            <div class="status-tick">✔</div>
        `;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
        simulateMessageStatus(message);
        simulateReceivedMessage(messageInput.value);
        messageInput.value = '';
    }

    if (mediaInput.files.length > 0) {
        const file = mediaInput.files[0];
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-message';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.className = 'shared-image';
            mediaContainer.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.className = 'shared-video';
            mediaContainer.appendChild(video);
        } else if (file.type.startsWith('audio/')) {
            const audio = document.createElement('audio');
            audio.src = URL.createObjectURL(file);
            audio.controls = true;
            audio.className = 'shared-audio';
            mediaContainer.appendChild(audio);
        }

        chatBox.appendChild(mediaContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
        mediaInput.value = '';
    }
}

function simulateMessageStatus(messageElement) {
    const statusElement = messageElement.querySelector('.status-tick');
    setTimeout(() => {
        statusElement.textContent = '✔✔'; // Double tick for delivered
    }, 1000);
    setTimeout(() => {
        statusElement.textContent = '✔✔'; // Double tick, now read
        statusElement.classList.add('read'); // Change color to indicate read status
    }, 2000);
}

function simulateReceivedMessage(sentMessage) {
    const chatBox = document.getElementById('chat-box');
    const notificationSound = document.getElementById('notification-sound');

    setTimeout(() => {
        const response = document.createElement('div');
        response.className = 'message received';
        response.innerHTML = `
            Received: ${sentMessage}
            <div class="status-tick read">✔✔</div>
        `;
        chatBox.appendChild(response);
        chatBox.scrollTop = chatBox.scrollHeight;
        notificationSound.play(); // Play notification sound on receiving a message
    }, 1500);
}

function startCall() {
    alert(`Starting call with ${currentContact.name}...`);
}
