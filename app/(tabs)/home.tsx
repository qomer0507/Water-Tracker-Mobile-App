import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(64); // Default until loaded from storage

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const savedGoal = await AsyncStorage.getItem('dailyGoal');
        if (savedGoal) setGoal(Number(savedGoal));

        const savedWater = await AsyncStorage.getItem('water');
        if (savedWater) setWaterIntake(Number(savedWater));
      };

      loadData();
    }, [])
  );

  const logWater = async () => {
    const newAmount = waterIntake + 8;
    setWaterIntake(newAmount);
    await AsyncStorage.setItem('water', newAmount.toString());

    const timestamp = new Date().toLocaleString();
    const raw = await AsyncStorage.getItem('waterHistory');
    const prev = raw ? JSON.parse(raw) : [];
    const updated = [...prev, `${timestamp} - Logged 8 oz`];
    await AsyncStorage.setItem('waterHistory', JSON.stringify(updated));
  };

  const reset = async () => {
    setWaterIntake(0);
    await AsyncStorage.setItem('water', '0');
  };

  const progress = Math.min(waterIntake / goal, 1);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/react-logo.png')} style={styles.icon} />
      <Text style={styles.title}>Water Tracker</Text>
      <Text style={styles.subtitle}>{waterIntake} oz of {goal} oz</Text>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={logWater}>
          <Text style={styles.logButton}>Log 8 oz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f7fc' },
  icon: { width: 60, height: 60, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 18, marginBottom: 20 },
  progressBarBackground: {
    flexDirection: 'row',
    height: 20,
    width: '80%',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    backgroundColor: '#00BFFF',
  },
  buttons: { flexDirection: 'row', gap: 30 },
  logButton: { color: 'blue', fontSize: 18 },
  resetButton: { color: 'red', fontSize: 18 },
});
