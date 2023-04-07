import { Link } from 'react-router-dom';
import checkForAdmin from '../../../global/IsUserAdmin';
import { motion } from 'framer-motion';

//. components
import BlogHeader from './BlogHeader';
import GradientButton from '../../Buttons/GradientButton/GradientButton';
import DeleteButton from '../../Buttons/DeleteButton/DeleteButton';

//. styles
import styles from './BlogCard.module.css';

interface props {
  id: number;
  iteration: number;
  title: string;
  description: string;
  created_at: string;
  img_url: string;
  refresh: () => void;
}

export default function BlogCard({
  id,
  iteration,
  title,
  description,
  created_at,
  img_url,
  refresh,
}: props) {
  let date = new Date(created_at).toLocaleDateString();

  const isUserAdmin = checkForAdmin();

  return (
    <motion.section
      className={styles.blogCard}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'backInOut', delay: 0.1 * iteration }}
    >
      <img src={img_url} alt='' />
      <div className={styles.desc}>
        <BlogHeader text={title} />
        <p>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className={styles.buttonsWrapper}>
          {isUserAdmin && (
            <DeleteButton path={`blog/${id}`} refresh={refresh} />
          )}
          <Link to={`/blog/${id}`} className={styles.link}>
            <GradientButton text={'read more'} width={20} />
          </Link>
        </div>
        <span className={styles.timestamp}>{date}</span>
      </div>
    </motion.section>
  );
}
