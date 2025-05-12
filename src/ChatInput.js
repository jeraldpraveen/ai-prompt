import React, { useState } from "react";
import "./ChatInput.css"; // Import the CSS file

const ChatInput1 = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.innerText); // Get the inner text of the contenteditable div
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      console.log("Input submitted:", inputValue);
      // You can add functionality to handle the input submission here
      setInputValue(""); // Clear the input after submission
    }
  };

  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <div
          className="editable-area"
          contentEditable="true"
          spellCheck="false"
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          data-placeholder="Ask a follow-up"
        >
          <p className={inputValue ? "" : "is-empty"}>{inputValue || <br />}</p>
        </div>
        <div className="input-toolbar">
          <button className="toolbar-button">
            <span>Microchip Chatbot</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </button>
          <div className="input-instructions">
            <button className="toolbar-button">
              <span>⏎ Enter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput1;
