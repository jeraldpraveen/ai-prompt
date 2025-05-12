import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./ChatInput.css";

// Styled components
const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  outline: none;
  resize: none; /* Prevents resizing */
  min-height: 50px; /* Minimum height for the text area */
  max-height: none; /* Maximum height for the text area */
  overflow-y: auto; /* Enables vertical scrolling when content overflows */

  &::placeholder {
    color: #aaa;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: right;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #1bbe84;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;

  &:hover {
    color: #331bbe;
  }
`;

const Select = styled.select`
  color: #007bff;
  padding: 5px;
  border: none; /* Remove the border */
  border-radius: 4px; /* Keep the border-radius if you want rounded corners */
  font-size: 14px;
  background-color: transparent; /* Optional: Set background to transparent */
  outline: none; /* Remove outline on focus */

  &:focus {
    outline: none; /* Remove default focus outline */
    box-shadow: 0 0 0 2px #007bff; /* Optional: Add a custom focus effect */
  }
`;

const ChatInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [searchInput]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDialogSubmit = () => {
    // Without AI
    // setSearchTerm(searchInput);
    // setDisplayDialog(true);
    // setSearchInput("");
    // With AI
    const data = {
      contents: [
        {
          parts: [
            {
              text: searchInput,
            },
          ],
        },
      ],
    };
    fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDqzTH1AERxgpl7mPPsm-xakQZWMXaAt_0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSearchTerm(data.candidates[0].content.parts[0].text);
        setDisplayDialog(true);
        setSearchInput("");
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleDialogSubmit();
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <InputWrapper>
        <TextArea
          ref={textAreaRef}
          style={{ overflow: "auto", width: "98.5%", borderColor: "#007bff" }}
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a follow-up"
        />
        <Toolbar>
          <div className="input-instructions">
            <Select value={selectedOption} onChange={handleSelectChange}>
              <option value="option1">Microchip Chatbot</option>
            </Select>
          </div>
          <div className="input-instructions">
            <Button
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleDialogSubmit}
            >
              ⏎ Enter
            </Button>
          </div>
        </Toolbar>
      </InputWrapper>
      {displayDialog && (
        <div>
          <p>Result: {searchTerm}</p>
          <InputWrapper>
            <TextArea
              ref={textAreaRef}
              style={{
                overflow: "auto",
                width: "98.5%",
                borderColor: "#007bff",
              }}
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up"
            />
            <Toolbar>
              <div className="input-instructions">
                <Select value={selectedOption} onChange={handleSelectChange}>
                  <option value="option1">Microchip Chatbot</option>
                </Select>
              </div>
              <div className="input-instructions">
                <Button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleDialogSubmit}
                >
                  ⏎ Enter
                </Button>
              </div>
            </Toolbar>
          </InputWrapper>
        </div>
      )}
    </Container>
  );
};

export default ChatInput;
