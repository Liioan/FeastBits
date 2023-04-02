//. styles
import styles from './EditButton.module.css';

interface props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
}

export default function EditButton({ setIsEditing, setId, id }: props) {
  const handleClick = () => {
    setIsEditing(true);
    setId(id);
  };

  return (
    <button
      className={`material-symbols-outlined ${styles.btn}`}
      onClick={handleClick}
    >
      border_color
    </button>
  );
}
