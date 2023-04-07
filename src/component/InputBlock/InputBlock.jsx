import './InputBlock.scss';

const InputBlock = (props) => {
  return (
    <div className='input-block'>
      <label htmlFor={props.name} className='input-block__label'>
        {props.label}
      </label>
      <input
        type={props.type}
        className='input-block__input'
        id={props.name}
        name={props.name}
        required
      />
      {props.children}
      <span className={`input-block__error`}>
        {}
      </span>
    </div>
  );
}

export default InputBlock;
