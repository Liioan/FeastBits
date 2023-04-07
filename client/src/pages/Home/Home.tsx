import { Link } from 'react-router-dom';

//. styles
import styles from './Home.module.css';

//. components
import Hero from './Hero/Hero';
import BlogList from '../../components/Lists/BlogList/BlogList';
import OfferList from '../../components/Lists/OfferList/OfferList';
import Header from '../../components/Header';
import GradientButton from '../../components/Buttons/GradientButton/GradientButton';

export default function Home() {
  return (
    <main>
      <Hero />
      <section className={styles.homeSection} id='recomendations'>
        <Header text={'Our recomendations'} step={'h2'} />
        <OfferList isOnHomePage={true} path={'homepageSubs'} />
        <Link to={'/diets'}>
          <GradientButton text='See other offers' width={36} />
        </Link>
      </section>
      <section className={styles.homeSection}>
        <Header text={'Single delivery'} step={'h2'} />
        <OfferList isOnHomePage={true} path={'homepageSingle'} />
        <Link to={'meals'}>
          <GradientButton text='See other offers' width={36} />
        </Link>
      </section>
      <section className={styles.homeSection}>
        <Header text='Our blog' step='h2' />
        <BlogList isOnHomePage={true} path={'homepageBlog'} />
        <Link to={'blog'}>
          <GradientButton text='See more posts' width={36} />
        </Link>
      </section>
    </main>
  );
}
