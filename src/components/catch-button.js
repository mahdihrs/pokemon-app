import React from 'react';

import { CatchButton } from '../pages/pokemon-detail/components';
import { 
  catchAnotherPokemonAndGiveNickname,
  showModalAndGiveNickname,
  failedToCatchPokemon,
  nicknameDuplicate
} from '../utils/alerts';
import { usePokemon, CATCH_POKEMON } from '../utils/contexts/pokemon-context';
import pokeballBW from '../assets/icons/pokeball-bw.svg';
import pokeball from '../assets/icons/pokeball.svg';
import pokeballAnimated from '../assets/lotties/catch-in-progress.json';
import Lottie from './lottie';

function CatchButtonComponent({ name, isPokemonCatched, setPokemonName, data }) {
  const [{ pokemonCatched }, dispatch] = usePokemon();
  const [catchInProgress, setCatchInProgress] = React.useState(false);

  const handleClick = () => {
    const isCatchSucceed = Math.floor(Math.random() * (2 - 0) + 0);
    if (!pokemonCatched[name]) {
      if (isPokemonCatched) {
        catchAnotherPokemon();
      } else {
        setCatchInProgress(true);
        setTimeout(() => {
          // pokeball animated
          setCatchInProgress(false);
        }, 2000);
        if (!catchInProgress && isCatchSucceed) {
          givePokemonNickname();
        } else if (!catchInProgress && !isCatchSucceed) {
          failedToCatchPokemon();
        }
      }
    }
  }

  const catchAnotherPokemon = async () => {
    const confirmedToCatch = await catchAnotherPokemonAndGiveNickname();
    if (confirmedToCatch) {
      givePokemonNickname();
    }
  }

  const givePokemonNickname = async () => {
    const newNickname = await showModalAndGiveNickname();
    const isNicknameDuplicate = Object.keys(pokemonCatched).find(nickname => nickname === newNickname);

    if (newNickname && !isNicknameDuplicate) {
      setPokemonName(newNickname);
      dispatch({
        type: CATCH_POKEMON,
        pokemonToCatch: {
          [newNickname]: data?.pokemon
        }
      })
      localStorage.setItem('myPokemons', JSON.stringify({ ...pokemonCatched, [newNickname]: data?.pokemon }));
    } else if (newNickname && isNicknameDuplicate) {
      nicknameDuplicate();
    }
  }

  return (
    <CatchButton onClick={handleClick}>
      {catchInProgress ? (<Lottie animationData={pokeballAnimated} />) : (
        <img src={isPokemonCatched ? pokeball : pokeballBW} alt="pokeball" height="50px" />)}
    </CatchButton>
  );
}

export default React.memo(CatchButtonComponent);