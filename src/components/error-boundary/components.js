import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  margin: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ResetButton = styled.button`
  background-color: lightblue;
  padding: .7rem 2rem;
  border-radius: 10px;
`;

export const ErrorPreTitle = styled.h1`
  font-size: 1rem;
`;

export const ErrorMessage = styled.pre`
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;