import { NavLink, useLocation } from 'react-router-dom';

//. styles
import styles from './Navbar.module.css';

//. assets
import Logo from '../../assets/logo.png';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={location.pathname === '/' ? styles.homeNav : styles.nav}>
      <NavLink to={'/'}>
        <img src={Logo} alt='' className='logo' />
      </NavLink>
      <div className={styles.navButtons}>
        <NavLink className={styles.navLink} to={'/about'}>
          about us
        </NavLink>
        <NavLink className={styles.navLink} to={'/diets'}>
          diets
        </NavLink>
        <NavLink className={styles.navLink} to={'/meals'}>
          meals
        </NavLink>
        <NavLink className={styles.navLink} to={'/blog'}>
          blog
        </NavLink>
        <NavLink className={styles.navLink} to={'/contact'}>
          contact
        </NavLink>
        <NavLink
          className={`${styles.navLink} material-symbols-outlined`}
          to={'/account'}
        >
          account_circle
        </NavLink>
      </div>
    </nav>
  );
}
