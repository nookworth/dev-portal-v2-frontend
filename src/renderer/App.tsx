// import { clipboard } from 'electron';
import './App.css';
import React from 'react';

const { useRef, useState } = React;

const { sendMessage } = window.electron.ipcRenderer;

function MainPage() {
  const [showPRView, setShowPRView] = useState<boolean>(true);
  const [prInputValue, setPrInputValue] = useState<string>('');
  const generatedMessageEl = useRef<HTMLParagraphElement>(null);

  const generateMessage = async () => {
    const generatedMessage = await window.electron.generateReviewMessage();
    if (generatedMessage && generatedMessageEl.current) {
      generatedMessageEl.current.textContent =
        'Review message copied to clipboard!';
    }
  };

  return (
    <div className="bg-newForest flex flex-col gap-4 py-4 px-2 relative h-[100vh]">
      <div className="flex flex-row justify-between items-center">
        <button
          className="bg-beachDark border-2 border-forest rounded-md p-1 uppercase hover:shadow-md"
          onClick={(e) => {
            e.preventDefault();
            sendMessage('toggle-gh-windows', !showPRView);
            setShowPRView(!showPRView);
          }}
          type="button"
        >
          Show/Hide GitHub
        </button>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (prInputValue.match(/[#]?[0-9]+/)) {
              sendMessage('pr-query', prInputValue);
              if (generatedMessageEl.current)
                generatedMessageEl.current.textContent = '';
            }
          }}
        >
          <label htmlFor="pr-number">
            PR number:
            <input
              className="bg-canyonLight border-2 border-forest ml-2 rounded-md"
              name="pr-number"
              value={prInputValue}
              onChange={(e) => {
                setPrInputValue(e.target.value);
              }}
            />
          </label>
        </form>
        <button
          className="bg-beachDark border-2 border-forest rounded-md p-1 uppercase hover:shadow-md"
          onClick={generateMessage}
          type="button"
        >
          Generate review message
        </button>
        <p className="italic" id="generated-message" ref={generatedMessageEl} />
      </div>
    </div>
  );
}

export default function App() {
  return MainPage();
}
