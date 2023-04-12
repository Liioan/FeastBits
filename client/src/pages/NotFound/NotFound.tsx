import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

//. components
import GradientButton from '../../components/Buttons/GradientButton/GradientButton';

//. assets
import errorSVG from '../../assets/errorSVG.svg';

//. styles
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'backInOut' }}
      >
        <img src={errorSVG} alt='404 error' />
        <h2>Page not found!</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to={'/'}>
          <GradientButton text='Go back to home page' width={42} />
        </Link>
      </motion.div>
    </main>
  );
}
