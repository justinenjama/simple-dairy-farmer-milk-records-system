import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Define valid route type for Expo Router
type DashboardRoute =
  | '/(tabs)/AddCowScreen'
  | '/(tabs)/AddMilkScreen'
  | '/(tabs)/MilkRecordsScreen'
  | '/(tabs)/MilkReportScreen';

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  // Dashboard actions
  const actions: { label: string; icon: string; route: DashboardRoute }[] = [
    { label: 'Add Cow', icon: 'plus.circle.fill', route: '/(tabs)/AddCowScreen' },
    { label: 'Add Milk', icon: 'drop.fill', route: '/(tabs)/AddMilkScreen' },
    { label: 'Milk Records', icon: 'list.bullet', route: '/(tabs)/MilkRecordsScreen' },
    { label: 'Milk Report', icon: 'chart.bar.fill', route: '/(tabs)/MilkReportScreen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.route}
          style={styles.card}
          onPress={() => router.push(action.route)}
        >
          {/* Cast icon name as 'any' to bypass type error */}
          <IconSymbol size={48} name={action.icon as any} color={tint} />
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
});
