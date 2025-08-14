import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { pick, types, errorCodes } from '@react-native-documents/picker';

const FilePickerComponent = () => {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    try {
      const results = await pick({
        type: [types.pdf, types.plainText, types.doc, types.docx, types.allFiles],
      });
      const selected = results[0];
      setFile(selected);
      console.log('File selected:', selected);
    } catch (err) {
      if (err.code === errorCodes.OPERATION_CANCELED) {
        console.log('User cancelled');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick a File" onPress={pickFile} />

      {file && (
        <View style={{ marginTop: 20 }}>
          <Text>File Name: {file.name}</Text>
          <Text>File Type: {file.mimeType}</Text>
          <Text>File Size: {file.size} bytes</Text>
          <Text>URI: {file.uri}</Text>
        </View>
      )}
    </View>
  );
};

export default FilePickerComponent;
