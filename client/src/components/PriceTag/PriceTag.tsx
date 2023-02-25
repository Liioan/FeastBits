//. styles
import styles from './PriceTag.module.css';

interface props {
  price: number;
  discount_price: number | null;
}

export default function PriceTag({ price, discount_price }: props) {
  return (
    <>
      {!discount_price && <div className={styles.price}>{price}$</div>}
      {discount_price && (
        <div className={styles.discountPrice}>
          <span className={styles.oldPrice}>{price}$</span>
          <span className={styles.newPrice}>{discount_price}$</span>
        </div>
      )}
    </>
  );
}
