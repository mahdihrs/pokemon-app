/** @jsx jsx */
import React from 'react';
// import { FixedSizeList as List } from 'react-window';
import { useQuery } from '@apollo/client';
import Lottie from 'react-lottie';
import { jsx, css } from '@emotion/react';
import { GET_POKEMONS, getPokemonsVariables } from '../../utils/queries';
import { Container, GridContainer } from './components';
import loaderAnimation from '../../assets/lotties/pikachu-loader.json';
import { CACHED_POKEMONS, usePokemon } from '../../utils/contexts/pokemon-context';
import defaultLottiesOptions from '../../utils/lotties';
import PokemonCard from '../../components/pokemon-card';

function Pokemon() {
  const [, dispatch] = usePokemon();
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: getPokemonsVariables({
      limit: 10
      // limit: 1118
    })
  });

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: CACHED_POKEMONS,
        pokemons: data.pokemons.results
      })
    }
  }, [data, dispatch]);

  if (error) return `Error! ${error.message}`;
  console.log(data, 'data')

  return (
    <Container>
      {loading ? (
        <div css={css`display: flex; flex-direction: column; align-items: center;`}>
          <Lottie
            options={defaultLottiesOptions({ animationData: loaderAnimation })}
            height={150}
            width={150}
            speed={0.35}
          />
          <span>Finding pokemons...</span>
        </div>
      ) : (
        <>
          {/* <Example itemData={data?.pokemons.results} /> */}
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

// const Example = ({ itemData }) => (
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

export default Pokemon;