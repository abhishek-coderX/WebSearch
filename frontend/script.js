// import { json } from "express";

// document.addEventListener("DOMContentLoaded", () => {
//   const initialStateDiv = document.getElementById("initial-state");
//   const initialChatInput = document.getElementById("initial-chat-input");
//   const initialSendButton = document.getElementById("initial-send-button");

//   const chatMessagesContainer = document.getElementById(
//     "chat-messages-container"
//   );
//   const fixedBottomInputDiv = document.getElementById("fixed-bottom-input");
//   const chatInputActive = document.getElementById("chat-input-active");
//   const chatSendButtonActive = document.getElementById(
//     "chat-send-button-active"
//   );

//   const loading = document.createElement("div");
//   loading.className = "my-6 animate-pulse text-gray-400 text-center";
//   loading.textContent = "Thinking...";

//   let chatStarted = false;
//   const threadId =
//     "thread_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

//   initialChatInput?.addEventListener("keyup", (e) =>
//     handleInputEvent(e, "initial")
//   );
//   initialSendButton?.addEventListener("click", (e) =>
//     handleInputEvent(e, "initial")
//   );

//   chatInputActive?.addEventListener("keyup", (e) =>
//     handleInputEvent(e, "active")
//   );
//   chatSendButtonActive?.addEventListener("click", (e) =>
//     handleInputEvent(e, "active")
//   );

//   function handleInputEvent(e, context) {
//     const isEnterKey = e.key === "Enter";
//     const isButtonClick = e.type === "click";

//     if (!isEnterKey && !isButtonClick) {
//       return;
//     }

//     let inputText = "";
//     if (context === "initial") {
//       inputText = initialChatInput.value.trim();
//       if (isEnterKey) e.preventDefault();
//     } else {
//       inputText = chatInputActive.value.trim();
//       if (isEnterKey) e.preventDefault();
//     }

//     if (!inputText) {
//       return;
//     }

//     generate(inputText, context);
//   }

//   function appendMessageToUI(text, sender) {
//     const msg = document.createElement("div");
//     msg.classList.add(
//       "my-4",
//       "p-3",
//       "rounded-xl",
//       "w-fit",
//       "max-w-[50%]",
//       "break-words",
//       "shadow"
//     );
//     if (sender === "user") {
//       msg.classList.add("bg-pink-600", "text-white", "ml-auto");
//     } else if (sender === "system") {
//       msg.classList.add("bg-neutral-700", "text-white", "mr-auto");
//     } else if (sender === "error") {
//       msg.classList.add("bg-red-600", "text-white", "mr-auto");
//     }
//     msg.textContent = text;
//     chatMessagesContainer?.appendChild(msg);

//     setTimeout(() => {
//       chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
//     }, 50);
//   }

// async function callBackend(message) {
//   try {
//     const response = await fetch("http://localhost:4000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: message,
//         threadId: threadId,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.message;
//   } catch (error) {
//     console.error("Error calling backend:", error);
//     return "Sorry, there was an error processing your request.";
//   }
// }


//   async function generate(text, context) {
//     if (!chatStarted) {
//       initialStateDiv.classList.add("hidden");
//       chatMessagesContainer.classList.remove("hidden");
//       fixedBottomInputDiv.classList.remove("hidden");
//       chatStarted = true;
//       chatInputActive.value = "";
//       chatInputActive.focus();
//     }

//     if (context === "initial") {
//       initialChatInput.value = "";
//     } else {
//       chatInputActive.value = "";
//     }

//     appendMessageToUI(text, "user");

//     chatMessagesContainer?.appendChild(loading);
//     chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

//     const assistantMessage = await callBackend(text);

//     loading.remove();

//     appendMessageToUI(assistantMessage, "system");
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
    const initialStateDiv = document.getElementById("initial-state");
    const initialChatInput = document.getElementById("initial-chat-input");
    const initialSendButton = document.getElementById("initial-send-button");

    const chatMessagesContainer = document.getElementById(
        "chat-messages-container"
    );
    const fixedBottomInputDiv = document.getElementById("fixed-bottom-input");
    const chatInputActive = document.getElementById("chat-input-active");
    const chatSendButtonActive = document.getElementById(
        "chat-send-button-active"
    );

    // Enhanced loading state with a spinner
    const loading = document.createElement("div");
    loading.className = "flex justify-center items-center my-4";
    loading.innerHTML = `
        <span class="text-center animate-pulse text-pink-400">Thinking...</span>
    `;

    let chatStarted = false;
    const threadId =
        "thread_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    initialChatInput?.addEventListener("keyup", (e) =>
        handleInputEvent(e, "initial")
    );
    initialSendButton?.addEventListener("click", (e) =>
        handleInputEvent(e, "initial")
    );

    chatInputActive?.addEventListener("keyup", (e) =>
        handleInputEvent(e, "active")
    );
    chatSendButtonActive?.addEventListener("click", (e) =>
        handleInputEvent(e, "active")
    );

    function handleInputEvent(e, context) {
        const isEnterKey = e.key === "Enter";
        const isButtonClick = e.type === "click";

        if (!isEnterKey && !isButtonClick) {
            return;
        }

        let inputText = "";
        if (context === "initial") {
            inputText = initialChatInput.value.trim();
            if (isEnterKey) e.preventDefault();
        } else {
            inputText = chatInputActive.value.trim();
            if (isEnterKey) e.preventDefault();
        }

        if (!inputText) {
            return;
        }

        generate(inputText, context);
    }

    function appendMessageToUI(text, sender) {
        const msg = document.createElement("div");
        msg.classList.add(
            "my-4",
            "p-3",
            "rounded-xl",
            "w-fit",
            "max-w-lg", // Increased max-width for better readability
            "break-words",
            "shadow-lg" // Added shadow for visual depth
        );
        if (sender === "user") {
            msg.classList.add("bg-pink-600", "text-white", "ml-auto");
        } else if (sender === "system") {
            msg.classList.add("bg-neutral-700", "text-white", "mr-auto");
        } else if (sender === "error") {
            msg.classList.add("bg-red-600", "text-white", "mr-auto");
        }
        msg.textContent = text;
        chatMessagesContainer?.appendChild(msg);

        // Smooth scroll to the bottom
        setTimeout(() => {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 50);
    }

    async function callBackend(message) {
        try {
            const response = await fetch("http://localhost:4000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    threadId: threadId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error("Error calling backend:", error);
            return "Sorry, there was an error processing your request.";
        }
    }


    async function generate(text, context) {
        if (!chatStarted) {
            initialStateDiv.classList.add("hidden");
            chatMessagesContainer.classList.remove("hidden");
            fixedBottomInputDiv.classList.remove("hidden");
            chatStarted = true;
            chatInputActive.value = "";
            chatInputActive.focus();
        }

        if (context === "initial") {
            initialChatInput.value = "";
        } else {
            chatInputActive.value = "";
        }

        appendMessageToUI(text, "user");

        chatMessagesContainer?.appendChild(loading);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        const assistantMessage = await callBackend(text);

        loading.remove();

        appendMessageToUI(assistantMessage, "system");
    }
});

