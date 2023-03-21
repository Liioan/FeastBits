import { motion } from 'framer-motion';

//. styles
import styles from './About.module.css';

//. component
import Header from '../../components/Header';
import Slider from './Slider/Slider';

//. assets
import AboutImg from '../../assets/AboutImg.png';

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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          optio repellat possimus unde libero veniam ad repellendus suscipit
          molestiae officiis culpa itaque perspiciatis aliquam neque aspernatur
          quam, labore nesciunt tempore ipsa vel provident atque tempora
          quisquam. Dolorum aut reprehenderit facere aperiam exercitationem
          laudantium molestiae quisquam voluptates possimus maiores. Velit, qui?
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
