import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { PokemonProvider } from '../utils/contexts/pokemon-context';

import { GET_POKEMON_DETAIL, getPokemonDetailVariables } from '../utils/queries';
import PokemonDetail from '../pages/pokemon-detail';

const mocks = [{
  request: {
    query: GET_POKEMON_DETAIL,
    variables: {
      name: getPokemonDetailVariables('caterpie')
    }
  },
  result: {
    data: {
      pokemon: {
        id: 10,
        name: 'caterpie',
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png'
        },
        abilities: [
          { ability: { name: 'shield-dust'  }  },
          { ability: { name: 'run-away'  }  },
        ],
        moves: [
          { move: { name: 'tackle'  } },
          { move: { name: 'string-shot'  } },
          { move: { name: 'snore'  } },
          { move: { name: 'bug-bite'  } },
          { move: { name: 'electroweb'  } },
        ],
        types: [{ type: { name: 'bug'  } }],
      }
    }
  }
}];

it('should render loading indicator', async () => {
  const Wrapper = ({ children }) => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonProvider>
          <MemoryRouter
            initialEntries={[{
              pathname: '/pokemon/8/caterpie',
              state: {
                img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
              }
            }]}
          >
            {children}
          </MemoryRouter>
        </PokemonProvider>
      </MockedProvider>
    )
  }

  const { container } = render(<PokemonDetail />, { wrapper: Wrapper });

  const loadingScreen = screen.getByText(/loading/i);
  expect(loadingScreen).toBeInTheDocument();

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  });
  screen.debug();
})
