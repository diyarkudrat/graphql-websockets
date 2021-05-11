// Get references to DOM elements
const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');

let ws;

function calcColor(msg) {
    let num = 0;
    for (let i = 0; i < msg.length; i++) {
        num += msg.charCodeAt(i);
    }

    return num % 360;
}

// Display messages from websocket
function showMessage(msg) {
    let hue = calcColor(msg.name);
    const htmlDisplay = <li><span class="name" style="color: hsl(${hue}, 80%, 50%)">${msg.name}</span>: ${msg.message}</li>;
    messages.innerHTML += htmlDisplay;
    messages.scrollTop = messages.scrollHeight;
    messageInput.value = '';
}

function init() {
    // Clean up before restarting websocket connection
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }

    es = new WebSocket('ws://localhost:6969');

    ws.onopen = () => console.log('Connection Opened!!');

    ws.onmessage = () => showMessage(JSON.parse(e.data));

    ws.onclose = () => ws = null;
}

// Handle Button clicks
sendBtn.onclick = function () {
    if (!ws) {
        showMessage("No WebSocket Connection");
        return;
    }

    ws.send(messageInput.value);
    showMessage(messageInput.value);
}

init();