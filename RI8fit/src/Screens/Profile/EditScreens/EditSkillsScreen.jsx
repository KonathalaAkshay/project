// screens/Profile/EditSkillsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function EditSkillsScreen({ navigation, route }) {
  const initial = Array.isArray(route?.params?.initial)
    ? route.params.initial
    : [];
  const [skills, setSkills] = useState(initial);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    const s = newSkill.trim();
    if (!s) return;
    if (skills.map(x => x.toLowerCase()).includes(s.toLowerCase())) return;
    setSkills(prev => [...prev, s]);
    setNewSkill('');
  };

  const removeSkill = index => {
    const next = [...skills];
    next.splice(index, 1);
    setSkills(next);
  };

  const onSave = () => {
    navigation.navigate({
      name: 'ProfileView',
      params: { updatedSkills: skills },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a skill"
          value={newSkill}
          onChangeText={setNewSkill}
          onSubmitEditing={addSkill}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skillsWrap}>
        {skills.map((s, i) => (
          <View key={`${s}-${i}`} style={styles.skillBadge}>
            <Text style={styles.skillText}>{s}</Text>
            <TouchableOpacity onPress={() => removeSkill(i)}>
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontWeight: '700' },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: { color: '#0369A1', fontWeight: '600' },
  removeText: {
    color: '#EF4444',
    marginLeft: 8,
    fontWeight: '900',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  saveText: { color: '#fff', fontWeight: '700' },
});
