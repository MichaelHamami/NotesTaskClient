import {View, Text, TextInput, StyleSheet} from 'react-native';

const TextAreaRow = ({label, value, onChangeText, placeholder, isMultiLine = false}) => {
  return (
    <View style={[styles.rowContainer]}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} multiline={isMultiLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#99b2c7',
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '100%',
    gap: 20,
  },
  input: {
    flex: 1,
    maxHeight: 200,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  text: {},
});

export default TextAreaRow;
