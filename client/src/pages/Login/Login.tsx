import { Link } from 'react-router-dom';

//. components
import Header from '../../components/Header';

//. styles
import styles from './Login.module.css';

export default function Login() {
  return (
    <main className={styles.login}>
      <Header text={'Login'} step={'h2'} />
      <p className={styles.link}>
        Don't have an account? <Link to={'/signup'}>Sing up</Link>
      </p>
      <form className={styles.form}>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='email'>email</label>
          </legend>
          <input type='text' id='email' className={styles.input} />
        </fieldset>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='password'>password</label>
          </legend>
          <input type='password' id='password' className={styles.input} />
        </fieldset>
        <input type='submit' value='Login' className={styles.submit} />
      </form>
    </main>
  );
}
