import baseUrl from '../../../global/BaseUrl';
import { useEffect } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { useAuth } from '../../../context/AuthContext';

//. styles
import styles from './CompleteButton.module.css';

interface props {
  path: string;
  refresh: () => void;
}

export default function CompleteButton({ path, refresh }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<number>(
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/${path}`,
    },
    false
  );

  useEffect(() => {
    if (data && !loading) {
      refresh();
    }
  }, [data, loading]);

  return (
    <button
      className={`material-symbols-outlined ${styles.btn}`}
      onClick={request}
    >
      done
    </button>
  );
}
