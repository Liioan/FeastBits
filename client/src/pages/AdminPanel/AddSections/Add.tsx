import { useEffect, useState } from 'react';
import { useUploadImage } from '../../../hooks/useUploadImg';
import { useAxios } from '../../../hooks/useAxios';
import { BlogData } from '../../../types/blog';
import { useAuth } from '../../../context/AuthContext';
import baseUrl from '../../../global/BaseUrl';

//. components
import { FormEvent } from 'react';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';

//. styles
import styles from './Add.module.css';

interface props {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}

export function AddBlog({ close, refresh }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [error, setError] = useState<string | undefined>();
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { upload } = useUploadImage(setError);

  const [loading, data, axiosError, request] = useAxios<BlogData>(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/blog`,
      data: {
        title: title,
        description: description,
        img_url: imgUrl,
      },
    },
    false
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const imgURL = await upload(img);
    if (!imgURL) return;
    setImgUrl(imgURL);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const file = e.target.files.item(0);
    setImg(file);
  };

  useEffect(() => {
    if (imgUrl) {
      request();
    }
  }, [imgUrl]);

  useEffect(() => {
    if (data && !loading) {
      close(false);
      refresh();
    }
  }, [data, loading]);

  if (error || axiosError) {
    return <ErrorScreen errorMessage={error || axiosError} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.addForm}>
        <button
          className={`material-symbols-outlined ${styles.closeBtn}`}
          onClick={() => close(false)}
        >
          close
        </button>
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          <fieldset className={styles.border}>
            <legend className={styles.legend}>
              <label htmlFor='title'>title</label>
            </legend>
            <input
              type='text'
              id='title'
              className={styles.input}
              onChange={e => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className={styles.border}>
            <legend className={styles.legend}>
              <label htmlFor='description'>description</label>
            </legend>
            <textarea
              id='description'
              className={styles.textarea}
              onChange={e => setDescription(e.target.value)}
            />
          </fieldset>
          <div className={styles.innerWrapper}>
            <label htmlFor='file' className={styles.customImageInput}>
              choose image
            </label>
            <p className={styles.imgName}>{img ? img.name : 'no image'}</p>
          </div>
          <input
            type='file'
            id='file'
            className={styles.hidden}
            onChange={e => handleFileChange(e)}
          />
          <input type='submit' value='test' />
        </form>
      </div>
    </div>
  );
}
