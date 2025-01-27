import { FC } from 'react';

type ErrorDisplayProps = {
  error: string;
};

const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => (
  <p className="text-destructive text-xs">{error}</p>
);

export default ErrorDisplay;
