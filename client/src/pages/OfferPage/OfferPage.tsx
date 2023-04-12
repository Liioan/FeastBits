import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { OfferData } from '../../types/offer';
import baseUrl from '../../global/BaseUrl';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

//. components
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Header from '../../components/Header/Header';
import PriceTag from '../../components/PriceTag/PriceTag';
import GradientButton from '../../components/Buttons/GradientButton/GradientButton';

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
  let isSpeacial = false;
  if (data && data.is_special) {
    isSpeacial = true;
  }

  let now = new Date().getTime();
  const showBadges = () => {
    let badges = false;

    if (isSpeacial) badges = true;
    if (!(createdAtDate + tenDaysInMiliseconds < now)) badges = true;

    return badges;
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <main className={styles.offer}>
        <section className={styles.wrapper}>
          <motion.div
            className={styles.imgWrapper}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
          >
            {showBadges() && (
              <motion.div
                className={styles.badges}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'backInOut', delay: 0.5 }}
              >
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
              </motion.div>
            )}
            <img src={data?.img_url} alt='offer image' />
            <motion.div
              className={styles.badgesMeaning}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'backInOut', delay: 1 }}
            >
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
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.desc}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.2 }}
          >
            <Header text={data ? data.name : 'name'} step={'h2'} />
            <p>{data?.description}</p>
            <div className={styles.innerWrapper}>
              <PriceTag
                price={data ? data.price : 0}
                discount_price={data ? data.discount_price : 0}
              />
              <Link to={`/order/${params.id}`}>
                <GradientButton
                  text={data?.type === 'single' ? 'Order now' : 'Subscribe'}
                  width={25}
                />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
