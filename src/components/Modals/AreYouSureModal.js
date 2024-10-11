import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLabelsContext } from 'context/LabelsContext/label.context';

const AreYouSureModal = ({ text, visible, onClose, onApprove }) => {
  const labels = useLabelsContext();

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>{labels.no}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={onApprove}>
              <Text style={styles.buttonText}>{labels.yes}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  approveButton: {
    backgroundColor: 'green',
  },
});

export default AreYouSureModal;
