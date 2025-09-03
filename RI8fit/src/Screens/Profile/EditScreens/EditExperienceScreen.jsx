// screens/Profile/EditExperienceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

export default function EditExperienceScreen({ navigation, route }) {
  const initial = Array.isArray(route?.params?.initial)
    ? route.params.initial
    : [];
  const [items, setItems] = useState(initial);

  const updateItem = (index, patch) => {
    const next = [...items];
    next[index] = { ...(next[index] || {}), ...patch };
    setItems(next);
  };

  const addItem = () =>
    setItems(prev => [
      ...prev,
      {
        id: undefined,
        job_title: '',
        company_name: '',
        joining_date: '',
        end_date: '',
        duration: '',
      },
    ]);

  const removeItem = index => {
    const next = [...items];
    next.splice(index, 1);
    setItems(next);
  };

  const onSave = () => {
    for (const ex of items) {
      if (
        !ex.job_title &&
        !ex.company_name &&
        !ex.joining_date &&
        !ex.end_date &&
        !ex.duration
      )
        continue;
      if (!ex.job_title || !ex.company_name)
        return Alert.alert(
          'Invalid',
          'Job title and company are required for filled rows',
        );
    }
    navigation.navigate({
      name: 'ProfileView',
      params: { updatedExperience: items },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(_, i) => `exp-${i}`}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addBtn} onPress={addItem}>
            <Text style={styles.addText}>+ Add Experience</Text>
          </TouchableOpacity>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Row
              label="Job Title"
              value={item.job_title}
              onChangeText={t => updateItem(index, { job_title: t })}
            />
            <Row
              label="Company"
              value={item.company_name}
              onChangeText={t => updateItem(index, { company_name: t })}
            />
            <Row
              label="Joining Date (YYYY-MM)"
              value={item.joining_date}
              onChangeText={t => updateItem(index, { joining_date: t })}
            />
            <Row
              label="End Date (YYYY-MM or Present)"
              value={item.end_date}
              onChangeText={t => updateItem(index, { end_date: t })}
            />
            <Row
              label="Duration"
              value={item.duration}
              onChangeText={t => updateItem(index, { duration: t })}
            />
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        }
      />
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
  container: { flex: 1 },
  addBtn: {
    padding: 12,
    backgroundColor: '#E5F0FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
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
  row: { marginBottom: 10 },
  label: { marginBottom: 6, fontWeight: '600', color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  removeText: { color: '#EF4444', marginTop: 6, fontWeight: '600' },
  saveBtn: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: { color: '#fff', fontWeight: '700' },
});
