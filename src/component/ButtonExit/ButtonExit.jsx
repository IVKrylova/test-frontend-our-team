import './ButtonExit.scss';

const ButtonExit = (props) => {
  return (
    <button
      className='button-exit'
      type='button'
      aria-label='Кнопка выйти из приложения'
      onClick={props.handleExit}
    ></button>
  );
}

export default ButtonExit;
