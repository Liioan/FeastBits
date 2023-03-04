import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../../types/user';
import baseUrl from '../../global/BaseUrl';
import { useAuth } from '../../context/AuthContext';

//. components
import Header from '../../components/Header';

//. styles
import styles from './SignUp.module.css';

export default function SingUp() {
  const context = useAuth();
  if (!context) return null;
  const { setLocalUser } = context;

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [name, setName] = useState<string | undefined>();
  const [surname, setSurname] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirm, setConfirm] = useState<string | undefined>();

  const [loading, data, error, request] = useAxios<{
    user: User;
    token: string;
  }>(
    {
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: { Accept: 'application/json' },
      data: {
        name: name,
        surname: surname,
        email: email,
        password: password,
        password_confirmation: confirm,
      },
    },
    false
  );

  const loginSchema = z
    .object({
      name: z.string({ required_error: 'Name is required' }).min(1),
      surname: z.string({ required_error: 'Surname is required' }).min(1),
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be 6 or more characters long' }),
      confirm: z.string({
        required_error: 'Password confirmation is required',
      }),
    })
    .refine(data => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'],
    });

  const singUp = () => {
    request();
  };

  const handleSubmit = (e: FormEvent) => {
    const userData = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      confirm: confirm,
    };

    e.preventDefault();
    try {
      loginSchema.parse(userData);
      setValidationError(null);
      singUp();
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
    <main className={styles.signUp}>
      <Header text={'Sign Up'} step={'h2'} />
      <p className={styles.link}>
        Already have an account? <Link to={'/login'}>Login</Link>
      </p>
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='name'>name</label>
          </legend>
          <input
            type='text'
            id='name'
            className={styles.input}
            onChange={e => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='surname'>surname</label>
          </legend>
          <input
            type='text'
            id='surname'
            className={styles.input}
            onChange={e => setSurname(e.target.value)}
          />
        </fieldset>
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
        <fieldset className={styles.border}>
          <legend className={styles.legend}>
            <label htmlFor='passwordConfirm'>password confirmation</label>
          </legend>
          <input
            type='password'
            id='passwordConfirm'
            className={styles.input}
            onChange={e => setConfirm(e.target.value)}
          />
        </fieldset>
        <span className={styles.error}>{validationError || error}</span>
        <input
          type='submit'
          value='Sign Up'
          className={styles.submit}
          onChange={e => setConfirm(e.target.value)}
        />
      </form>
    </main>
  );
}
