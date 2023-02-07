//. styles
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
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          optio repellat possimus unde libero veniam ad repellendus suscipit
          molestiae officiis culpa itaque perspiciatis aliquam neque aspernatur
          quam, labore nesciunt tempore ipsa vel provident atque tempora
          quisquam. Dolorum aut reprehenderit facere aperiam exercitationem
          laudantium molestiae quisquam voluptates possimus maiores. Velit, qui?
        </div>
        <img src={AboutImg} alt='people in the kitchen making food' />
      </section>
      <Header text={'Our partnerships'} step={'h3'} />
      <Slider />
    </main>
  );
}
