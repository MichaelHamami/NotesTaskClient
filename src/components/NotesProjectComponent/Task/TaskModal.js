import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextAreaRow from 'components/baseComponents/TextAreaRow';
import moment from 'moment-timezone';
import { formattedDateTime } from 'utils/helpers';
import * as Constant from 'MyConstants';

const TaskModal = ({ onClose, onCreateTask, onEditTask, taskId, taskTitle, taskDescription, taskCircularTime, taskEndDate, taskType }) => {
  const [title, setTitle] = useState(taskTitle ?? '');
  const [description, setDescription] = useState(taskDescription ?? '');
  const [type, setType] = useState(taskType ?? Constant.TASK_TYPE.Normal);
  const [circularTime, setCircularTime] = useState(taskCircularTime?.toString() ?? null);
  const [date, setDate] = useState(taskEndDate ? new Date(taskEndDate) : new Date());
  const [time, setTime] = useState(taskEndDate ? new Date(taskEndDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleCreateTask = () => {
    if (!title) {
      Alert.alert('Error', 'Title are required.');
      return;
    }
    const task = {
      title,
      description,
      type,
      circulationTime: circularTime,
      isCompleted: taskId ? undefined : false,
      endDate: getCombinedDateTime(),
      taskId: taskId ?? undefined,
    };
    taskId ? onEditTask(task) : onCreateTask(task);
  };

  const handleCircularChange = time => {
    setCircularTime(time);
  };

  const handleChangeDate = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
      setShowTimePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleChangeTime = (event, selectedTime) => {
    if (event.type === 'set') {
      const currentTime = selectedTime || time;
      setShowTimePicker(false);
      setTime(currentTime);
    } else {
      setShowTimePicker(false);
    }
  };

  const getCombinedDateTime = () => {
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours());
    combinedDateTime.setMinutes(time.getMinutes());
    const utcDate = moment(combinedDateTime).utc().format('YYYY-MM-DD HH:mm:ss');
    const jerusalemDate = moment(utcDate).tz('Asia/Jerusalem', false).set('hour', time.getHours()).set('minute', time.getMinutes());
    return jerusalemDate;
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{'Create Task'}</Text>
          <ScrollView style={styles.modelBodyAndFooter}>
            <View style={styles.modelBody}>
              <TextAreaRow label={'Title'} value={title} onChangeText={setTitle} />
              <TextAreaRow label={'Description'} value={description} onChangeText={setDescription} />
              <View style={styles.typeOptionsContainer}>
                <Button
                  title="Normal"
                  color={type === Constant.TASK_TYPE.Normal ? '#008000' : undefined}
                  onPress={() => setType(Constant.TASK_TYPE.Normal)}
                />
                <Button
                  title="Circular"
                  color={type === Constant.TASK_TYPE.Circular ? '#008000' : undefined}
                  onPress={() => setType(Constant.TASK_TYPE.Circular)}
                />
              </View>
              {type === Constant.TASK_TYPE.Circular && (
                <>
                  <View style={styles.circularContainer}>
                    <Text>Set a circular time for the task (in minutes)</Text>
                    <TextInput
                      value={circularTime}
                      keyboardType="numeric"
                      onChangeText={handleCircularChange}
                      style={{ backgroundColor: '#f3f3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 20 }}
                      maxLength={10}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text>Choose End Date</Text>
                  </TouchableOpacity>
                  {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={handleChangeDate} />}
                  {showTimePicker && <DateTimePicker value={time} mode="time" display="default" onChange={handleChangeTime} />}
                  <Text>Selected End Date: {formattedDateTime(getCombinedDateTime())}</Text>
                </>
              )}
            </View>

            <View style={styles.modalFooter}>
              <Button title={taskId ? 'Save Task' : 'Create Task'} onPress={handleCreateTask} />
              <Button title="Cancel" onPress={() => onClose()} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    height: '80%',
    overflow: 'hidden',
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  modelBodyAndFooter: {},
  modelBody: {
    gap: 20,
    marginBottom: 20,
  },
  typeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  circularContainer: {
    justifyContent: 'center',
  },
  modalFooter: {
    gap: 20,
  },
});

export default TaskModal;
