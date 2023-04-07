//. styles
import styles from './BlogHeader.module.css';

interface props {
  text: string;
}

export default function BlogHeader({ text }: props) {
  return <h4 className={styles.blogHeader}>{text}</h4>;
}
