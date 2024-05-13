import {View, Text, StyleSheet} from 'react-native';

const LabelWithValue = ({style, label, value}) => {
  return (
    <View style={[styles.container, style]}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
  },
});

export default LabelWithValue;
