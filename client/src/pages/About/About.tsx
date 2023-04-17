import { motion } from 'framer-motion';

//. styles
import styles from './About.module.css';

//. component
import Header from '../../components/Header/Header';
import Slider from './Slider/Slider';

//. assets
import AboutImg from '../../assets/AboutImg.png';
``;
export default function About() {
  return (
    <main className={styles.about}>
      <Header text={'About us'} step={'h2'} />
      <section className={styles.aboutDesc}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'backInOut' }}
        >
          Welcome to FeastBits! Our catering company specializes in providing
          mouth-watering dishes that are perfect for any event. Our menu
          features a diverse range of flavors and cuisines that are sure to
          impress your guests. From corporate events to private parties, we are
          dedicated to providing exceptional service and delicious food that
          caters to your needs. Contact us today to learn more about how we can
          make your next event a success.
        </motion.div>
        <motion.img
          src={AboutImg}
          alt='people in the kitchen making food'
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'backInOut', delay: 0.2 }}
        />
      </section>
      <Header text={'Our partnerships'} step={'h3'} />
      <Slider />
    </main>
  );
}
