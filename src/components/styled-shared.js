import styled from '@emotion/styled';

export const Container = styled.section`
  padding: 2rem 1rem;
  
  @media (min-width: 600px) {
    padding: 2rem 3rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 25px;

  @media (min-width: 600px) {
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 1024px) {
    grid-template-columns: auto auto auto auto;
  }
  @media (min-width: 1440px) {
    grid-template-columns: auto auto auto auto auto;
  }
`;

export const GridItem = styled.div`
  text-align: center;
  border: 1px solid #DCDCDC;
  border-radius: 10px;
  box-shadow: 2px 2px #DCDCDC;
  padding: .75rem;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    width: 100%;
    box-shadow: 5px 5px #DCDCDC;
  }
  &: active {
    box-shadow: none;
  }
  a {
    color: #000000;
  }
`;

export const PokemonImage = styled.div`
  height: 150px;
  background-image: url(${props => props?.img ? props.img : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(0.5);
`;

export const ImageWrapper = styled.div`
  position: relative;
  padding: .5rem;
`;

export const PokemonLabel = styled.div`
  position: absolute;
  bottom: 0;
`;

export const Button = styled.button`
  padding: .7rem 1.5rem;
  background-color: #D7D7D7;
  border-radius: 20px;
`;