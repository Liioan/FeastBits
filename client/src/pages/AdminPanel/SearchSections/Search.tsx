import { useAxios } from '../../../hooks/useAxios';
import baseUrl from '../../../global/BaseUrl';
import { BlogData } from '../../../types/blog';
import { OfferData } from '../../../types/offer';
import { useState, useEffect, FormEvent } from 'react';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';

//. styles
import styles from './Search.module.css';

export function SearchBlogs() {
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
      <section className={styles.search}>
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
                  <span>{blog.title}</span>
                </div>
                <div className={styles.buttons}>
                  <DeleteButton path={`blog/${blog.id}`} />
                  {/* edit button here ^ */}
                  <DeleteButton path={`blog/${blog.id}`} />
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export function SearchOffers() {
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
      <section className={styles.search}>
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
                  <span>{offer.name}</span>
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
                    <DeleteButton path={`offer/${offer.id}`} />
                    {/* edit button here ^ */}
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
