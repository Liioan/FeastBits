import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useIsMobile } from '../../../context/IsMobileContext';

//. styles
import styles from './Slider.module.css';

//. assets
import FeastBitsLogo from '../../../assets/SliderImg/logo.png';
import CzarnojanLogo from '../../../assets/SliderImg/czarnafirma.png';
import PizzaLogo from '../../../assets/SliderImg/pizza.png';
import SchoolLogo from '../../../assets/SliderImg/szkola.png';

const audio = new Audio('https://czarnojan3.netlify.app/funkytown.mp3');

audio.volume = 0.5;
audio.loop = true;

export default function Slider() {
  const { isMobile } = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.play();
      audio.currentTime = 0;
    }
    if (!isPlaying) {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <>
      {isPlaying && (
        <img
          src='https://s1.static.esor.pzkosz.pl/internalfiles/image/zawodnicy/s25/8127/165-165/66129.jpg'
          alt='czarnojan'
          className={styles.czarnojan}
        />
      )}
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
    </>
  );
}
