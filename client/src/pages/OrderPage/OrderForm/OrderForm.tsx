import { useState, useEffect } from 'react';
import { OrderDetails } from '../../../types/order';
import { z } from 'zod';
import { motion } from 'framer-motion';

//. components
import Header from '../../../components/Header/Header';

//. styles
import styles from './OrderForm.module.css';

interface props {
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails | null>>;
}

export default function OrderForm({ setOrderDetails }: props) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const [street, setStreet] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [houseNumber, setHouseNumber] = useState<number | undefined>();
  const [cardNumber, setCardNumber] = useState<number | undefined>();
  const [expDate, setExpDate] = useState<string | undefined>();
  const [cvc, setCvc] = useState<number | undefined>();
  const [tip, setTip] = useState<number | undefined>();

  const orderDetailsSchema = z.object({
    street: z.string({ required_error: 'Street name is required' }).min(1),
    city: z.string({ required_error: 'City name is required' }).min(1),
    house_number: z
      .number({
        invalid_type_error: 'House number must be a number',
        required_error: 'House number is required',
      })
      .min(1, { message: 'House number must be at least 1 character long' }),
    cardNumber: z
      .number({
        invalid_type_error: 'Card number must be a number',
        required_error: 'Card number is required',
      })
      .refine(val => val.toString().length === 16, {
        message: 'Card number must be 16 characters long',
      }),
    expDate: z.custom<string>(value => {
      return /^(0?[1-9]|1[0-2])\/(0[1-9]|[1-9][0-9])$/.test(value as string);
    }, 'Exp. date must be in a mm/yy format, where mm is less than 31'),
    cvc: z
      .number({
        invalid_type_error: 'Cvc must be number',
        required_error: 'Cvc is required',
      })
      .refine(val => val.toString().length === 3, {
        message: 'Cvc must be 3 characters long',
      }),
    tip: z.number({ invalid_type_error: 'tip must be a number' }).nullish(),
  });

  useEffect(() => {
    let isValid = false;
    const orderDetails = {
      street: street,
      city: city,
      house_number: houseNumber,
      cardNumber: cardNumber,
      expDate: expDate,
      cvc: cvc,
      tip: tip,
    };

    try {
      orderDetailsSchema.parse(orderDetails);
      setValidationError(null);
      isValid = true;
    } catch (err: any) {
      setValidationError(err.errors[0].message);
      isValid = false;
    }

    setOrderDetails({
      street: street,
      city: city,
      house_number: houseNumber,
      cardNumber: cardNumber,
      expDate: expDate,
      cvc: cvc,
      tip: tip,
      isValid: isValid,
    });
  }, [street, city, houseNumber, cardNumber, expDate, cvc, tip]);

  return (
    <motion.form
      className={styles.form}
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'backInOut' }}
    >
      <div className={styles.formSection}>
        <Header text='adress' step='h3' />
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='street'>street</label>
          </legend>
          <input
            type='text'
            id='street'
            className={styles.input}
            onChange={e => setStreet(e.target.value)}
          />
        </fieldset>
        <fieldset className={`${styles.border} ${styles.city}`}>
          <legend className={styles.legend}>
            <label htmlFor='city'>city</label>
          </legend>
          <input
            type='text'
            id='city'
            className={styles.input}
            onChange={e => setCity(e.target.value)}
          />
        </fieldset>
        <fieldset className={`${styles.border} ${styles.house_number}`}>
          <legend className={styles.legend}>
            <label htmlFor='house_number'>house number</label>
          </legend>
          <input
            type='text'
            id='house_number'
            className={styles.input}
            onChange={e => setHouseNumber(Number(e.target.value))}
          />
        </fieldset>
      </div>
      <div className={styles.formSection}>
        <Header text='payment' step='h3' />
        <fieldset className={`${styles.border} ${styles.cardNumber}`}>
          <legend className={styles.legend}>
            <label htmlFor='cardNumber'>card number</label>
          </legend>
          <input
            type='text'
            id='cardNumber'
            className={styles.input}
            onChange={e => setCardNumber(Number(e.target.value))}
          />
        </fieldset>
        <fieldset className={`${styles.border} ${styles.expDate}`}>
          <legend className={styles.legend}>
            <label htmlFor='expDate'>exp. date</label>
          </legend>
          <input
            type='text'
            id='expDate'
            className={styles.input}
            onChange={e => setExpDate(e.target.value)}
          />
        </fieldset>

        <fieldset className={`${styles.border} ${styles.cvc}`}>
          <legend className={styles.legend}>
            <label htmlFor='cvc'>cvc</label>
          </legend>
          <input
            type='text'
            id='cvc'
            className={styles.input}
            onChange={e => setCvc(Number(e.target.value))}
          />
        </fieldset>
      </div>
      <div className={styles.formSection}>
        <Header text='other' step='h3' />
        <fieldset className={`${styles.border} ${styles.tip}`}>
          <legend className={styles.legend}>
            <label htmlFor='tip'>tip</label>
          </legend>
          <input
            type='text'
            id='tip'
            className={styles.input}
            onChange={e => setTip(Number(e.target.value))}
          />
        </fieldset>
        <p className={styles.sideNote}>* not required</p>
        <p className={styles.error}>{validationError}</p>
      </div>
    </motion.form>
  );
}
