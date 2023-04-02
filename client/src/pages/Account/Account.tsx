import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import baseUrl from '../../global/BaseUrl';

//. assets
import accountCircle from '../../assets/accountCircle.png';

//. components
import Header from '../../components/Header';
import GradientButton from '../../components/Buttons/GradientButton/GradientButton';
import RedButton from '../../components/Buttons/RedButton/RedButton';
import OrdersList from './OrdersList/OrdersList';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';

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
  };

  useEffect(() => {
    if (!loading && data) {
      resetUser();
      navigate('/');
    }
  }, [data, loading]);

  if (error) return <ErrorScreen errorMessage={error} />;

  return (
    <main className={styles.account}>
      <Header text={'Account'} step={'h2'} />
      <section className={styles.profileOverview}>
        <img src={accountCircle} alt='' className={styles.profileImg} />
        <section className={styles.innerWrapper}>
          <div className={styles.userInfo}>
            <div className={styles.info}>
              <span className={styles.label}>name and surname:</span>
              <p>{`${user.name} ${user.surname}`}</p>
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
            {user.is_admin ? (
              <Link to={'/admin'}>
                <GradientButton text={'admin panel'} width={40} />
              </Link>
            ) : null}
            <RedButton
              text={'log out'}
              width={40}
              onClickEvent={handleLogOut}
            />
          </div>
        </section>
      </section>
      <OrdersList path={'orders/subs'} headerText={'subscriptions'} />
      <OrdersList path={'orders/single'} headerText={'Single delivery'} />
    </main>
  );
}
