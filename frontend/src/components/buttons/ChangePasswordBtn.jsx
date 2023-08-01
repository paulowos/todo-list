import PropTypes from 'prop-types';
export default function ChangePasswordBtn({
  isEditing,
  setIsEditing,
  setIsDeleting,
}) {
  const handleClick = () => {
    setIsDeleting(false);
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
  setIsDeleting: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
