import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAxios } from '../../../hooks/useAxios';
import baseUrl from '../../../global/BaseUrl';
import { useAuth } from '../../../context/AuthContext';

//. components
import GradientButton from '../../../components/Buttons/GradientButton';
import RedButton from '../../../components/Buttons/RedButton';

//. styles
import styles from './OrderCard.module.css';

interface props {
  id: number;
  iteration: number;
  name: string;
  img_url: string;
  type: string;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
}

export default function OrderCard({
  id,
  iteration,
  name,
  img_url,
  type,
  created_at,
  updated_at,
  is_completed,
}: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<string>(
    {
      method: `${type === 'subscription' ? 'DELETE' : 'PUT'}`,
      url: `${baseUrl}/orders/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    false
  );

  const createdAtDate = new Date(created_at).toLocaleString();
  const updatedAtDate = new Date(updated_at).toLocaleString();

  return (
    <motion.div
      className={styles.offerCard}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'backInOut', delay: 0.1 * iteration }}
    >
      <img src={img_url} alt='' />
      <div className={styles.wrapper}>
        <h5 className={styles.offerName}>{name}</h5>

        <div className={styles.innerWrapper}>
          <Link to={`/offer/${id}`}>
            <GradientButton
              text={type === 'subscription' ? 'See diet' : 'See meal'}
              width={40}
            />
          </Link>
          {type === 'subscription' && (
            <RedButton text={'Cancel'} width={40} onClickEvent={request} />
          )}
          {type === 'single' && (
            <span
              className={`${
                is_completed ? styles.completed : styles.notCompleted
              } ${styles.time}`}
            >
              {is_completed
                ? `order delivered at: ${updatedAtDate}`
                : `order submited at: ${createdAtDate}`}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
