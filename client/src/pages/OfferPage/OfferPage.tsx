import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { OfferData } from '../../types/offer';
import baseUrl from '../../global/BaseUrl';

//. components
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Header from '../../components/Header';
import PriceTag from '../../components/PriceTag/PriceTag';
import GradientButton from '../../components/Buttons/GradientButton';

//. styles
import styles from './OfferPage.module.css';

const tenDaysInMiliseconds = 864000000;

export default function OfferPage() {
  const params = useParams();

  const [loading, data, error] = useAxios<OfferData>({
    method: 'GET',
    url: `${baseUrl}/offer/${params.id}`,
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  let createdAtDate = new Date(data ? data.created_at : 0).getTime();
  let isSpeacial;
  if (data && data.is_special) {
    isSpeacial = true;
  }

  let now = new Date().getTime();

  return (
    <>
      {loading && <LoadingScreen />}
      <main className={styles.offer}>
        <section className={styles.wrapper}>
          <div className={styles.imgWrapper}>
            <div className={styles.badges}>
              {isSpeacial && (
                <span className={`material-symbols-outlined ${styles.badge}`}>
                  magic_button
                </span>
              )}
              {!(createdAtDate + tenDaysInMiliseconds < now) && (
                <span className={`material-symbols-outlined ${styles.badge}`}>
                  fiber_new
                </span>
              )}{' '}
            </div>
            <img src={data?.img_url} alt='offer image' />
            <div className={styles.badgesMeaning}>
              {isSpeacial && (
                <>
                  <span
                    className={`material-symbols-outlined ${styles.badgeMeaning}`}
                  >
                    magic_button
                  </span>
                  <span>- special offer</span>
                </>
              )}
              {!(createdAtDate + tenDaysInMiliseconds < now) && (
                <>
                  <span
                    className={`material-symbols-outlined ${styles.badgeMeaning}`}
                  >
                    fiber_new
                  </span>
                  <span>- new offer</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.desc}>
            <Header text={data ? data.name : 'name'} step={'h2'} />
            <p>{data?.description}</p>
            <div className={styles.innerWrapper}>
              <PriceTag
                price={data ? data.price : 0}
                discount_price={data ? data.discount_price : 0}
              />
              <GradientButton text='Order now' width={25} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
