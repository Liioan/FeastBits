//. components
import Header from '../../components/Header';
import BlogList from '../../components/Lists/BlogList/BlogList';

//. styles
import styles from './Blog.module.css';

export default function Blog() {
  return (
    <>
      <main className={styles.blog}>
        <Header text={'Our blog'} step={'h2'} />
        <BlogList isOnHomePage={false} path={'blog'} />
      </main>
    </>
  );
}
