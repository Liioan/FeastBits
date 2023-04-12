import { useAuth } from '../../../context/AuthContext';
import { useAxios } from '../../../hooks/useAxios';
import baseUrl from '../../../global/BaseUrl';
import { OrderData } from '../../../types/order';

//. components
import ErrorScreen from '../../ErrorScreen/ErrorScreen';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import OrderCard from '../../Cards/OrderCard/OrderCard';
import Header from '../../Header/Header';

//. styles
import styles from './OrdersList.module.css';

interface props {
  path: string;
  headerText: string;
}

export default function OrdersList({ path, headerText }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<OrderData[]>({
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
      {data?.length ? (
        <>
          <Header text={headerText} step='h3' />
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
                  refresh={request}
                />
              ))}
          </div>
        </>
      ) : null}
    </>
  );
}
