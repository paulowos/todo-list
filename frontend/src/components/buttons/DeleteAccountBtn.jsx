import PropTypes from 'prop-types';
export default function DeleteAccountBtn({
  isDeleting,
  setIsDeleting,
  setIsEditing,
}) {
  const handleClick = () => {
    setIsEditing(false);
    setIsDeleting(!isDeleting);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-error btn-wide btn-ghost text-error">
      Excluir Conta
    </button>
  );
}

DeleteAccountBtn.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  setIsDeleting: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
