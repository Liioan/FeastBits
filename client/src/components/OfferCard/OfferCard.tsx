import { Link } from 'react-router-dom';
import { OfferData } from '../../types/offer';

//. components
import GradientButton from '../Buttons/GradientButton';

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
      {!(createdAtDate + 864000000 < new Date().getTime()) && (
        <span className={`material-symbols-outlined ${styles.newOffer}`}>
          fiber_new
        </span>
      )}
      <img src={img_url} alt='' />
      <div className={styles.wrapper}>
        <h5 className={styles.offerName}>{name}</h5>
        <p>{description}</p>
        <div className={styles.innerWrapper}>
          {!discount_price && <div className={styles.price}>{price}$</div>}
          {discount_price && (
            <div className={styles.discountPrice}>
              <span className={styles.oldPrice}>{price}$</span>
              <span className={styles.newPrice}>{discount_price}$</span>
            </div>
          )}

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
