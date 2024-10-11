import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextAreaRow from 'components/baseComponents/TextAreaRow';
import * as Constant from 'MyConstants';

const TaskModal = ({ onClose, onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(Constant.TASK_TYPE.Normal);
  const [circularTime, setCircularTime] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      isCompleted: false,
      endDate: date,
    };
    onCreateTask(task);
  };

  const handleCircularChange = time => {
    setCircularTime(time);
  };

  const handleChangeDate = (event, selectedDate) => {
    console.log(event, selectedDate);
    setShowDatePicker(false);
    if (!selectedDate) return;
    setDate(selectedDate);
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
                <Button title="Normal" onPress={() => setType(Constant.TASK_TYPE.Normal)} />
                <Button title="Circular" onPress={() => setType(Constant.TASK_TYPE.Circular)} />
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
                  <Text>
                    {date
                      ? `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
                      : 'No date selected'}
                  </Text>
                </>
              )}
            </View>

            <View style={styles.modalFooter}>
              <Button title="Create Task" onPress={handleCreateTask} />
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
