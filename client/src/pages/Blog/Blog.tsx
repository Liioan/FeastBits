import { useAxios } from '../../hooks/useAxios';
import { BlogData } from '../../types/blog';
import baseUrl from '../../global/BaseUrl';

//. components
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import BlogCard from './BlogCard/BlogCard';

//. styles
import styles from './Blog.module.css';

let now = new Date().toLocaleDateString();

export default function Blog() {
  const [loading, data, error] = useAxios<BlogData[]>({
    method: 'GET',
    url: `${baseUrl}/blog`,
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && <LoadingScreen />}
      <main className={styles.blog}>
        <Header text={'Our blog'} step={'h2'} />
        <div className={styles.blogWrapper}>
          {data &&
            data
              .map(blog => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  created_at={blog.created_at}
                  img_url={blog.img_url}
                />
              ))
              .reverse()}
        </div>
      </main>
    </>
  );
}
