import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../../context/IsMobileContext';
import { useAuth } from '../../../context/AuthContext';

//. components
import { Button } from './Button';

//. styles
import styles from './Menus.module.css';

const links = [
  { path: '/about', text: 'about us', icon: 'info' },
  { path: '/diets', text: 'diets', icon: 'cooking' },
  { path: '/meals', text: 'meals', icon: 'dinner_dining' },
  { path: '/blog', text: 'blog', icon: 'article' },
  { path: '/account', text: 'account', icon: 'account_circle' },
];

export function DesktopMenu() {
  const context = useAuth();
  if (!context) return null;
  const { user } = context;

  let isUserAdmin = false;
  if (user && user.is_admin) {
    isUserAdmin = true;
  }

  return (
    <motion.div
      className={styles.navButtons}
      initial={{ translateY: '-100%', opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: '-100%', opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {isUserAdmin && (
        <NavLink to={'/admin'} className={styles.navLink}>
          admin panel
        </NavLink>
      )}

      {links.map(link => (
        <NavLink
          className={`${styles.navLink} ${
            link.path === '/account' ? 'material-symbols-outlined' : ''
          }`}
          to={link.path}
          key={link.path}
        >
          {link.path === '/account' ? link.icon : link.text}
        </NavLink>
      ))}
    </motion.div>
  );
}

export function MobileMenu() {
  const { isMenuOpened, setIsMenuOpened } = useIsMobile();

  const context = useAuth();
  if (!context) return null;
  const { user } = context;

  let isUserAdmin = false;
  if (user && user.is_admin) {
    isUserAdmin = true;
  }

  return (
    <div className={styles.wrapper}>
      <Button />

      <AnimatePresence>
        {isMenuOpened && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, translateX: '100%' }}
            animate={{ opacity: 1, translateX: '0' }}
            exit={{ opacity: 0, translateX: '100%' }}
            transition={{ duration: 0.5, ease: 'anticipate' }}
          >
            {isUserAdmin && (
              <NavLink to={'/admin'} className={styles.navLink}>
                admin panel
                <span className='material-symbols-outlined'>
                  admin_panel_settings
                </span>
              </NavLink>
            )}
            {links.map(link => (
              <NavLink
                className={`${styles.navLink}`}
                to={link.path}
                key={link.path}
                onClick={() => setIsMenuOpened(!isMenuOpened)}
              >
                <span>{link.text}</span>
                <span className='material-symbols-outlined'>{link.icon}</span>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpened && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
