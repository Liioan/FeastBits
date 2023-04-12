import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../../types/user';
import baseUrl from '../../global/BaseUrl';
import { useAuth } from '../../context/AuthContext';

//. components
import Header from '../../components/Header/Header';

//. styles
import styles from './Login.module.css';

export default function Login() {
  const context = useAuth();
  if (!context) return null;
  const { setLocalUser } = context;

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [loading, data, error, request] = useAxios<{
    user: User;
    token: string;
  }>(
    {
      method: 'POST',
      url: `${baseUrl}/login`,
      data: {
        email: email,
        password: password,
      },
    },
    false
  );

  const loginSchema = z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 or more characters long' }),
  });

  const login = () => {
    request();
  };

  const handleSubmit = (e: FormEvent) => {
    const userData = {
      email: email,
      password: password,
    };

    e.preventDefault();
    try {
      loginSchema.parse(userData);
      setValidationError(null);
      login();
    } catch (err: any) {
      setValidationError(err.errors[0].message);
    }
  };

  useEffect(() => {
    if (data && !loading) {
      setLocalUser(data.user, data.token);
      navigate('/account');
    }
  }, [data, loading]);

  return (
    <main className={styles.login}>
      <Header text={'Login'} step={'h2'} />
      <p className={styles.link}>
        Don't have an account? <Link to={'/signup'}>Sign up</Link>
      </p>
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='email'>email</label>
          </legend>
          <input
            type='text'
            id='email'
            className={styles.input}
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='password'>password</label>
          </legend>
          <input
            type='password'
            id='password'
            className={styles.input}
            onChange={e => setPassword(e.target.value)}
          />
        </fieldset>
        <span className={styles.error}>{validationError || error}</span>
        <input type='submit' value='Login' className={styles.submit} />
      </form>
    </main>
  );
}
