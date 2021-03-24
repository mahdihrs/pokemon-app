/** @jsx jsx */
import React from 'react';
// import { FixedSizeList as List } from 'react-window';
import { useLazyQuery } from '@apollo/client';
import { jsx } from '@emotion/react'
import { GET_POKEMONS, getPokemonsVariables } from '../../utils/queries';
import { Container, GridContainer } from './components';
import Select from '../../components/select';
import loaderAnimation from '../../assets/lotties/pikachu-loader.json';
import { usePokemon, SET_NEW_ITEMS_TO_SHOW } from '../../utils/contexts/pokemon-context';
import defaultLottiesOptions from '../../utils/lotties';
import PokemonCard from '../../components/pokemon-card';
import Lottie from '../../components/lottie';

export default function Pokemon() {
  const [{ limit }, dispatch] = usePokemon();
  const [getPokemons, { loading, error, data }] = useLazyQuery(GET_POKEMONS);

  React.useEffect(() => {
    getPokemons({
      variables: getPokemonsVariables({ limit })
    });
  }, [getPokemons, limit]);

  const handleChange = ({ target: { value } }) => {
    dispatch({
      type: SET_NEW_ITEMS_TO_SHOW,
      limit: +value
    })
  }

  if (error) throw new Error(`Error! ${error.message}`);

  return (
    <Container>
      {loading ? (
        <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Lottie animationData={defaultLottiesOptions({ animationData: loaderAnimation })} />
          <span>Finding pokemons...</span>
        </div>
      ) : (
        <>
          <Select handleChange={handleChange} value={limit} />
          <GridContainer>
            {!loading && data?.pokemons.results.map((pok, index) =>
              <PokemonCard key={pok.name} data={{ ...pok, index }} />
            )}
          </GridContainer>
        </>
      )}
    </Container >
  );
}

// const Row = ({ index, style, data }) => {
//   const item = data[index];
//   console.log(item)
//   return <div style={style}>{item.name}</div>
//   // return (
//   //   <PokemonCard style={style} key={item.name} data={{ ...item, index }} />
//   // )
// };

// const PokemonsWindowed = ({ itemData }) => (
//   <List
//     height={150}
//     itemCount={1118}
//     itemSize={100}
//     width={500}
//     itemData={itemData}
//     style={{ padding: '3rem' }}
//   >
//     {Row}
//   </List>
// );