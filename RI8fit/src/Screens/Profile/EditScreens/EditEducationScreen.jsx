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

export default function EditEducationScreen({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    id: null,
    course: '',
    university: '',
    specialization: '',
    start_year: '',
    end_year: '',
    education_level: '',
    grading_system: '',
    marks: '',
    course_type: '',
  });
  const [currentItem, setCurrentItem] = useState(null);

  // 🔄 Fetch education list
  // 🔄 Fetch education list
  const fetchEducation = async () => {
    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      const res = await api.get('/candidates/get-education', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle different response shapes
      let data = res.data;
      if (Array.isArray(data)) {
        setItems(data);
      } else if (Array.isArray(data?.data)) {
        setItems(data.data);
      } else if (Array.isArray(data?.education)) {
        setItems(data.education);
      } else {
        setItems([]); // fallback
      }
    } catch (error) {
      console.error(
        'Fetch education error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to fetch education');
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchEducation();
  }, []);

  // Reset and show form for add
  const openAddForm = () => {
    setCurrentItem(null);
    setForm({
      id: null,
      course: '',
      specialization: '',
      start_year: '',
      university: '',
      end_year: '',
      education_level: '',
      grading_system: '',
      marks: '',
      course_type: '',
    });
    setFormVisible(true);
  };

  // Open form for edit
  const openEditForm = item => {
    setCurrentItem(item);
    setForm({
      course: item.course || '',
      university: item.university || '',
      end_year: String(item.end_year || ''),
      specialization: item.specialization || '',
      start_year: String(item.start_year || ''),
      education_level: item.education_level || '',
      grading_system: item.grading_system || '',
      marks: item.marks || '',
      course_type: item.course_type || '',
    });
    setFormVisible(true);
  };

  // Save / Update education
  const saveEducation = async () => {
    if (!form.course || !form.university) {
      return Alert.alert('Invalid', 'Course and University are required');
    }

    try {
      const token = await getItem(ACCESS_TOKEN);

      if (currentItem) {
        // Update
        const payload = {
          education_level: form.education_level,
          university: form.university,
          course: form.course,
          specialization: form.specialization,
          course_type: form.course_type,
          start_year: Number(form.start_year),
          end_year: Number(form.end_year),
          grading_system: form.grading_system,
          marks: form.marks,
        };

        await api.put(
          `/candidates/update-education/${currentItem.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        // Add
        const payload = {
          education_level: form.education_level,
          university: form.university,
          course: form.course,
          specialization: form.specialization,
          course_type: form.course_type,
          start_year: Number(form.start_year),
          end_year: Number(form.end_year),
          grading_system: form.grading_system,
          marks: form.marks,
        };

        await api.post('/candidates/add-education', [payload], {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      setFormVisible(false);
      fetchEducation(); // 🔄 Refresh list after add/update
    } catch (error) {
      console.error(
        'Save education error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to save education');
    }
  };

  // Delete
  const removeItem = async index => {
    const item = items[index];
    if (item.id) {
      try {
        const token = await getItem(ACCESS_TOKEN);
        await api.delete(`/education/${item.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error(
          'Delete education error:',
          error.response?.data || error.message,
        );
        Alert.alert('Error', 'Failed to delete education');
        return;
      }
    }
    fetchEducation(); // 🔄 Refresh after delete
  };

  // Final save back to profile
  const onSave = () => {
    navigation.navigate({
      name: 'ProfileView',
      params: { updatedEducation: items },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {!formVisible && (
          <TouchableOpacity style={styles.addBtn} onPress={openAddForm}>
            <Text style={styles.addText}>+ Add Education</Text>
          </TouchableOpacity>
        )}

        {/* Inline Form */}
        {formVisible && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {currentItem ? 'Edit Education' : 'Add Education'}
            </Text>

            <Row
              label="Course"
              value={form.course}
              onChangeText={t => setForm({ ...form, course: t })}
            />
            <Row
              label="University"
              value={form.university}
              onChangeText={t => setForm({ ...form, university: t })}
            />
            <Row
              label="Specialization"
              value={form.specialization}
              onChangeText={t => setForm({ ...form, specialization: t })}
            />
            <Row
              label="Education Level"
              value={form.education_level}
              onChangeText={t => setForm({ ...form, education_level: t })}
            />
            <Row
              label="Course Type"
              value={form.course_type}
              onChangeText={t => setForm({ ...form, course_type: t })}
            />

            <Row
              label="Start Year"
              value={form.start_year}
              onChangeText={t => setForm({ ...form, start_year: t })}
              keyboardType="numeric"
            />
            <Row
              label="End Year"
              value={form.end_year}
              onChangeText={t => setForm({ ...form, end_year: t })}
              keyboardType="numeric"
            />
            <Row
              label="Grading System"
              value={form.grading_system}
              onChangeText={t => setForm({ ...form, grading_system: t })}
            />
            <Row
              label="Marks"
              value={form.marks}
              onChangeText={t => setForm({ ...form, marks: t })}
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
                onPress={saveEducation}
              >
                <Text style={styles.actionText}>
                  {currentItem ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Education List */}
        {items.map((item, index) => (
          <View key={`edu-${index}`} style={styles.card}>
            <Text style={styles.cardTitle}>{item.course || 'N/A'}</Text>
            <Text style={styles.cardSub}>
              University: {item.university || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Specialization: {item.specialization || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Education Level: {item.education_level || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              Start Year: {item.start_year || 'N/A'}
            </Text>
            <Text style={styles.cardSub}>
              End Year: {item.end_year || 'N/A'}
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

        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
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
