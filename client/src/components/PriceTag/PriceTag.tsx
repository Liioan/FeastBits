import { motion } from 'framer-motion';

//. styles
import styles from './PriceTag.module.css';

interface props {
  price: number;
  discount_price: number | null;
}

export default function PriceTag({ price, discount_price }: props) {
  return (
    <>
      {!discount_price && (
        <div className={styles.price}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.5 }}
          >
            {price}$
          </motion.span>
        </div>
      )}
      {discount_price && (
        <div className={styles.discountPrice}>
          <motion.span
            className={styles.oldPrice}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.5 }}
          >
            {price}$
          </motion.span>
          <motion.span
            className={styles.newPrice}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.7 }}
          >
            {discount_price}$
          </motion.span>
        </div>
      )}
    </>
  );
}
