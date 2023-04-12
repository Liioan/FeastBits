//. components
import Header from '../../components/Header/Header';
import OfferList from '../../components/Lists/OfferList/OfferList';

//. styles
import styles from './Diets.module.css';

export default function Diets() {
  return (
    <main className={styles.diets}>
      <Header text={'Diets'} step={'h2'} />
      <OfferList isOnHomePage={false} path={'offer/subs'} />
    </main>
  );
}
