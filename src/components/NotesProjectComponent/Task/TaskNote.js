import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { getTaskTypeByValue } from './taskHelper';
import { updatedTask, deleteTask } from 'api/task.api';
import { formattedDateTime } from 'utils/helpers';
import { updateWidget } from '../Note/noteHelper';
import * as NoteActions from 'redux/actions/note.actions';
import ClickableIcon from 'components/baseComponents/ClickableIcon';
import * as Constant from 'MyConstants';
import { useAppContext } from 'context';

const TaskNote = ({ title, description, isCompleted, type, endDate, circulationTime, taskId, onEditClicked }) => {
  const [isSelected, setIsSelected] = useState(isCompleted);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { setAppToFinishedLoad, setAppToLoading } = useAppContext();
  const circularLabel = getCircularLabel();
  console.log(circularLabel);
  console.log(circulationTime);

  function getCircularLabel() {
    let label = '';
    if (type === Constant.TASK_TYPE.Normal) return label;

    if (circulationTime?.years && circulationTime?.years > 0) {
      label += ` ${circulationTime.years} years`;
    }
    if (circulationTime?.months && circulationTime?.months > 0) {
      label += ` ${circulationTime.months} months`;
    }
    if (circulationTime?.days && circulationTime?.days > 0) {
      label += ` ${circulationTime.days} days`;
    }
    if (circulationTime?.minutes && circulationTime?.minutes > 0) {
      label += ` ${circulationTime.minutes} minutes`;
    }
    if (label.length > 0) {
      label = `Circulation Time:${label}`;
    }
    return label;
  }

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
      setAppToLoading(false);
      updatedTask(taskId, { isCompleted: !prevState })
        .then(data => {
          updateWidget();
          onSuccess(data);
        })
        .catch(error => {
          console.error('Error updating task:', error.message); // TODO: USE TOAST
        })
        .finally(() => {
          setAppToFinishedLoad(true);
        });
      return !prevState;
    });
  };

  const handleDeleteTask = async () => {
    try {
      setAppToLoading(false);
      const updatedNote = await deleteTask(taskId);
      onSuccess(updatedNote);
    } catch (error) {
    } finally {
      setAppToFinishedLoad(true);
    }
  };

  const handleEditClicked = () => {
    const dataOfTask = {
      title,
      description,
      isCompleted,
      type,
      endDate,
      circulationTime,
      taskId: taskId,
    };
    onEditClicked(dataOfTask);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notExpandedContainer}>
        <View style={styles.startContainer}>
          <ClickableIcon iconName={'delete'} iconColor={'black'} onPress={handleDeleteTask} />
          {onEditClicked && <ClickableIcon iconName={'edit'} iconColor={'black'} onPress={handleEditClicked} />}
          <CheckBox value={isSelected} onValueChange={handleCheckBoxClicked} style={styles.checkbox} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.endContainer}>
          <ClickableIcon iconName={expanded ? 'keyboard-arrow-up' : 'arrow-drop-down'} iconColor={'black'} onPress={handelExpended} />
        </View>
      </View>

      <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
        {description && <Text style={styles.description}>Description: {description}</Text>}
        <Text style={styles.info}>Type: {getTaskTypeByValue(type)}</Text>
        {endDate && <Text style={styles.info}>End Date: {formattedDateTime(endDate)}</Text>}
        {type === Constant.TASK_TYPE.Circular && (
          <>
            <Text style={styles.info}>{circularLabel}</Text>
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
    gap: 10,
    alignItems: 'center',
  },
  endContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default TaskNote;
