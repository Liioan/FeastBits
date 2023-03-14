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
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  isEditing: boolean;
  id: number | null;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}

export function AddBlog({
  setId,
  close,
  refresh,
  isEditing = false,
  id = null,
}: props) {
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
      method: `${isEditing ? 'PUT' : 'POST'}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/blog/${isEditing ? id : ''}`,
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

  const handleClose = () => {
    close(false);
    setId(null);
  };

  useEffect(() => {
    if (imgUrl) {
      request();
    }
  }, [imgUrl]);

  useEffect(() => {
    if (data && !loading) {
      close(false);
      setId(null);
      refresh();
    }
  }, [data, loading]);

  if (error || axiosError) {
    return <ErrorScreen errorMessage={error || axiosError} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.addBlogForm}>
        <button
          className={`material-symbols-outlined ${styles.closeBtn}`}
          onClick={handleClose}
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
          <input type='submit' value={isEditing ? 'edit' : 'add'} />
        </form>
      </div>
    </div>
  );
}

export function AddOffer({ close, refresh, isEditing, id, setId }: props) {
  const context = useAuth();
  if (!context) return null;
  const { token } = context;

  const [error, setError] = useState<string | undefined>();
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [type, setType] = useState<string>('single');
  const [isSpecial, setIsSpecial] = useState(false);

  const { upload } = useUploadImage(setError);

  const [loading, data, axiosError, request] = useAxios<BlogData>(
    {
      method: `${isEditing ? 'PUT' : 'POST'}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/offer/${isEditing ? id : ''}`,
      data: {
        name: name,
        description: description,
        price: price,
        discount_price: discountPrice,
        type: type,
        is_special: isSpecial,
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

  const handleClose = () => {
    close(false);
    setId(null);
  };

  useEffect(() => {
    if (imgUrl) {
      request();
    }
  }, [imgUrl]);

  useEffect(() => {
    if (data && !loading) {
      close(false);
      setId(null);
      refresh();
    }
  }, [data, loading]);

  if (error || axiosError) {
    return <ErrorScreen errorMessage={error || axiosError} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.addOfferForm}>
        <button
          className={`material-symbols-outlined ${styles.closeBtn}`}
          onClick={() => close(false)}
        >
          close
        </button>
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          <fieldset className={styles.border}>
            <legend className={styles.legend}>
              <label htmlFor='name'>name</label>
            </legend>
            <input
              type='text'
              id='title'
              className={styles.input}
              onChange={e => setName(e.target.value)}
            />
          </fieldset>
          <div className={styles.priceWrapper}>
            <fieldset className={styles.border}>
              <legend className={styles.legend}>
                <label htmlFor='price'>price</label>
              </legend>
              <input
                type='number'
                id='price'
                className={styles.input}
                onChange={e => setPrice(Number(e.target.value))}
              />
            </fieldset>
            <fieldset className={styles.border}>
              <legend className={styles.legend}>
                <label htmlFor='discount'>discount price</label>
              </legend>
              <input
                type='number'
                id='discount'
                className={styles.input}
                onChange={e => setDiscountPrice(Number(e.target.value))}
              />
            </fieldset>
          </div>

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
            <div className={styles.typeWrapper}>
              type:
              <span
                className={type === 'single' ? styles.selected : ''}
                onClick={() => setType('single')}
              >
                single
              </span>
              <span
                className={type === 'subscribtion' ? styles.selected : ''}
                onClick={() => setType('subscribtion')}
              >
                subscribtion
              </span>
            </div>
            <span
              className={`${styles.special} ${
                isSpecial ? styles.selected : ''
              }`}
              onClick={() => setIsSpecial(!isSpecial)}
            >
              spacial offer
            </span>
          </div>
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
          <input type='submit' value='add' />
        </form>
      </div>
    </div>
  );
}
