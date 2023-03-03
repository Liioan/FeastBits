//. styles
import styles from './GradientButton.module.css';

interface props {
  text: string;
  width: number;
}

export default function GradientButton({ text, width }: props) {
  return (
    <button className={styles.btn} style={{ maxWidth: `${width}rem` }}>
      {text}
    </button>
  );
}
