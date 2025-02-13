import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

const ACTIVITY_TYPES = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Weight Training',
  'Yoga',
  'HIIT',
  'Other'
];

export default function NewPost() {
  const [content, setContent] = useState('');
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePost = async () => {
    if (!activityType) {
      setError('Please select an activity type');
      return;
    }

    if (!duration) {
      setError('Please enter the duration');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      // Convert duration (minutes) to PostgreSQL interval format
      const minutes = parseInt(duration, 10);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const intervalDuration = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:00`;

      const { error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content,
          activity_type: activityType,
          duration: intervalDuration,
          distance: distance ? parseFloat(distance) : null,
        });

      if (postError) throw postError;

      router.back();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>New Post</Text>
        <Pressable
          style={[styles.postButton, loading && styles.buttonDisabled]}
          onPress={handlePost}
          disabled={loading}
        >
          <Text style={styles.postButtonText}>
            {loading ? 'Posting...' : 'Post'}
          </Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.activityTypes}>
        <Text style={styles.sectionTitle}>Activity Type</Text>
        <View style={styles.activityGrid}>
          {ACTIVITY_TYPES.map((type) => (
            <Pressable
              key={type}
              style={[
                styles.activityButton,
                activityType === type && styles.activityButtonSelected,
              ]}
              onPress={() => setActivityType(type)}
            >
              <Text
                style={[
                  styles.activityButtonText,
                  activityType === type && styles.activityButtonTextSelected,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 45"
          placeholderTextColor="#9ca3af"
          value={duration}
          onChangeText={setDuration}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Distance (km, optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 5.2"
          placeholderTextColor="#9ca3af"
          value={distance}
          onChangeText={setDistance}
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>How was your workout? (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Share your thoughts..."
          placeholderTextColor="#9ca3af"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  error: {
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  activityTypes: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2c2e33',
  },
  activityButtonSelected: {
    backgroundColor: '#6366f1',
  },
  activityButtonText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  activityButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2c2e33',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});