import React from 'react';
import { render, screen } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { MockedProvider } from '@apollo/client/testing';

import { PokemonProvider } from '../utils/contexts/pokemon-context';
import { GET_POKEMONS } from '../utils/queries';
import Pokemons from '../pages/pokemons';

const mocks = [{
  request: {
    query: GET_POKEMONS,
    variables: {
      limit: 1,
      offset: 1
    },
  },
  result: {
    data: {
      pokemons: {
        count: 1118,
        status: true,
        message: "",
        results: [{
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/"
        }],
      }
    },
  },
}];


it('should render loading indicator and show pokemons list', async () => {
  const Wrapper = ({ children }) => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </MockedProvider>
    )
  }
  
  const { container } = render(<Pokemons />, { wrapper: Wrapper });
  const loadingScreen = screen.getByText(/finding pokemon/i);
  expect(loadingScreen).toBeInTheDocument();

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  });

  const pageWrapper = container.firstElementChild.querySelector('div');
  expect(pageWrapper).toHaveClass('css-anuud5');
  const ivysaur = screen.getByText(/ivysaur/i);
  expect(ivysaur).toBeInTheDocument();
});

// it('should render error message', async () => {
//   const pokemonMockError = {
//     request: {
//       query: GET_POKEMONS,
//       variables: {
//         limit: 1,
//         offset: 1
//       },
//     },
//     error: new Error('An error occurred'),
//   };

//   render(
//     <MockedProvider mocks={pokemonMockError} addTypename={false}>
//       <Pokemons />
//     </MockedProvider>,
//   );

//   await act(async () => {
//     await new Promise(resolve => setTimeout(resolve, 0))
//   });
// });