import './InputBlock.scss';

const InputBlock = (props) => {
  const classInput = props.name !== 'passwordVerification'
    ? `input-block__input ${!props.isValid && props.errorMessage ? 'input-block__input_error' : ''}`
    : `input-block__input ${!props.isValid && (props.errorMessage || props.errorPassword) ? 'input-block__input_error' : ''}`;

  return (
    <div className='input-block'>
      <label htmlFor={props.name} className='input-block__label'>
        {props.label}
      </label>
      <input
        type={props.type}
        className={classInput}
        id={props.name}
        name={props.name}
        required
        value={props.value || ''}
        onChange={props.onChange}
      />
      {props.children}
      {props.name !== 'passwordVerification' &&
        <span className={`input-block__error ${!props.isValid ? 'input-block__error_active' : ''}`}>
          {!props.isValid && props.errorMessage}
        </span>
      }
      {props.name === 'passwordVerification' &&
        <span className={`input-block__error ${!props.isValid ? 'input-block__error_active' : ''}`}>
          {!props.isValid ? (props.errorMessage ? props.errorMessage : props.errorPassword) : ''}
        </span>
      }
    </div>
  );
}

export default InputBlock;
