import './App.css';
import { useRef, useState } from 'react';
import { useFetchPRs } from '../hooks/useFetchPRs';

const { sendMessage } = window.electron.ipcRenderer;

function MainPage() {
  const [prInputValue, setPrInputValue] = useState<string>('');
  const generatedMessageEl = useRef<HTMLParagraphElement>(null);

  const { fetchedPRs, error } = useFetchPRs();

  const generateMessage = async () => {
    const generatedMessage = await window.electron.generateReviewMessage();
    if (generatedMessage && generatedMessageEl.current) {
      generatedMessageEl.current.textContent =
        'Review message copied to clipboard!';
    }
  };

  return (
    <div className="bg-newForest flex flex-col gap-4 py-4 px-2 relative h-[100vh]">
      <div>{JSON.stringify(fetchedPRs)}</div>
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
