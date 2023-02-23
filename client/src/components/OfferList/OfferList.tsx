import { useAxios } from '../../hooks/useAxios';
import { OfferData } from '../../types/offer';
import baseUrl from '../../global/BaseUrl';

//. components
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import OfferCard from '../OfferCard/OfferCard';

//. styles
import styles from './OfferList.module.css';

interface props {
  isOnHomePage: boolean;
  path: string;
}

const now = new Date().toLocaleDateString();

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
          data.map(blog => (
            <OfferCard
              id={blog.id}
              name={blog.name}
              description={blog.description}
              price={blog.price}
              discount_price={blog.discount_price}
              created_at={blog.created_at}
              img_url={blog.img_url}
            />
          ))}
      </div>
    </>
  );
}
