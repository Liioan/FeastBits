import { useParams, Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { BlogData } from '../../types/blog';
import baseUrl from '../../global/BaseUrl';
import { motion } from 'framer-motion';

//. components
import Header from '../../components/Header/Header';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';

//. styles
import styles from './BlogPost.module.css';

export default function BlogPost() {
  const params = useParams();

  const [loading, data, error] = useAxios<BlogData>({
    method: 'GET',
    url: `${baseUrl}/blog/${params.id}`,
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}
      <main className={styles.blogPost}>
        <Header text={data ? data.title : 'title'} step={'h2'} />

        <section className={styles.wrapper}>
          <motion.img
            src={data?.img_url}
            alt='blog image'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
          />
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backInOut', delay: 0.2 }}
          >
            {data?.description}
          </motion.p>
        </section>
      </main>
    </>
  );
}
