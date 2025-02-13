import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

type Post = {
  id: string;
  content: string;
  image_url: string;
  activity_type: string;
  duration: string;
  distance: number;
  created_at: string;
  profiles: {
    id: string;
    email: string;
    fitness_goal: string;
  };
};

function formatDuration(duration: string) {
  // PostgreSQL interval comes as 'HH:MM:SS', we'll format it to '45 min' or '1 hr 15 min'
  const [hours, minutes] = duration.split(':');
  const hrs = parseInt(hours, 10);
  const mins = parseInt(minutes, 10);
  
  if (hrs === 0) {
    return `${mins} min`;
  }
  return `${hrs} hr ${mins} min`;
}

function FeedItem({ item }: { item: Post }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.profiles.email.split('@')[0]}</Text>
          <Text style={styles.activity}>{item.activity_type}</Text>
        </View>
      </View>
      
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.activityImage} />
      )}

      {item.content && (
        <Text style={styles.content}>{item.content}</Text>
      )}
      
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={20} color="#6366f1" />
          <Text style={styles.statText}>{formatDuration(item.duration)}</Text>
        </View>
        {item.distance && (
          <View style={styles.stat}>
            <Ionicons name="map-outline" size={20} color="#6366f1" />
            <Text style={styles.statText}>{item.distance} km</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchPosts() {
    try {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            id,
            email,
            fitness_goal
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Fitness Community</Text>
        <Pressable
          style={styles.newPostButton}
          onPress={() => router.push('/new-post')}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </Pressable>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {loading 
                ? 'Loading posts...'
                : 'No posts yet from people with similar fitness goals'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1012',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1a1b1e',
    borderBottomWidth: 1,
    borderBottomColor: '#2c2e33',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  newPostButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1b1e',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  activity: {
    color: '#9ca3af',
    fontSize: 14,
  },
  content: {
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  activityImage: {
    width: '100%',
    height: 200,
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2c2e33',
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
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
  },
});