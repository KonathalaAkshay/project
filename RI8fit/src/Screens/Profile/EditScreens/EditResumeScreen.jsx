import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useFilePicker } from '../../../Components/ResumeUplod/FileUpload';
import api from '../../../API/api';
import { getItem, ACCESS_TOKEN } from '../../../Utils/helper';

export default function EditResumeScreen({ navigation, route }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const { file, pickFile, resetFile } = useFilePicker();
  const initialUrl = route.params?.initialUrl || null;

  // Sync picked file into resume state
  useEffect(() => {
    if (file) {
      setResume({
        uri: file.uri,
        name: file.name || 'resume.pdf',
        mimeType: file.type || 'application/pdf',
      });
    }
  }, [file]);

  // Fetch existing resume
  const fetchResume = async () => {
    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      const res = await api.get('/candidates/get-resume', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.resume_url) {
        setResume({ uri: res.data.resume_url, name: 'Current Resume' });
      } else {
        setResume(null);
      }
    } catch (error) {
      console.error(
        'Fetch resume error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to fetch resume');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // Save / Update resume
  const saveResume = async () => {
    if (!resume) {
      return Alert.alert('Invalid', 'Please upload a resume');
    }

    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      const formData = new FormData();

      if (resume.uri && !resume.uri.startsWith('http')) {
        formData.append('resume', {
          uri: resume.uri,
          name: resume.name || 'resume.pdf',
          type: resume.mimeType || 'application/pdf',
        });
      }

      await api.post('/candidates/upload-resume', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Resume uploaded successfully');
      fetchResume();
      resetFile();
    } catch (error) {
      console.error(
        'Save resume error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to save resume');
    } finally {
      setLoading(false);
    }
  };

  //  Remove resume
  const removeResume = async () => {
    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      await api.delete('/candidates/delete-resume', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResume(null);
      resetFile();
      Alert.alert('Deleted', 'Resume removed successfully');
    } catch (error) {
      console.error(
        'Delete resume error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  // 🔙 Back to Profile
  const onBack = () => {
    navigation.navigate('ProfileView');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Upload Button */}
        <TouchableOpacity style={styles.addBtn} onPress={pickFile}>
          <Text style={styles.addText}>📂 Upload Resume</Text>
        </TouchableOpacity>

        {/* Resume Info */}
        {resume && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{resume.name || 'Resume'}</Text>
            {resume.uri?.startsWith('http') && (
              <TouchableOpacity onPress={() => Linking.openURL(resume.uri)}>
                <Text style={styles.viewLink}>View Resume</Text>
              </TouchableOpacity>
            )}

            <View style={styles.cardActions}>
              <TouchableOpacity onPress={saveResume}>
                <Text style={styles.editText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={removeResume}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={onBack}>
          <Text style={styles.saveText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  addBtn: {
    padding: 12,
    backgroundColor: '#E5F0FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  addText: { color: '#1D4ED8', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  cardTitle: { fontWeight: '700', color: '#111827', fontSize: 16 },
  viewLink: {
    color: '#3B82F6',
    marginTop: 6,
    textDecorationLine: 'underline',
  },
  cardActions: { flexDirection: 'row', marginTop: 10 },
  editText: { color: '#3B82F6', marginRight: 16, fontWeight: '600' },
  removeText: { color: '#EF4444', fontWeight: '600' },

  saveBtn: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: { color: '#fff', fontWeight: '700' },
});
