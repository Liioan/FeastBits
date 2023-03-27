import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { OrderData, OrderDetails } from '../../types/order';
import baseUrl from '../../global/BaseUrl';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

//. components
import Header from '../../components/Header';
import OrderForm from './OrderForm/OrderForm';
import OrderSummary from './OrderSummary/OrderSummary';

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

  if (data)
    return (
      <main>
        ordered
        {/*  */}
        {/*  */}
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
}
