import { Link } from 'react-router-dom';

//. components
import Header from '../../components/Header';

//. styles
import styles from './SignUp.module.css';

export default function SingUp() {
  return (
    <main className={styles.signUp}>
      <Header text={'Sign Up'} step={'h2'} />
      <p className={styles.link}>
        Already have an account? <Link to={'/login'}>Login</Link>
      </p>
      <form className={styles.form}>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='name'>name</label>
          </legend>
          <input type='text' id='name' className={styles.input} />
        </fieldset>
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
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='passwordConfirm'>password confirmation</label>
          </legend>
          <input
            type='password'
            id='passwordConfirm'
            className={styles.input}
          />
        </fieldset>
        <input type='submit' value='Sign Up' className={styles.submit} />
      </form>
    </main>
  );
}
