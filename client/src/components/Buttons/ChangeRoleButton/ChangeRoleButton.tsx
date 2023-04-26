import baseUrl from '../../../global/BaseUrl';
import { useEffect } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types/user';

//. styles
import styles from './ChangeRoleButton.module.css';

interface props {
  id: number;
  refresh: () => void;
  isAdmin: boolean;
}

export default function ChangeRoleButton({ refresh, id, isAdmin }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [loading, data, error, request] = useAxios<User>(
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/users/${id}`,
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
      className={`${styles.btn} ${isAdmin ? styles.admin : styles.user}`}
      onClick={request}
    >
      role: {isAdmin ? 'admin' : 'user'}
    </button>
  );
}
