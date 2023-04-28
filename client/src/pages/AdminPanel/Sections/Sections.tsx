import { useAxios } from '../../../hooks/useAxios';
import baseUrl from '../../../global/BaseUrl';
import { BlogData } from '../../../types/blog';
import { OfferData } from '../../../types/offer';
import { OrderData } from '../../../types/order';
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types/user';

//. components
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import DeleteButton from '../../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../../components/Buttons/EditButton/EditButton';
import { AddBlog, AddOffer } from '../AddSections/Add';
import CompleteButton from '../../../components/Buttons/CompleteButton/CompleteButton';
import ChangeRoleButton from '../../../components/Buttons/ChangeRoleButton/ChangeRoleButton';

//. styles
import styles from './Sections.module.css';

export function BlogSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [addingBlog, setAddingBlog] = useState(false);

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [loading, data, error, request] = useAxios<BlogData[]>({
    method: 'GET',
    url: `${baseUrl}/blog${searchValue ? `/search/${searchValue}` : ''}`,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request();
  };

  if (error) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}
      {(addingBlog || isEditing) && (
        <AddBlog
          setId={setId}
          close={isEditing ? setIsEditing : setAddingBlog}
          refresh={request}
          isEditing={isEditing}
          id={id}
        />
      )}
      <section className={styles.topBar}>
        <section className={styles.addNew}>
          <button
            className='material-symbols-outlined'
            onClick={() => setAddingBlog(!addingBlog)}
          >
            {addingBlog ? 'close' : 'add'}
          </button>
        </section>
        <form className={styles.searchBar} onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            onChange={e => setSearchValue(e.target.value)}
            placeholder={'search'}
          />
          <input
            type='submit'
            value='search'
            className='material-symbols-outlined'
          />
        </form>
        <div className={styles.innerWrapper}>
          {data &&
            data.map((blog, i) => (
              <div key={i} className={styles.adminBlogCard}>
                <div className={styles.details}>
                  <img src={blog.img_url} alt='' />
                  <Link to={`/blog/${blog.id}`}>
                    <span>{blog.title}</span>
                  </Link>
                </div>
                <div className={styles.buttons}>
                  <EditButton
                    setIsEditing={setIsEditing}
                    setId={setId}
                    id={blog.id}
                  />
                  <DeleteButton path={`blog/${blog.id}`} refresh={request} />
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export function OfferSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [addingOffer, setAddingOffer] = useState(false);

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [loading, data, error, request] = useAxios<OfferData[]>({
    method: 'GET',
    url: `${baseUrl}/offer${searchValue ? `/search/${searchValue}` : ''}`,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request();
  };

  if (error) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}
      {(addingOffer || isEditing) && (
        <AddOffer
          setId={setId}
          close={isEditing ? setIsEditing : setAddingOffer}
          refresh={request}
          isEditing={isEditing}
          id={id}
        />
      )}
      <section className={styles.topBar}>
        <section className={styles.addNew}>
          <button
            className='material-symbols-outlined'
            onClick={() => setAddingOffer(!addingOffer)}
          >
            add
          </button>
        </section>
        <form className={styles.searchBar} onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            onChange={e => setSearchValue(e.target.value)}
            placeholder={'search'}
          />
          <input
            type='submit'
            value='search'
            className='material-symbols-outlined'
          />
        </form>
        <div className={styles.innerWrapper}>
          {data &&
            data.map((offer, i) => (
              <div key={i} className={styles.adminOfferCard}>
                <div className={styles.details}>
                  <img src={offer.img_url} alt='' />
                  <Link to={`/offer/${offer.id}`}>
                    <span>{offer.name}</span>
                  </Link>
                </div>
                <div className={styles.container}>
                  <div className={styles.price}>
                    <span
                      className={offer.discount_price ? styles.discounted : ''}
                    >
                      {offer.price}$
                    </span>
                    {offer.discount_price && (
                      <span>{offer.discount_price}$</span>
                    )}
                  </div>
                  <div className={styles.buttons}>
                    <EditButton
                      setIsEditing={setIsEditing}
                      setId={setId}
                      id={offer.id}
                    />
                    <DeleteButton
                      path={`offer/${offer.id}`}
                      refresh={request}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export function UserOrdersSection() {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [loading, data, error, request] = useAxios<OrderData[]>({
    method: 'GET',
    url: `${baseUrl}/orders${searchValue ? `/search/${searchValue}` : ''}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request();
  };

  if (error) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}

      <section className={styles.topBar}>
        <form className={styles.searchBar} onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            onChange={e => setSearchValue(e.target.value)}
            placeholder={'search'}
          />
          <input
            type='submit'
            value='search'
            className='material-symbols-outlined'
          />
        </form>
        <div className={styles.innerWrapper}>
          {data &&
            data.map((order, i) => (
              <div key={i} className={styles.adminOrderCard}>
                <p className={styles.adress}>
                  <span>{order.name},</span>
                  <span>{order.city},</span>
                  <span>{order.street},</span>
                  <span>{order.house_number}</span>
                </p>
                {order.type === 'single' ? (
                  <span
                    className={`${styles.status} ${
                      order.is_completed ? styles.completed : ''
                    }`}
                  >
                    {order.is_completed ? 'completed' : 'not completed'}
                  </span>
                ) : null}
                {order.is_completed || order.type === 'subscription' ? (
                  <DeleteButton path={`orders/${order.id}`} refresh={request} />
                ) : (
                  <CompleteButton
                    path={`orders/${order.id}`}
                    refresh={request}
                  />
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export function UsersSection() {
  const context = useAuth();
  if (!context) return null;
  const { token, user: localUser } = context;

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [loading, data, error, request] = useAxios<User[]>({
    method: 'GET',
    url: `${baseUrl}/users${searchValue ? `/search/${searchValue}` : ''}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request();
  };

  if (error) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}

      <section className={styles.topBar}>
        <form className={styles.searchBar} onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            onChange={e => setSearchValue(e.target.value)}
            placeholder={'search'}
          />
          <input
            type='submit'
            value='search'
            className='material-symbols-outlined'
          />
        </form>
        <div className={styles.innerWrapper}>
          {data &&
            data.map((user, i) => (
              <div key={i} className={styles.adminUserCard}>
                <p className={styles.adress}>
                  <span>{user.name},</span>
                  <span>{user.surname},</span>
                  <span>{user.email}</span>
                </p>
                {!(user.id === localUser?.id) ? (
                  <>
                    <ChangeRoleButton
                      id={user.id}
                      refresh={request}
                      isAdmin={user.is_admin}
                    />
                    <DeleteButton path={`users/${user.id}`} refresh={request} />
                  </>
                ) : null}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
