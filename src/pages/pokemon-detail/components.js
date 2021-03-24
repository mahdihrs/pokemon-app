import styled from '@emotion/styled';

export const Container = styled.section`
padding: 2rem 1rem;

@media (min-width: 600px) {
  padding: 2rem 3rem;
}
`;

export const PokemonCard = styled.div`
  padding: 1rem;
  border: 1px solid rgb(20, 57, 120);
  border-radius: 15px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CatchButton = styled.button`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 50%;

  &: focus {
    outline: 0;
  }
`;