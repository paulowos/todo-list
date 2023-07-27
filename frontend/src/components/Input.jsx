import PropTypes from 'prop-types';
export default function Input({
  onChange,
  value,
  error,
  placeholder,
  type,
  name,
}) {
  const { path, message } = error;
  return (
    <div className="w-full max-w-xs ">
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered ${
          path === name && 'input-error'
        } w-full max-w-xs`}
        onChange={onChange}
        value={value}
        name={name}
      />
      <label className="label">
        <span className="font-bold label-text-alt text-error">
          {path === name && message}
        </span>
      </label>
    </div>
  );
}

Input.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.string,
  }),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;
