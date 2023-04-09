import { useLocation } from 'react-router-dom';
import InputBlock from '../InputBlock/InputBlock';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './PopupEditAvatar.scss';

const PopupEditAvatar = (props) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  let location = useLocation();

  const classButtomSubmit = `popup__button-submit ${!isValid ? 'popup__button-submit_disabled' : ''}`;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.sendNewAvatar({
      avatar: values.avatar,
      id: location.pathname.slice(8),
    });
  }

  return (
    <section className={`popup ${props.isOpenPopup ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          onClick={props.onClosePopup}
          type='button'
          className='popup__button-close'
          aria-label='Кнопка закрыть'
        ></button>
        <p className='popup__title'>
          Редактировать аватар
        </p>
        <form
          onSubmit={handleSubmit}
          className='popup__form form'
          noValidate
        >
          <InputBlock
            label='Новое фото'
            name='avatar'
            type='url'
            value={values.avatar}
            onChange={handleChange}
            isValid={isValid}
            errorMessage={errors.avatar}
          />
          <button
            disabled={!isValid}
            type='submit'
            className={classButtomSubmit}
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupEditAvatar;
