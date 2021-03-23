import Swal from 'sweetalert2';

export const catchAnotherPokemonAndGiveNickname = async () => {
  const value = await Swal.fire({
    title: 'You already have this pokemon. Do you want to have more with another nickname?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yup. Let\'s catch another one'
  })
  return value.isConfirmed;
}

export const showModalAndGiveNickname = async() => {
  const { value: nickname } = await Swal.fire({
    input: 'text',
    inputLabel: 'Yeay! You got the pokemon! Write your pokemon\'s nickname',
    inputPlaceholder: 'Enter nickname'
  })

  if (nickname) {
    Swal.fire(`Your pokemon has been named to ${nickname}`);
    return nickname;
  }
  return;
}

export const failedToCatchPokemon = () => {
  Swal.fire(
    `Pokemon failed to catch. Wish you luck on another catch!`,
    '',
    'error'
  )
}

export const nicknameDuplicate = () => {
  Swal.fire(
    `You already named a pokemon with this nickname!`,
    '',
    'error'
  )
}