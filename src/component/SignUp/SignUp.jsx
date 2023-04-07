import { useEffect, useState } from 'react';
import InputBlock from '../InputBlock/InputBlock';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './SignUp.scss';

const SignUp = (props) => {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();
  const [errorPassword, setErrorPassword] = useState('');
  const classButtonSubmit = `page-sign-up__button-submit ${!isValid ? 'page-sign-up__button-submit_disabled' : ''}`;

  useEffect(() => {
    if (values.password !== values.passwordVerification) {
      setIsValid(false);
      setErrorPassword('Пароли не совпадают');
    } else if (!errors.name && !errors.email && errors.password && errors.passwordVerification) {
      setIsValid(true);
      setErrorPassword('');
    } else {
      setErrorPassword('');
    }
  }, [values.name, values.email, values.password, values.passwordVerification]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.sendProperty({
      name: values.name,
      email: values.email,
      password: values.password,
      passwordVerification: values.passwordVerification,
    });
  }

  return (
    <main className='page-sign-up'>
      <section className='page-sign-up__form-content'>
        <h1 className='page-sign-up__title'>
          Регистрация
        </h1>
        <form className='form page-sign-up__form' onSubmit={handleSubmit} noValidate>
          <InputBlock
            label='Имя'
            name='name'
            type='text'
            value={values.name}
            onChange={handleChange}
            isValid={isValid}
            errorMessage={errors.name}
          />
          <InputBlock
            label='Электронная почта'
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            isValid={isValid}
            errorMessage={errors.email}
          />
          <InputBlock
            label='Пароль'
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
            isValid={isValid}
            errorMessage={errors.password}
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
            value={values.passwordVerification}
            onChange={handleChange}
            isValid={isValid}
            errorMessage={errors.passwordVerification}
            errorPassword={errorPassword}
          >
            <button
              className='page-sign-up__button-show-password'
              type='button'
              aria-label='Кнопка изменить видимость пароля'
            ></button>
          </InputBlock>
          <button
            className={classButtonSubmit}
            type='submit'
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
