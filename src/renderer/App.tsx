import './App.css';
import { useFetchPRs } from '../hooks/useFetchPRs';
import { Row } from './components/Row';

function MainPage() {
  const { fetchedPRs, error } = useFetchPRs();

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {fetchedPRs?.map((pr) => {
        const { checkSuites, number, title } = pr;
        return (
          <Row
            key={number}
            checkSuites={checkSuites}
            number={number}
            title={title}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  return MainPage();
}
