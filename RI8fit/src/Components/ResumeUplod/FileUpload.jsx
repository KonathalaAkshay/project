import { useState } from 'react';
import { pick, types, errorCodes } from '@react-native-documents/picker';

export const useFilePicker = () => {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    try {
      const results = await pick({
        type: [types.pdf],
      });
// types.doc, types.docx
      if (results && results.length > 0) {
        const selectedFile = results[0]; // this package usually gives an array
        setFile(selectedFile);
        return selectedFile;
      }
    } catch (err) {
      if (err.code === errorCodes.OPERATION_CANCELED) {
        console.log('User cancelled file picking');
        return null;
      } else {
        console.error('Error picking file:', err);
        throw err;
      }
    }
  };

  return { file, pickFile };
};
