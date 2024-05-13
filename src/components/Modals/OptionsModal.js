import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {useLabelsContext} from '../../context/LabelsContext/label.context';

const OptionsModal = ({options, title, onSelectedOption, visible, closeModal}) => {
  const labels = useLabelsContext();

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => onSelectedOption(option)}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.cancelButton}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelButtonText}>{labels.cancel}</Text>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    overflow: 'hidden',
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  optionsContainer: {
    gap: 20,
  },
  option: {
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'flex-end',
  },
  cancelButtonText: {
    alignItems: 'center',
    color: 'black',
  },
});

export default OptionsModal;
