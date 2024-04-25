import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TaskNote = ({title, description, isCompleted, type, endDate, circulationTime, componentId: id}) => {
  const [isSelected, setSelection] = useState(isCompleted);
  const [expanded, setExpanded] = useState(false);

  const handelExpended = () => {
    setExpanded(prevState => !prevState);
  };

  const handleCheckBoxClicked = () => {
    setSelection(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notExpandedContainer}>
        <View style={styles.startContainer}>
          <CheckBox value={isSelected} onValueChange={handleCheckBoxClicked} style={styles.checkbox} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.endContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handelExpended} style={styles.info}>
            <Text style={styles.expendedBtn}>{expanded ? '^' : 'v'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: expanded ? null : 0, overflow: 'hidden'}}>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.info}>Type: {type}</Text>
        <Text style={styles.info}>End Date: {endDate ? endDate.toString() : 'No end date'}</Text>
        <Text style={styles.info}>Circulation Time: {circulationTime} days</Text>
        <Text style={styles.info}>Status: {isCompleted ? 'Completed' : 'Pending'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 5,
    fontStyle: 'italic',
  },
  info: {
    fontSize: 14,
  },
  notExpandedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expendedBtn: {
    alignSelf: 'flex-end',
  },
  startContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  endContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default TaskNote;
