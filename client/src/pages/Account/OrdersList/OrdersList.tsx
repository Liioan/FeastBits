import { useAuth } from '../../../context/AuthContext';
import { useAxios } from '../../../hooks/useAxios';
import { OfferData } from '../../../types/offer';
import baseUrl from '../../../global/BaseUrl';

//. components
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import OrderCard from '../OrderCard/OrderCard';

//. styles
import styles from './OrdersList.module.css';

interface props {
  path: string;
}

export default function OrdersList({ path }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error] = useAxios<OfferData[]>({
    method: 'GET',
    url: `${baseUrl}/${path}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={styles.orderWrapper}>
        {data &&
          data.map((offer, i) => (
            <OrderCard
              key={offer.id + i}
              id={offer.id}
              iteration={i}
              name={offer.name}
              img_url={offer.img_url}
              type={offer.type}
              created_at={offer.created_at}
              updated_at={offer.updated_at}
              is_completed={offer.is_completed}
            />
          ))}
      </div>
    </>
  );
}
