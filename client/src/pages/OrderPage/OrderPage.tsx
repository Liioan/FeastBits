import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { OrderData, OrderDetails } from '../../types/order';
import baseUrl from '../../global/BaseUrl';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientButton from '../../components/Buttons/GradientButton/GradientButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//. components
import Header from '../../components/Header/Header';
import OrderForm from './OrderForm/OrderForm';
import OrderSummary from './OrderSummary/OrderSummary';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';

//. styles
import styles from './OrderPage.module.css';

export default function OrderPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const params = useParams();
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<OrderData>(
    {
      method: 'POST',
      url: `${baseUrl}/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        offer_id: params.id,
        city: orderDetails?.city,
        street: orderDetails?.street,
        house_number: orderDetails?.house_number,
      },
    },
    false
  );

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  if (error) return <ErrorScreen errorMessage={error} />;

  if (data)
    return (
      <main className={styles.complete}>
        <motion.section
          className={styles.orderCompleted}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'backInOut' }}
        >
          <div className={styles.innerWrapper}>
            <div className={styles.svgWrapper}>
              <svg
                width='81'
                height='60'
                viewBox='0 0 33 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <motion.path
                  d='M3 11L12.5 20.5L17 16L30 3'
                  stroke='#48E5C2'
                  strokeWidth='4'
                  variants={pathVariants}
                  initial='hidden'
                  animate='visible'
                />
              </svg>
            </div>
            <h4>Ordered</h4>
            <p>Enjoy your meal</p>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.5 }}
          >
            <Link to={'/diets'}>
              <GradientButton text={'Continue Shopping'} width={45} />
            </Link>
          </motion.span>
        </motion.section>
      </main>
    );

  if (!data)
    return (
      <main className={styles.checkout}>
        <Header text='Checkout' step='h2' />
        <div className={styles.wrapper}>
          <section className={styles.orderDetails}>
            <OrderForm setOrderDetails={setOrderDetails} />
          </section>
          <section className={styles.orderSummary}>
            <OrderSummary
              orderDetails={orderDetails}
              offerId={params.id}
              sendRequest={request}
            />
          </section>
        </div>
      </main>
    );

  return <></>;
}
