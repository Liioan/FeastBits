import { useAxios } from '../../../hooks/useAxios';
import baseUrl from '../../../global/BaseUrl';
import { BlogData } from '../../../types/blog';
import { OfferData } from '../../../types/offer';
import { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

//. components
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';
import EditButton from '../../../components/EditButton/EditButton';
import { AddBlog, AddOffer } from '../AddSections/Add';

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
                  <DeleteButton path={`blog/${blog.id}`} />
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
                    <DeleteButton path={`offer/${offer.id}`} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
