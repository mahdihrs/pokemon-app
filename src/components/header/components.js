import styled from '@emotion/styled';

export const Navigation = styled.nav`
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  h1 {
    margin: 0;
    font-size: 1rem;
    padding: 1rem;
  }
  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #252552;
  }
`;