import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import baseUrl from '../../global/BaseUrl';

//. assets
import accountCircle from '../../assets/accountCircle.png';

//. components
import Header from '../../components/Header';
import GradientButton from '../../components/Buttons/GradientButton';
import RedButton from '../../components/Buttons/RedButton';

//. styles
import styles from './Account.module.css';

export default function Account() {
  const context = useAuth();
  if (!context) return null;
  const { user, token, resetUser } = context;

  const [loading, data, error, request] = useAxios(
    {
      method: 'POST',
      url: `${baseUrl}/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  if (user === undefined) return null;

  const handleLogOut = () => {
    request();
    resetUser();
    navigate('/');
    window.location.reload();
  };

  return (
    <main>
      <Header text={'Account'} step={'h2'} />
      <section className={styles.profileOverview}>
        <img src={accountCircle} alt='' />
        <section className={styles.innerWrapper}>
          <div className={styles.userInfo}>
            <div className={styles.info}>
              <span className={styles.label}>name:</span>
              <p>{user.name}</p>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>email:</span>
              <p>
                {user.email.length > 35
                  ? user.email.substring(0, 35)
                  : user.email}
              </p>
            </div>
          </div>
          <div className={styles.accountOperations}>
            <Link to={'/change-password'}>
              <GradientButton text={'change password'} width={40} />
            </Link>
            <RedButton
              text={'log out'}
              width={40}
              onClickEvent={handleLogOut}
            />
          </div>
        </section>
      </section>
      {/* */}
    </main>
  );
}
