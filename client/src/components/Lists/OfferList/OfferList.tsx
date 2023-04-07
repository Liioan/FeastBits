import { useAxios } from '../../../hooks/useAxios';
import { OfferData } from '../../../types/offer';
import baseUrl from '../../../global/BaseUrl';

//. components
import ErrorScreen from '../../ErrorScreen/ErrorScreen';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import OfferCard from '../../Cards/OfferCard/OfferCard';

//. styles
import styles from './OfferList.module.css';

interface props {
  isOnHomePage: boolean;
  path: string;
}

export default function OfferList({ isOnHomePage = false, path }: props) {
  const [loading, data, error] = useAxios<OfferData[]>({
    method: 'GET',
    url: `${baseUrl}/${path}`,
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && !isOnHomePage && <LoadingScreen />}
      <div className={styles.offerWrapper}>
        {data &&
          data.map((offer, i) => (
            <OfferCard
              key={offer.id}
              id={offer.id}
              iteration={i}
              name={offer.name}
              description={offer.description}
              price={offer.price}
              discount_price={offer.discount_price}
              created_at={offer.created_at}
              img_url={offer.img_url}
              type={offer.type}
            />
          ))}
      </div>
    </>
  );
}
