import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sarah Chen</Text>
        <Text style={styles.bio}>Fitness enthusiast | Marathon runner</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>248</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>845</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Overview</Text>
        <View style={styles.activityGrid}>
          <View style={styles.activityCard}>
            <Ionicons name="flame" size={24} color="#ec4899" />
            <Text style={styles.activityValue}>12,845</Text>
            <Text style={styles.activityLabel}>Calories</Text>
          </View>
          <View style={styles.activityCard}>
            <Ionicons name="walk" size={24} color="#6366f1" />
            <Text style={styles.activityValue}>148.5</Text>
            <Text style={styles.activityLabel}>km</Text>
          </View>
          <View style={styles.activityCard}>
            <Ionicons name="time" size={24} color="#10b981" />
            <Text style={styles.activityValue}>24:15</Text>
            <Text style={styles.activityLabel}>Hours</Text>
          </View>
          <View style={styles.activityCard}>
            <Ionicons name="trophy" size={24} color="#f59e0b" />
            <Text style={styles.activityValue}>15</Text>
            <Text style={styles.activityLabel}>Goals</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1012',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2e33',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2c2e33',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    backgroundColor: '#1a1b1e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
});