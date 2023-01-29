import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '../../../context/IsMobileContext';

//.styles
import styles from './Menus.module.css';

export function Button() {
  const { isMenuOpened, setIsMenuOpened } = useIsMobile();

  return (
    <button
      onClick={() => {
        setIsMenuOpened(!isMenuOpened);
      }}
      className={styles.menuToggle}
    >
      <AnimatePresence>
        {!isMenuOpened && (
          <motion.span
            initial={{ translateY: '-100%', opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: '-100%', opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`material-symbols-outlined ${styles.navbarIcon}`}
          >
            menu
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpened && (
          <motion.span
            initial={{ translateY: '100%', opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: '100%', opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`material-symbols-outlined ${styles.navbarIcon}`}
          >
            close
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
