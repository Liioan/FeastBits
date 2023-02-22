//. styles
import styles from './ErrorScreen.module.css';

interface props {
  errorMessage: string;
}

export default function ErrorScreen({ errorMessage }: props) {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <main className={styles.errorScreen}>
      {errorMessage}
      <button className={styles.refresh} onClick={handleClick}>
        Refresh
      </button>
    </main>
  );
}
