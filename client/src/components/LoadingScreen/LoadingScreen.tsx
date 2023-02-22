import BarLoader from 'react-spinners/BarLoader';

//. styles
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <BarLoader color='#55dde0' />
    </div>
  );
}
