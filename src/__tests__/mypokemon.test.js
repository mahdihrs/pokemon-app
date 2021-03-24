import React from "react";
import { LocalStorageMock } from '@react-mock/localstorage';
import { render, screen } from "@testing-library/react";
import { PokemonProvider } from "../utils/contexts/pokemon-context";
import MyPokemon from "../pages/my-pokemon";

const Wrapper = ({ children }) => {
  return (
    <PokemonProvider>
      <LocalStorageMock items={{ myPokemons: {} }}>
        {children}
      </LocalStorageMock>
    </PokemonProvider>
  );
};

it("should render the message that I haven't catched any pokemon", () => {
  render(<MyPokemon />, { wrapper: Wrapper });
  const noPokemonMsg = screen.getByText(/you haven't catch/i);
  expect(noPokemonMsg).toBeInTheDocument();
  expect(noPokemonMsg.textContent).toMatchInlineSnapshot(
    `"You haven't catch any pokemon yet."`
  );
});

// it('should render pokemons I have been catched', () => {
//   render(<MyPokemon />, { wrapper: Wrapper });
//   screen.debug();
// });
