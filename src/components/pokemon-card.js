import React from 'react';
import { useHistory } from 'react-router-dom';
import { GridItem, ImageWrapper, Button } from './styled-shared';
import { usePokemon, RELEASE_POKEMON } from '../utils/contexts/pokemon-context';

export default function PokemonCard({ data, myPokemon }) {
  const history = useHistory();
  const [{ pokemonCatched }, dispatch] = usePokemon();

  const handleClickRouter = () => {
    history.push({
      pathname: `/pokemon/${data.index}/${data.name}`,
      img: data.image
    })
  }

  const handleRelease = () => {
    const myPokemons = { ...pokemonCatched };
    delete myPokemons[data.nickname];
    dispatch({
      type: RELEASE_POKEMON,
      pokemonToCatch: myPokemons
    })
    localStorage.setItem('myPokemons', JSON.stringify(myPokemons));
  }

  return (
    <GridItem key={data.name}>
      <div onClick={!myPokemon ? handleClickRouter : () => {}}>
        <ImageWrapper onClick={handleClickRouter}>
          <img src={data?.image || data?.sprites.front_default} alt="" height="100px" />
          <p>{data?.nickname ?? data?.name}</p>
        </ImageWrapper>
        {myPokemon && (
          <Button onClick={handleRelease}>
            Release
          </Button>
        )}
      </div>
    </GridItem>
  )
}