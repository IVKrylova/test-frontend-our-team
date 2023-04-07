import InputBlock from '../InputBlock/InputBlock';
import './SignUp.scss';

const SignUp = () => {
  return (
    <main className='page-sign-up'>
      <section className='page-sign-up__form-content'>
        <h1 className='page-sign-up__title'>
          Регистрация
        </h1>
        <form className='page-sign-up__form'>
          <InputBlock
            label='Имя'
            name='name'
            type='text'
          />
          <InputBlock
            label='Электронная почта'
            name='email'
            type='email'
          />
          <InputBlock
            label='Пароль'
            name='password'
            type='password'
          />
          <InputBlock
            label='Пароль'
            name='password'
            type='password'
          >
            <button
              className='page-sign-up__button-show-password'
              type='button'
              aria-label='Кнопка изменить видимость пароля'
            ></button>
          </InputBlock>
          <InputBlock
            label='Подтвердите пароль'
            name='passwordVerification'
            type='password'
          >
            <button
              className='page-sign-up__button-show-password'
              type='button'
              aria-label='Кнопка изменить видимость пароля'
            ></button>
          </InputBlock>
          <button className='page-sign-up__button-submit' type='submit'>
            Зарегистрироваться
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
