import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    window.frameworkReady?.();

    supabase.auth.getSession().then(({ data: { session } }) => {
      // If no session exists, redirect to the login page
      if (!session && segments[0] !== 'auth') {
        router.replace('/auth/login');
      } else if (session && segments[0] === 'auth') {
        router.replace('/(tabs)');
      }
    });

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && segments[0] === 'auth') {
        router.replace('/(tabs)');
      } else if (event === 'SIGNED_OUT' && segments[0] !== 'auth') {
        router.replace('/auth/login');
      }
    });
  }, [segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}