import * as React from 'react';
import somethingWrong from '../../assets/images/something-wrong.svg';
import {
  ErrorContainer,
  ResetButton,
  ErrorPreTitle,
  ErrorMessage
} from './components';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorContainer role="alert">
      <ErrorPreTitle>Something went wrong:</ErrorPreTitle>
      <img src={somethingWrong} height="25%" alt="" />
      <ErrorMessage>{error.message}</ErrorMessage>
      <ResetButton
        onClick={resetErrorBoundary}
      >
        Try again
      </ResetButton>
    </ErrorContainer>
  )
}

export default ErrorFallback;