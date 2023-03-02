import { useAxios } from '../../hooks/useAxios';
import baseUrl from '../../global/BaseUrl';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

//. styles
import styles from './DeleteButton.module.css';

interface props {
  path: string;
}

export default function DeleteButton({ path }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<number>(
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/${path}`,
    },
    false
  );

  const handleClick = () => {
    request();
  };

  useEffect(() => {
    if (data && !loading) {
      location.reload();
    }
  }, [data, loading]);

  return (
    <button
      className={`material-symbols-outlined ${styles.deleteButton}`}
      onClick={handleClick}
    >
      delete
    </button>
  );
}
