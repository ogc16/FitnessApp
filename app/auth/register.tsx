import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age, 10),
          fitness_goal: fitnessGoal,
        });

      if (profileError) throw profileError;

      router.replace('/(tabs)');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#9ca3af"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#9ca3af"
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#9ca3af"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What's your fitness goal?"
          placeholderTextColor="#9ca3af"
          value={fitnessGoal}
          onChangeText={setFitnessGoal}
          multiline
          numberOfLines={3}
        />

        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Text>
        </Pressable>

        <Link href="/auth/login" style={styles.link}>
          <Text style={styles.linkText}>
            Already have an account? Sign in
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1012',
  },
  content: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#1a1b1e',
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2c2e33',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#6366f1',
    fontSize: 14,
  },
  error: {
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
});