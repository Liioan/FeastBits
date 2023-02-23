//. components
import Header from '../../components/Header';
import BlogList from './BlogList/BlogList';

//. styles
import styles from './Blog.module.css';

let now = new Date().toLocaleDateString();

export default function Blog() {
  return (
    <>
      <main className={styles.blog}>
        <Header text={'Our blog'} step={'h2'} />
        <BlogList />
      </main>
    </>
  );
}
