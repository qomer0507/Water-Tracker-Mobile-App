import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const loadGoal = async () => {
      const saved = await AsyncStorage.getItem('dailyGoal');
      if (saved) setGoal(saved);
    };
    loadGoal();
  }, []);

  const handleGoalChange = async (value: string) => {
    // Accept only numbers
    const cleaned = value.replace(/[^0-9]/g, '');
    setGoal(cleaned);
    await AsyncStorage.setItem('dailyGoal', cleaned);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>⚙️ Settings</Text>
        <Text style={{ fontSize: 16 }}>Daily Goal (oz)</Text>
        <TextInput
          value={goal}
          onChangeText={handleGoalChange}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          returnKeyType="done"
          blurOnSubmit={true}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginTop: 8,
            fontSize: 18,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
