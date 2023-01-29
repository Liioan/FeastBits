import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

//. styles
import styles from './Navbar.module.css';

//. assets
import Logo from '../../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <nav className={isScrolled ? styles.navBg : ''}>
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
