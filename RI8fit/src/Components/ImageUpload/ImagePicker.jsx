import { useState } from 'react';
import { pick, types, errorCodes } from '@react-native-documents/picker';

export const useImagePicker = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      const results = await pick({
        type: [types.images], // restrict to images
      });

      if (results && results.length > 0) {
        const selectedImage = results[0];
        setImage(selectedImage);
        return selectedImage;
      }
    } catch (err) {
      if (err.code === errorCodes.OPERATION_CANCELED) {
        console.log('User cancelled image picking');
        return null;
      } else {
        console.error('Error picking image:', err);
        throw err;
      }
    }
  };

  return { image, pickImage };
};
