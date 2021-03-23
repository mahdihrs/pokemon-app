import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const PokemonDetailContext = createContext();
PokemonDetailContext.displayName = 'PokemonDetailContext';

export const CATCH_IN_PROGRESS = 'pokemon/detail/set-catch-in-progress';

const pokemonDetail = (state, action) => {

}

export const PokemonDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonDetail, {
    catchInProgress: false,
    pokemonName: '',
  })

  // TO DO : use useMemo
  const value = [state, dispatch];
  return <PokemonDetailContext.Provider value={value}>{children}</PokemonDetailContext.Provider>
}

export const usePokemonDetail = () => {
  const context = useContext(PokemonDetailContext);
  if (context === undefined) {
    throw new Error('usePokemonDetail must be used within a PokemonDetailProvider');
  }
  return context;
}

export const writeUsername = async () => {
  const { value: nickname } = await Swal.fire({
    input: 'text',
    inputLabel: 'Yeay! You got the pokemon! Write your pokemon\'s nickname',
    inputPlaceholder: 'Enter nickname'
  })
  
  if (nickname) {
    return nickname;
    // Swal.fire(`Your pokemon has been named to ${nickname}`);
    // setPokemonName(nickname);
    // dispatch({
    //   type: CATCH_POKEMON,
    //   pokemonToCatch: {
    //     [nickname]: data?.pokemon
    //   }
    // })
  }
  return;
}

PokemonDetailProvider.propTypes = {
  children: PropTypes.node
}