import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState<string[]>([]);

  const loadHistory = async () => {
    const raw = await AsyncStorage.getItem('waterHistory');
    if (raw) setHistory(JSON.parse(raw));
    else setHistory([]);
  };

  // 🔁 Reload every time screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all hydration history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('waterHistory');
            setHistory([]);
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>📅 Hydration History</Text>

      {history.length === 0 ? (
        <Text>No water intake logged yet.</Text>
      ) : (
        <>
          <FlatList
            data={[...history].reverse()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ paddingVertical: 8, fontSize: 16 }}>💧 {item}</Text>
            )}
          />
          <View style={{ marginTop: 20 }}>
            <Button title="Clear History" onPress={clearHistory} color="#d9534f" />
          </View>
        </>
      )}
    </View>
  );
}
