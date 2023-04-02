import { Link } from 'react-router-dom';
import { OfferData } from '../../types/offer';
import { motion } from 'framer-motion';

//. components
import GradientButton from '../Buttons/GradientButton/GradientButton';
import PriceTag from '../PriceTag/PriceTag';

//. styles
import styles from './OfferCard.module.css';

interface props {
  id: number;
  iteration: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  created_at: string;
  img_url: string;
  type: string;
}

const tenDaysInMiliseconds = 864000000;

export default function OfferCard({
  id,
  iteration,
  name,
  description,
  price,
  discount_price,
  created_at,
  img_url,
  type,
}: props) {
  let createdAtDate = new Date(created_at).getTime();

  return (
    <motion.div
      className={styles.offerCard}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'backInOut', delay: 0.1 * iteration }}
    >
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
              text={type === 'subscription' ? 'Subscribe' : 'Order now'}
              width={discount_price ? 25 : 27}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
