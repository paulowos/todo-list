import PropTypes from 'prop-types';
import EditSVG from '../../assets/EditSVG';

export default function EditBtn({ isEditing, setIsEditing }) {
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <button onClick={handleClick} className=" btn btn-sm btn-ghost btn-circle">
      <EditSVG />
    </button>
  );
}

EditBtn.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
