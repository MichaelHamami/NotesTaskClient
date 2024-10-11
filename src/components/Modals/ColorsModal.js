import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ModalHeader from './ModalHeader';

const COLORS_OPTIONS = ['#000000', '#F323F3', '#B3B2B1', '#534', '#125', '#888', '#777', '#333'];

const ColorsModal = ({ onSelectedOption, visible, closeModal }) => {
  return (
    <ModalHeader visible={visible} closeModal={closeModal}>
      <View>
        <Text style={styles.title}>Select a color</Text>
        <View style={styles.optionsContainer}>
          {COLORS_OPTIONS.map((color, index) => (
            <TouchableOpacity key={index} onPress={() => onSelectedOption(color)}>
              <View style={[styles.option, { backgroundColor: color }]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cancelButton}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalHeader>
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
    gap: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  option: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cancelButton: {},
  cancelButtonText: {
    color: 'black',
  },
});

export default ColorsModal;
