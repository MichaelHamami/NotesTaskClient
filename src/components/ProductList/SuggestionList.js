import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {useLabelsContext} from '../../context/LabelsContext/label.context';

const SuggestionList = ({suggestions, onEdit}) => {
  const labels = useLabelsContext();
  return (
    <View style={styles.container}>
      {suggestions.map((item, index) => (
        <View key={item._id} style={[styles.suggestionItem, index === 0 && styles.firstItem]}>
          <View style={styles.nameAndCategoryContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category?.name ?? labels.defaultCategory}</Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => onEdit(item)}>
              <IconMaterial name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 31,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  suggestionItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    padding: 10,
    borderTopWidth: 0.5,
    borderBlockColor: 'gray',
  },
  firstItem: {
    borderTopWidth: 0,
  },
  nameAndCategoryContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SuggestionList;
