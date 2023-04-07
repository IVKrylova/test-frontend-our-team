import './SignUp.scss';

const SignUp = () => {
  return (
    <main className='page-sign-up'>
      <h1 className='page-sign-up__title'>
        Регистрация
      </h1>
      <form className='page-sign-up__form'>
        <label htmlFor='name' className='page-sign-up__label'>
          Имя
        </label>
        <input
          type='text'
          className='page-sign-up__input'
          id='name'
          name='name'
          required
        />
        <span className={`page-sign-up__error`}>
          {}
        </span>
        <label htmlFor='email' className='page-sign-up__label'>
          Электронная почта
        </label>
        <input
          type='email'
          className='page-sign-up__input'
          id='email'
          name='email'
          required
        />
        <span className={`page-sign-up__error`}>
          {}
        </span>
        <label htmlFor='password' className='page-sign-up__label'>
          Пароль
        </label>
        <input
          type='password'
          className='page-sign-up__input'
          id='password'
          name='password'
          required
        />
        <button
          className='page-sign-up__button-show-password'
          type='button'
          aria-label='Кнопка показать пароль'
        ></button>
        <span className={`page-sign-up__error`}>
          {}
        </span>
        <label htmlFor='password-verification' className='page-sign-up__label'>
          Подтвердите пароль
        </label>
        <input
          type='password'
          className='page-sign-up__input'
          id='password-verification'
          name='passwordVerification'
          required
        />
        <button
          className='page-sign-up__button-show-password'
          type='button'
          aria-label='Кнопка показать пароль'
        ></button>
        <span className={`page-sign-up__error`}>
          {}
        </span>
        <button className='page-sign-up__button-submit' type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}

export default SignUp;
