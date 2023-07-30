import PropTypes from 'prop-types';
export default function ChangePasswordBtn({ isEditing, setIsEditing }) {
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <button onClick={handleClick} className="btn btn-accent btn-wide">
      Mudar Senha
    </button>
  );
}

ChangePasswordBtn.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
