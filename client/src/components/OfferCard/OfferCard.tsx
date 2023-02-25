import { Link } from 'react-router-dom';
import { OfferData } from '../../types/offer';

//. components
import GradientButton from '../Buttons/GradientButton';
import PriceTag from '../PriceTag/PriceTag';

//. styles
import styles from './OfferCard.module.css';

interface props {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  created_at: string;
  img_url: string;
}

const tenDaysInMiliseconds = 864000000;

export default function OfferCard({
  id,
  name,
  description,
  price,
  discount_price,
  created_at,
  img_url,
}: props) {
  let createdAtDate = new Date(created_at).getTime();

  return (
    <div className={styles.offerCard}>
      {!(createdAtDate + tenDaysInMiliseconds < new Date().getTime()) && (
        <span className={`material-symbols-outlined ${styles.newOffer}`}>
          fiber_new
        </span>
      )}
      <img src={img_url} alt='' />
      <div className={styles.wrapper}>
        <h5 className={styles.offerName}>{name}</h5>
        <p>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className={styles.innerWrapper}>
          <PriceTag price={price} discount_price={discount_price} />

          <Link to={`/offer/${id}`}>
            <GradientButton
              text={'Order now'}
              width={discount_price ? 25 : 27}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
