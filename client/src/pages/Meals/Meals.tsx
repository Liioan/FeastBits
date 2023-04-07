//. components
import Header from '../../components/Header';
import OfferList from '../../components/Lists/OfferList/OfferList';

//. styles
import styles from './Meals.module.css';

export default function Meals() {
  return (
    <main className={styles.meals}>
      <Header text={'Meals'} step={'h2'} />
      <OfferList isOnHomePage={false} path={'offer/single'} />
    </main>
  );
}
