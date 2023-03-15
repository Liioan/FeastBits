//. styles
import styles from './RedButton.module.css';

interface props {
  text: string;
  width: number;
  onClickEvent: undefined | (() => void);
}

export default function RedButton({
  text,
  width,
  onClickEvent = undefined,
}: props) {
  return (
    <button
      className={styles.btn}
      style={{ maxWidth: `${width}rem` }}
      onClick={onClickEvent}
    >
      {text}
    </button>
  );
}
