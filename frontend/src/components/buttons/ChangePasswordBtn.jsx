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
