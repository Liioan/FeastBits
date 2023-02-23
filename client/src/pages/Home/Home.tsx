//. styles
import styles from './Home.module.css';

//. components
import Hero from './Hero/Hero';
import BlogList from '../Blog/BlogList/BlogList';
import Header from '../../components/Header';

export default function Home() {
  return (
    <main>
      <Hero />
      <section className={styles.homeSection} id='recomendations'>
        <Header text={'Our recomendations'} step={'h2'} />
      </section>
      <section className={styles.homeSection}>
        <Header text={'Single delivery'} step={'h2'} />
      </section>
      <section className={styles.homeSection}>
        <Header text='Our blog' step='h2' />
        <BlogList isOnHomePage={true} />
      </section>
    </main>
  );
}
