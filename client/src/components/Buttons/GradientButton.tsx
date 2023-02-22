//. styles
import styles from './GradientButton.module.css';

interface props {
  text: string;
}

export default function GradientButton({ text }: props) {
  return <button className={styles.btn}>{text}</button>;
}
