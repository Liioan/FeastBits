import { Link } from 'react-router-dom';

//. styles
import styles from './Footer.module.css';

//. assets
import GithubLogo from '../../assets/github.svg';

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div>
        <p>
          {'\u00a9'}FeastBits {date}
        </p>
        <section>
          <a
            href='https://github.com/liioan/feastbits'
            target={'_blank'}
            className={styles.githubLink}
          >
            <img src={GithubLogo} alt='' className={styles.github} />
          </a>
        </section>
      </div>
    </footer>
  );
}
