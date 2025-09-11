// screens/Profile/EditExperienceScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import api from '../../../API/api';
import { getItem, ACCESS_TOKEN } from '../../../Utils/helper';

export default function EditExperienceScreen({ navigation, route }) {
  const initial = Array.isArray(route?.params?.initial)
    ? route.params.initial
    : [];
  const [items, setItems] = useState(initial);

  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [form, setForm] = useState({
    id: null,
    job_title: '',
    company_name: '',
    joining_date: '',
    end_date: '',
    total_exp_years: '',
    total_exp_month: '',
    employment_type: '',
    current_salary: '',
    salary_currency: '',
    skills_used: '',
    country: '',
    location: '',
    notice_period_days: '',
    is_relevant: true,
  });

  // Fetch all experiences (for refreshing)
  const fetchExperiences = async () => {
    try {
      setRefreshing(true);
      const token = await getItem(ACCESS_TOKEN);
      const res = await api.get('/candidates/get-employment', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure items is always an array
      let experiences = [];
      if (Array.isArray(res.data)) {
        experiences = res.data;
      } else if (Array.isArray(res.data?.data)) {
        experiences = res.data.data;
      } else if (Array.isArray(res.data?.experiences)) {
        experiences = res.data.experiences;
      } else {
        console.warn('Unexpected response format:', res.data);
      }

      setItems(experiences);
    } catch (error) {
      console.error('Fetch Experiences Error:', error.response?.data || error);
      Alert.alert('Error', 'Failed to load experiences');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Reset & open add form
  const openAddForm = () => {
    setCurrentItem(null);
    setForm({
      id: null,
      job_title: '',
      company_name: '',
      joining_date: '',
      end_date: '',
      total_exp_years: '',
      total_exp_month: '',
      employment_type: '',
      current_salary: '',
      salary_currency: '',
      skills_used: '',
      country: '',
      location: '',
      notice_period_days: '',
      is_relevant: true,
    });
    setFormVisible(true);
  };

  // Open edit form
  const openEditForm = item => {
    setCurrentItem(item);
    setForm({
      job_title: item.job_title || '',
      company_name: item.company_name || '',
      joining_date: item.joining_date || '',
      end_date: item.end_date || '',
      total_exp_years: String(item.total_exp_years || ''),
      total_exp_month: String(item.total_exp_months || ''),
      employment_type: item.employment_type || '',
      current_salary: String(item.current_salary || ''),
      salary_currency: item.salary_currency || '',
      skills_used: item.skills_used ? item.skills_used.join(', ') : '',
      country: item.country || '',
      location: item.location || '',
      notice_period_days: String(item.notice_period_days || ''),
      is_relevant: item.is_relevant ?? true,
      duration: item.duration || '',
      job_profile: item.job_profile || '',
    });
    setFormVisible(true);
  };

  // Save / Update experience
  const saveExperience = async () => {
    if (!form.job_title || !form.company_name) {
      return Alert.alert('Invalid', 'Job title and company are required');
    }

    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);

      const payload = {
        is_current: form.end_date.toLowerCase() === 'present',
        employment_type: form.employment_type,
        total_exp_years: Number(form.total_exp_years),
        total_exp_months: Number(form.total_exp_month),
        company_name: form.company_name,
        job_title: form.job_title,
        joining_date: form.joining_date,
        end_date: form.end_date,
        current_salary: Number(form.current_salary),
        salary_breakdown: form.salary_currency || '',
        skills_used: form.skills_used
          ? form.skills_used.split(',').map(s => s.trim())
          : [],
        job_profile: form.job_profile || '',
        country: form.country,
        location: form.location,
        notice_period_days: Number(form.notice_period_days),
        duration: form.duration || '',
        is_relevant: true,
      };

      if (currentItem) {
        // Update employment
        await api.put(
          `/candidates/update-employment/${currentItem.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        // Add new employment
        await api.post('/candidates/add-employment', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      setFormVisible(false);
      Alert.alert('Success', 'Experience saved successfully');
      fetchExperiences(); // refresh list
    } catch (error) {
      if (
        payload.employment_type === '' ||
        payload.job_title === '' ||
        payload.company_name === '' ||
        payload.joining_date === '' ||
        payload.end_date === ''
      ) {
        Alert.alert('Error', 'Please fill all the required fields');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const removeItem = async index => {
    const item = items[index];
    if (item.id) {
      try {
        const token = await getItem(ACCESS_TOKEN);
        await api.delete(`/candidates/delete-experience/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchExperiences();
      } catch (error) {
        console.error(
          'Delete Experience Error:',
          error.response?.data || error,
        );
        Alert.alert('Error', 'Failed to delete experience');
        return;
      }
    }
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const onBack = () => {
    navigation.navigate('ProfileView');
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchExperiences}
          />
        }
      >
        {!formVisible && (
          <TouchableOpacity style={styles.addBtn} onPress={openAddForm}>
            <Text style={styles.addText}>+ Add Experience</Text>
          </TouchableOpacity>
        )}

        {/* Inline Form */}
        {formVisible && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {currentItem ? 'Edit Experience' : 'Add Experience'}
            </Text>

            <Row
              label="Job Title"
              value={form.job_title}
              onChangeText={t => setForm({ ...form, job_title: t })}
            />
            <Row
              label="Company"
              value={form.company_name}
              onChangeText={t => setForm({ ...form, company_name: t })}
            />
            <Row
              label="Joining Date (YYYY-MM)"
              value={form.joining_date}
              onChangeText={t => setForm({ ...form, joining_date: t })}
            />
            <Row
              label="End Date (YYYY-MM or Present)"
              value={form.end_date}
              onChangeText={t => setForm({ ...form, end_date: t })}
            />
            <Row
              label="Employment Type"
              value={form.employment_type}
              onChangeText={t => setForm({ ...form, employment_type: t })}
            />
            <Row
              label="Current Salary"
              value={form.current_salary}
              onChangeText={t => setForm({ ...form, current_salary: t })}
              keyboardType="numeric"
            />
            <Row
              label="Salary Currency"
              value={form.salary_currency}
              onChangeText={t => setForm({ ...form, salary_currency: t })}
            />
            <Row
              label="Skills Used (comma separated)"
              value={form.skills_used}
              onChangeText={t => setForm({ ...form, skills_used: t })}
            />
            <Row
              label="Country"
              value={form.country}
              onChangeText={t => setForm({ ...form, country: t })}
            />
            <Row
              label="Location"
              value={form.location}
              onChangeText={t => setForm({ ...form, location: t })}
            />
            <Row
              label="Notice Period (days)"
              value={form.notice_period_days}
              onChangeText={t => setForm({ ...form, notice_period_days: t })}
              keyboardType="numeric"
            />

            <View style={styles.formActions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#9CA3AF' }]}
                onPress={() => setFormVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#3B82F6' }]}
                onPress={saveExperience}
              >
                <Text style={styles.actionText}>
                  {currentItem ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Experience List */}
        {items.map((item, index) => (
          <View key={`exp-${index}`} style={styles.card}>
            <Text style={styles.cardTitle}>{item.job_title || 'N/A'}</Text>
            <Text style={styles.cardSub}>
              Company: {item.company_name || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Joining Date: {item.joining_date || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              End Date: {item.end_date || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Duration: {item.total_exp_years || 0}y{' '}
              {item.total_exp_months || 0}m
            </Text>

            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => openEditForm(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={onBack}>
          <Text style={styles.saveText}>Back</Text>
        </TouchableOpacity>
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
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  addBtn: {
    padding: 12,
    backgroundColor: '#E5F0FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  addText: { color: '#1D4ED8', fontWeight: '600' },

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
