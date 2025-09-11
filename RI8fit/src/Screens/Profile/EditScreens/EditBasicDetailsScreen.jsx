// screens/Profile/EditBasicDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const wp = p => (width * p) / 100;

export default function EditBasicDetailsScreen({ navigation, route }) {
  const initial = route?.params?.initial ?? {};
  const [email, setEmail] = useState(initial.email || '');
  const [phone, setPhone] = useState(initial.phone || '');
  const [availability, setAvailability] = useState(initial.availability || '');
  const [totalExp, setTotalExp] = useState(String(initial.totalExp || ''));
  const [summary, setSummary] = useState(initial.summary || '');

  const onSave = () => {
    // basic validation
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      return Alert.alert('Invalid', 'Please enter a valid email');
    if (phone && phone.length < 7)
      return Alert.alert('Invalid', 'Please enter a valid phone number');
    navigation.navigate({
      name: 'ProfileView',
      params: {
        updatedBasic: { email, phone, availability, totalExp, summary },
      },
      merge: true,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.form}>
        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <LabeledInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <LabeledInput
          label="Availability"
          value={availability}
          onChangeText={setAvailability}
        />
        <LabeledInput
          label="Total Experience (years)"
          value={String(totalExp)}
          onChangeText={setTotalExp}
          keyboardType="numeric"
        />
        <LabeledInput
          label="Summary"
          value={summary}
          onChangeText={setSummary}
          multiline
        />
        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function LabeledInput({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { padding: wp(5) },
  field: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600', color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  saveText: { color: '#fff', fontWeight: '700' },
});
