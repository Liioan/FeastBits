import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../../context/IsMobileContext';

//. components
import { DesktopMenu, MobileMenu } from './Menus/Menus';

//. styles
import styles from './Navbar.module.css';

//. assets
import Logo from '../../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile, isMenuOpened, setIsMenuOpened } = useIsMobile();

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
      {!isMobile && <DesktopMenu />}
      {isMobile && <MobileMenu />}
    </nav>
  );
}
