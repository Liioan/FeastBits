import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

//. components
import Header from '../../components/Header';

//. styles
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
  const context = useAuth();
  if (!context) return null;
  const { user } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || !user.is_admin) {
      navigate('/');
    }
  }, []);

  return (
    <main>
      <Header text={'Admin Panel'} step={'h2'} />
      {/* */}
      {/* */}
    </main>
  );
}
