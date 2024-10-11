import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { getTaskTypeByValue } from './taskHelper';
import { updatedTask } from 'api/task.api';
import * as Constant from 'MyConstants';
import * as NoteActions from 'redux/actions/note.actions';

const TaskNote = ({ title, description, isCompleted, type, endDate, circulationTime, componentId: id }) => {
  const [isSelected, setIsSelected] = useState(isCompleted);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handelExpended = () => {
    setExpanded(prevState => !prevState);
  };

  const onSuccess = data => {
    const noteData = {
      ...data,
      note: undefined,
    };
    dispatch(NoteActions.updateNote(data._id, noteData));
  };

  const handleCheckBoxClicked = async () => {
    setIsSelected(prevState => {
      setLoading(true);
      updatedTask(id, { isCompleted: !prevState })
        .then(data => {
          setLoading(false);
          onSuccess(data);
        })
        .catch(error => {
          console.error('Error updating task:', error.message); // TODO: USE TOAST
          setLoading(false);
        });
      return !prevState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.notExpandedContainer}>
        <View style={styles.startContainer}>
          <CheckBox value={isSelected} onValueChange={handleCheckBoxClicked} style={styles.checkbox} disabled={isLoading} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.endContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handelExpended} style={styles.info}>
            <Text style={styles.expendedBtn}>{expanded ? '^' : 'v'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.info}>Type: {getTaskTypeByValue(type)}</Text>
        {endDate && <Text style={styles.info}>End Date: {endDate ? endDate.toString() : 'No end date'}</Text>}
        {type === Constant.TASK_TYPE.Circular && (
          <>
            <Text style={styles.info}>Circulation Time: {circulationTime} minutes</Text>
          </>
        )}
        <Text style={styles.info}>Status: {isSelected ? 'Completed' : 'Pending'}</Text>
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
