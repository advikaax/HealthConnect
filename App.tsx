import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const App = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:3000/health-data') 
      .then(response => response.json())
      .then(data => {
        setHealthData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching health data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading Health Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {healthData.name}!</Text>
      <Text>Age: {healthData.age}</Text>
      <Text>Heart Rate: {healthData.heartRate} bpm</Text>
      <Text>Blood Pressure: {healthData.bloodPressure}</Text>
      <Text>Steps Today: {healthData.stepsToday}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default App;
