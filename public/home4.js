async function sendPrompt() {
const userInput = document.getElementById('user-input').value;
if (!userInput) return;

const chatBox = document.getElementById('chat-box');
chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-pvuTZ7qh6KzdZ1V1GDssT3BlbkFJBrisZEgVp2I9ebj5pHE3'
        },
        body: JSON.stringify({
            prompt: userInput,
            n: 1,
            size: "1024x1024"
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        chatBox.innerHTML += `<p><strong>Bot:</strong> Error ${response.status}: ${errorData.error.message}</p>`;
        return;
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    chatBox.innerHTML += `<p><strong>Bot:</strong><br><img src="${imageUrl}" alt="Generated Image" style="width:100%;"></p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
} catch (error) {
    chatBox.innerHTML += `<p><strong>Bot:</strong> Error generating image. Please try again.</p>`;
    console.error('Error:', error);
}

document.getElementById('user-input').value = '';
}