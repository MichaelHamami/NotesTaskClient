import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({ visible }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default LoadingOverlay;
