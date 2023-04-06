import Marquee from 'react-fast-marquee';
import { useIsMobile } from '../../../context/IsMobileContext';

//. styles
import styles from './Slider.module.css';

//. assets
import FeastBitsLogo from '../../../assets/SliderImg/logo.png';
import CzarnojanLogo from '../../../assets/SliderImg/czarnafirma.png';
import PizzaLogo from '../../../assets/SliderImg/pizza.png';
import SchoolLogo from '../../../assets/SliderImg/szkola.png';

export default function Slider() {
  const { isMobile } = useIsMobile();

  const handleClick = () => {
    window.open(
      'https://czarnojan.netlify.app',
      '_blank',
      '`left=0, top=0, height=500, width=1000'
    );
  };

  return (
    <Marquee
      gradient={!isMobile}
      gradientColor={[51, 51, 51]}
      speed={50}
      className={styles.marquee}
      pauseOnHover={true}
    >
      <img src={FeastBitsLogo} alt='' role={'presentation'} />
      <img
        src={CzarnojanLogo}
        alt=''
        role={'presentation'}
        onClick={handleClick}
      />
      <img src={PizzaLogo} alt='' role={'presentation'} />
      <img src={SchoolLogo} alt='' role={'presentation'} />
    </Marquee>
  );
}
