import './ButtonGoBack.scss';

const ButtonGoBack = (props) => {
  return (
    <button
      className='button-go-back'
      type='button'
      aria-label='Кнопка вернуться назад'
      onClick={props.handleClickGoBack}
    ></button>
  );
}

export default ButtonGoBack;
