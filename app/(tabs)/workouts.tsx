import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WORKOUT_TYPES = [
  {
    id: '1',
    name: 'Running',
    icon: 'walk',
    color: '#ec4899',
  },
  {
    id: '2',
    name: 'Strength',
    icon: 'barbell',
    color: '#6366f1',
  },
  {
    id: '3',
    name: 'Cycling',
    icon: 'bicycle',
    color: '#10b981',
  },
  {
    id: '4',
    name: 'Yoga',
    icon: 'body',
    color: '#f59e0b',
  },
];

const RECENT_WORKOUTS = [
  {
    id: '1',
    type: 'Running',
    date: 'Today',
    duration: '45 min',
    calories: '420',
  },
  {
    id: '2',
    type: 'Strength',
    date: 'Yesterday',
    duration: '1 hr',
    calories: '380',
  },
];

export default function Workouts() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Start Workout</Text>
        <View style={styles.workoutTypes}>
          {WORKOUT_TYPES.map((type) => (
            <Pressable key={type.id} style={styles.workoutType}>
              <View style={[styles.iconContainer, { backgroundColor: type.color }]}>
                <Ionicons name={type.icon} size={24} color="#ffffff" />
              </View>
              <Text style={styles.workoutName}>{type.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {RECENT_WORKOUTS.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>{workout.type}</Text>
              <Text style={styles.workoutDate}>{workout.date}</Text>
            </View>
            <View style={styles.workoutStats}>
              <View style={styles.stat}>
                <Ionicons name="time-outline" size={20} color="#6366f1" />
                <Text style={styles.statText}>{workout.duration}</Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="flame-outline" size={20} color="#6366f1" />
                <Text style={styles.statText}>{workout.calories} cal</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1012',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  workoutTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  workoutType: {
    width: '48%',
    backgroundColor: '#1a1b1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  workoutCard: {
    backgroundColor: '#1a1b1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  workoutInfo: {
    marginBottom: 12,
  },
  workoutTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  workoutDate: {
    color: '#9ca3af',
    fontSize: 14,
  },
  workoutStats: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 14,
  },
});