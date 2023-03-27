import { useState, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { OrderData, OrderDetails } from '../../types/order';
import baseUrl from '../../global/BaseUrl';
import { useAuth } from '../../context/AuthContext';

//. components
import Header from '../../components/Header';
import GradientButton from '../../components/Buttons/GradientButton';
import OrderForm from './OrderForm/OrderForm';

//. styles
import styles from './OrderPage.module.css';

export default function OrderPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

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
    },
    false
  );

  return (
    <main className={styles.checkout}>
      <Header text='Checkout' step='h2' />
      <div className={styles.wrapper}>
        <section className={styles.orderDetails}>
          <OrderForm setOrderDetails={setOrderDetails} />
        </section>
        <section className={styles.orderSummary}></section>
      </div>
    </main>
  );
}
