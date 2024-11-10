import { View, StyleSheet, Text } from 'react-native';
import TimeInput from './TimeInput';

const CircularTime = ({ onCircularChange, circularTime }) => {
  return (
    <View style={styles.circularContainer}>
      <Text style={styles.label}>Set CircularTime: </Text>
      <TimeInput label="Years" field="years" value={circularTime?.years} onChange={onCircularChange} />
      <TimeInput label="Months" field="months" value={circularTime?.months} onChange={onCircularChange} />
      <TimeInput label="Days" field="days" value={circularTime?.days} onChange={onCircularChange} />
      <TimeInput label="Minutes" field="minutes" value={circularTime?.minutes} onChange={onCircularChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  circularContainer: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
});

export default CircularTime;
