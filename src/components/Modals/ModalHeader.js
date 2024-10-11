import { View, StyleSheet, Modal } from 'react-native';

const ModalHeader = ({ visible, closeModal, customModalContainer, customModalContent, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={[styles.modalContainer, customModalContainer]}>
        <View style={[styles.modalContent, customModalContent]}>{children}</View>
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
    height: '80%',
    overflow: 'hidden',
    gap: 20,
  },
});

export default ModalHeader;
