import { FC } from 'react';

type ErrorDisplayProps = {
  error: string;
};

const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => (
  <p className="text-red-500 text-sm">{error}</p>
);

export default ErrorDisplay;
