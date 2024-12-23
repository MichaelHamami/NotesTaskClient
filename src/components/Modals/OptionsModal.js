import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { useLabelsContext } from 'context/LabelsContext/label.context';

const OptionsModal = ({ options, title, onSelectedOption, visible, closeModal }) => {
  const labels = useLabelsContext();

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.optionsContainer}>
            <FlatList
              data={options}
              renderItem={({ item }, index) => (
                <TouchableOpacity key={index} style={styles.option} onPress={() => onSelectedOption(item)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(_item, index) => index}
            />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  optionsContainer: {
    height: '80%',
    gap: 20,
    padding: 10,
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
