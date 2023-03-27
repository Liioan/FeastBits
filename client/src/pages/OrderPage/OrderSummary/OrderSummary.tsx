import { useAxios } from '../../../hooks/useAxios';
import { OfferData } from '../../../types/offer';
import { OrderDetails } from '../../../types/order';
import baseUrl from '../../../global/BaseUrl';

//. components
import Header from '../../../components/Header';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

//. styles
import styles from './OrderSummary.module.css';

interface props {
  offerId: string | undefined;
  orderDetails: OrderDetails | null;
  sendRequest: () => void;
}

export default function OrderSummary({
  offerId,
  orderDetails,
  sendRequest,
}: props) {
  const [loading, data, error] = useAxios<OfferData>({
    method: 'GET',
    url: `${baseUrl}/offer/${offerId}`,
  });

  const calcShippingPrice = () => {
    if (data === undefined) return 2.2;
    if (data.discount_price && data.discount_price > 20) return 0;
    if (data.price >= 20) return 0;
    if (data.type === 'subscribtion') return 0;
    return 2.2;
  };

  const calcFinalPrice = () => {
    if (data === undefined) return null;
    if (data?.discount_price)
      return (
        data.discount_price +
        calcShippingPrice() +
        (orderDetails?.tip !== undefined ? orderDetails.tip : 0)
      );
    return (
      data.price +
      calcShippingPrice() +
      (orderDetails?.tip !== undefined ? orderDetails.tip : 0)
    );
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <section className={styles.card}>
        <Header text={'order summary'} step={'h3'} />
        <div className={styles.imgWrapper}>
          <img src={data?.img_url} alt='' />
          <span>{data?.name}</span>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.info}>
            {data?.type === 'single' && (
              <p className={styles.waitingTime}>
                <span className={styles.label}>waiting time: </span>
                <span className={styles.value}>~15min</span>
              </p>
            )}
            <p>
              <span className={styles.label}>price:</span>
              <span className={styles.value}>
                {data?.discount_price && (
                  <>
                    <span className={styles.discount}>{data?.price}$</span>
                    {data?.discount_price}$
                  </>
                )}
                {!data?.discount_price && <span>{data?.price}$</span>}
              </span>
            </p>
            <p>
              <span className={styles.label}>shipping:</span>
              <span className={styles.value}>
                {calcShippingPrice() === 0 ? '0' : 2.2}$
              </span>
            </p>
            <p className={styles.sideNote}>
              * free shipping for diets and orders above 20$
            </p>
            {orderDetails?.tip !== 0 && orderDetails?.tip !== undefined && (
              <p>
                <span className={styles.label}>tip:</span>
                <span className={styles.value}>{orderDetails?.tip}$</span>
              </p>
            )}
            <p className={styles.summary}>
              <span className={styles.label}>total:</span>
              <span className={styles.value}>{calcFinalPrice()}$</span>
            </p>
          </div>
        </div>
        <button
          className={`${styles.order} ${
            orderDetails?.isValid ? '' : styles.invalid
          }`}
          onClick={sendRequest}
        >
          {data?.type === 'single' ? 'order' : 'subscribe'}
        </button>
      </section>
    </>
  );
}
