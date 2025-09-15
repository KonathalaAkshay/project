// screens/Profile/EditBasicDetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import api from '../../../API/api';
import { getItem, ACCESS_TOKEN } from '../../../Utils/helper';

export default function EditBasicDetailsScreen({ navigation }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const [form, setForm] = useState({
    id: null,
    date_of_birth: '',
    gender: '',
    marital_status: '',
    nationality: '',
    languages_known: [], // now as list
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  // Fetch personal details
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      const res = await api.get('/candidates/get-personal-details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      let data = res.data?.data || res.data || null;
      setDetails(data);

      if (data) {
        openForm(data);
      } else {
        resetForm();
        setFormVisible(true);
      }
    } catch (error) {
      console.error(
        'Fetch personal details error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to fetch personal details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const resetForm = () => {
    setForm({
      id: null,
      date_of_birth: '',
      gender: '',
      marital_status: '',
      nationality: '',
      languages_known: [],
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    });
  };

  const openForm = (item = null) => {
    if (item) {
      setForm({
        id: item.id || null,
        date_of_birth: item.date_of_birth || '',
        gender: item.gender || '',
        marital_status: item.marital_status || '',
        nationality: item.nationality || '',
        languages_known: Array.isArray(item.languages_known)
          ? item.languages_known
          : item.languages_known
          ? item.languages_known.split(',').map(l => l.trim())
          : [],
        address: item.address || '',
        city: item.city || '',
        state: item.state || '',
        country: item.country || '',
        pincode: item.pincode || '',
      });
    } else {
      resetForm();
    }
    setFormVisible(true);
  };

  // Update only (removed Add API)
  const saveBasicDetails = async () => {
    if (form.pincode && !/^\d{5,6}$/.test(form.pincode)) {
      return Alert.alert('Invalid', 'Please enter a valid pincode');
    }

    try {
      const token = await getItem(ACCESS_TOKEN);
      if (!token) {
        return Alert.alert('Session Expired', 'Please log in again.');
      }

      const payload = {
        ...form,
        languages_known: form.languages_known, // send as list
      };

      if (!form.id) {
        return Alert.alert(
          'Error',
          'No existing details found to update. Please contact support.',
        );
      }

      await api.put(`/update-personal-details/${form.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormVisible(false);
      fetchDetails();
    } catch (error) {
      console.error(
        'Save personal details error:',
        error.response?.data || error.message,
      );
      const errorMsg =
        error.response?.data?.message || 'Failed to save personal details';
      Alert.alert('Error', errorMsg);
    }
  };

  const removeDetails = async () => {
    if (!details?.id) return;

    try {
      const token = await getItem(ACCESS_TOKEN);
      await api.delete(`/candidates/delete-personal-details/${details.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDetails(null);
      resetForm();
      setFormVisible(true);
    } catch (error) {
      console.error(
        'Delete personal details error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to delete personal details');
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Inline Form */}
        {formVisible && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {form.id ? 'Edit Basic Details' : 'Basic Details'}
            </Text>

            <Row
              label="Date of Birth"
              value={form.date_of_birth}
              onChangeText={t => setForm({ ...form, date_of_birth: t })}
              placeholder="YYYY-MM-DD"
            />
            <Row
              label="Gender"
              value={form.gender}
              onChangeText={t => setForm({ ...form, gender: t })}
              placeholder="Male / Female / Other"
            />
            <Row
              label="Marital Status"
              value={form.marital_status}
              onChangeText={t => setForm({ ...form, marital_status: t })}
              placeholder="Single / Married / Other"
            />
            <Row
              label="Nationality"
              value={form.nationality}
              onChangeText={t => setForm({ ...form, nationality: t })}
            />
            <Row
              label="Languages Known"
              value={form.languages_known.join(', ')}
              onChangeText={t =>
                setForm({
                  ...form,
                  languages_known: t.split(',').map(l => l.trim()),
                })
              }
              placeholder="English, Hindi..."
            />
            <Row
              label="Address"
              value={form.address}
              onChangeText={t => setForm({ ...form, address: t })}
              multiline
            />
            <Row
              label="City"
              value={form.city}
              onChangeText={t => setForm({ ...form, city: t })}
            />
            <Row
              label="State"
              value={form.state}
              onChangeText={t => setForm({ ...form, state: t })}
            />
            <Row
              label="Country"
              value={form.country}
              onChangeText={t => setForm({ ...form, country: t })}
            />
            <Row
              label="Pincode"
              value={form.pincode}
              onChangeText={t => setForm({ ...form, pincode: t })}
              keyboardType="numeric"
            />

            <View style={styles.formActions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#3B82F6' }]}
                onPress={saveBasicDetails}
              >
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#3B82F6' }]}
                onPress={() => navigation.navigate('ProfileView')}
              >
                <Text style={styles.saveText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Details View Card */}
        {details && !formVisible && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Basic Details</Text>
            <Text style={styles.cardSub}>
              DOB: {details.date_of_birth || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Gender: {details.gender || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Marital Status: {details.marital_status || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Nationality: {details.nationality || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Languages:{' '}
              {Array.isArray(details.languages_known)
                ? details.languages_known.join(', ')
                : details.languages_known || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Address: {details.address || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>City: {details.city || 'N/A'}</Text>
            <Text style={styles.cardSub}>State: {details.state || 'N/A'}</Text>
            <Text style={styles.cardSub}>
              Country: {details.country || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Pincode: {details.pincode || 'N/A'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Row({ label, ...props }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  formTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  actionText: { color: '#fff', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  cardTitle: { fontWeight: '700', color: '#111827', fontSize: 16 },
  cardSub: { color: '#4B5563', marginTop: 4 },
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

  row: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600', color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
