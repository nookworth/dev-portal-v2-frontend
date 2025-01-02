import { URL_CONSTANTS } from '../../constants';

interface CheckSuite {
  id: number;
  conclusion: string;
  status: string;
}

interface RowProps {
  checkSuites: CheckSuite[];
  number: number;
  title: string;
}

const { owner, repo } = URL_CONSTANTS;

export function Row({ checkSuites, number, title }: RowProps) {
  const hasPendingChecks = checkSuites.some(
    (check) => check.status !== 'completed',
  );
  const statusMessage = hasPendingChecks
    ? 'Pending checks'
    : 'All checks passed ✅';

  return (
    <div className="flex flex-row gap-4 font-roboto text-forest">
      <div>{title}</div>
      {/* TODO: open the link in the browser */}
      <a href={`https://api.github.com/repos/${owner}/${repo}/pulls${number}`}>
        {number}
      </a>
      <div>{statusMessage}</div>
    </div>
  );
}
