import { useCallback, useState } from 'react';
import supabase from '../global/supabase';

export function useUploadImage(
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const [isImgLoading, setIsImgLoading] = useState(false);

  const upload = useCallback(
    async (image: File | null) => {
      if (!image) return null;
      setIsImgLoading(true);
      const { data, error } = await supabase.storage
        .from('feastbits-storage')
        .upload(`${crypto.randomUUID()}`, image);

      if (error) {
        setError(error.message);
        setIsImgLoading(false);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('feastbits-storage').getPublicUrl(data.path);

      setIsImgLoading(false);
      return publicUrl;
    },
    [setError]
  );

  return {
    isImgLoading,
    upload,
  };
}
