import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

//. components
import Header from '../../components/Header';
import { SearchBlogs } from './SearchSections/Search';

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
    <main className={styles.adminPanel}>
      <Header text={'Admin Panel'} step={'h2'} />
      <Header text='blog' step='h3' />
      <SearchBlogs />
    </main>
  );
}
