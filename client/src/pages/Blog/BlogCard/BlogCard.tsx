import { Link } from 'react-router-dom';
import checkForAdmin from '../../../global/IsUserAdmin';

//. components
import BlogHeader from './BlogHeader';
import GradientButton from '../../../components/Buttons/GradientButton';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';

//. styles
import styles from './BlogCard.module.css';

interface props {
  id: number;
  title: string;
  description: string;
  created_at: string;
  img_url: string;
}

export default function BlogCard({
  id,
  title,
  description,
  created_at,
  img_url,
}: props) {
  let date = new Date(created_at).toLocaleDateString();

  const isUserAdmin = checkForAdmin();

  return (
    <section className={styles.blogCard}>
      <img src={img_url} alt='' />
      <div className={styles.desc}>
        <BlogHeader text={title} />
        <p>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className={styles.buttonsWrapper}>
          {isUserAdmin && <DeleteButton path={`blog/${id}`} />}
          <Link to={`/blog/${id}`} className={styles.link}>
            <GradientButton text={'read more'} width={20} />
          </Link>
        </div>
        <span className={styles.timestamp}>{date}</span>
      </div>
    </section>
  );
}
