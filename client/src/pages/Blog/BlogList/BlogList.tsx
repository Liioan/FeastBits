import { useAxios } from '../../../hooks/useAxios';
import { BlogData } from '../../../types/blog';
import baseUrl from '../../../global/BaseUrl';

//. components
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import BlogCard from '../BlogCard/BlogCard';

//. styles
import styles from './BlogList.module.css';

interface props {
  isOnHomePage: boolean;
  path: string;
}

export default function BlogList({ isOnHomePage, path }: props) {
  const [loading, data, error] = useAxios<BlogData[]>({
    method: 'GET',
    url: `${baseUrl}/${path}`,
  });

  if (error.length) return <ErrorScreen errorMessage={error} />;

  return (
    <>
      {loading && !isOnHomePage && <LoadingScreen />}
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
    </>
  );
}
