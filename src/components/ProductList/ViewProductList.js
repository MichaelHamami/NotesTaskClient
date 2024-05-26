import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import useProductList from './useProductList';
import * as Constant from '../../constants';

const ViewProductList = ({productList, onDelete, onDuplicate, onUpdateName}) => {
  const labels = useLabelsContext();
  const navigation = useNavigation();
  const {calculateShoppingProductList} = useProductList();
  const {name, items} = productList;
  const isHomeProductList = productList?.type === Constant.PRODUCT_LIST_TYPE.HOME;
  const {width, height} = Dimensions.get('window');
  const borderRadius = (Math.min(width, height) * 50) / 100;
  const [isLoading, setIsLoading] = useState(false);
  const customStyle = {
    borderRadius: borderRadius,
  };

  const numOfBoughtItems = items?.reduce((acc, item) => {
    let numToAdd = 0;
    if (isHomeProductList) {
      numToAdd = item.current_quantity === item.quantity ? 1 : 0;
    } else {
      numToAdd = item.bought ? 1 : 0;
    }
    return acc + numToAdd;
  }, 0);

  const [newName, setNewName] = useState(false);

  const handleEditNameClicked = () => {
    setNewName('');
  };

  const handleDuplicate = () => {
    onDuplicate(productList._id);
  };

  const handleDelete = () => {
    onDelete(productList._id);
  };

  const handelSaveName = () => {
    if (!newName || newName.trim() === '') return;
    onUpdateName(productList._id, newName);
    setNewName(false);
  };

  const handleCancelEditName = () => {
    setNewName(false);
  };

  const handleProductClick = () => {
    navigation.navigate('ProductList', {productListId: productList._id});
  };

  return (
    <View style={styles.productListRow}>
      <TouchableOpacity style={styles.circleAndNameContainer} onPress={handleProductClick} disabled={isLoading}>
        <View style={styles.circleAndNameContainer}>
          <View style={[styles.circle, customStyle]}>
            <Text>{items.length}</Text>
            <Text>{'/'}</Text>
            <Text>{numOfBoughtItems}</Text>
          </View>
          {newName === false ? (
            <Text style={styles.listName}>{name}</Text>
          ) : (
            <TextInput
              style={{
                borderColor: 'black',
                borderBottomWidth: 1,
                flex: 1,
                color: Constant.PRIMARY_COLOR,
              }}
              value={newName}
              onChangeText={text => setNewName(text)}
            />
          )}
        </View>
      </TouchableOpacity>
      {newName === false ? (
        <Menu>
          <MenuTrigger style={styles.menuTrigger}>
            <Icon name="ellipsis-v" size={24} color="black" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={handleDelete} disabled={isLoading} style>
              <Text style={{color: 'black'}}>{labels.deleteList}</Text>
            </MenuOption>
            <View style={styles.divider}></View>

            <MenuOption onSelect={handleDuplicate} disabled={isLoading}>
              <Text style={{color: 'black'}}>{labels.duplicateList}</Text>
            </MenuOption>
            <View style={styles.divider}></View>

            <MenuOption onSelect={handleEditNameClicked} disabled={isLoading}>
              <Text style={{color: 'black'}}>{labels.editName}</Text>
            </MenuOption>
            <View style={styles.divider}></View>
            {isHomeProductList && (
              <>
                <MenuOption onSelect={() => calculateShoppingProductList(productList, navigation)} disabled={isLoading}>
                  <Text style={{color: 'black'}}>{labels.generateShoppingList}</Text>
                </MenuOption>
                <View style={styles.divider}></View>
              </>
            )}
          </MenuOptions>
        </Menu>
      ) : (
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handelSaveName} disabled={isLoading}>
            <Text style={styles.buttonLabel}>{labels.save}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCancelEditName} disabled={isLoading}>
            <Text style={styles.buttonLabel}>{labels.cancel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productListRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    gap: 10,
  },
  circleAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderColor: Constant.PRIMARY_COLOR,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexDirection: 'row',
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.PRIMARY_COLOR,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonLabel: {
    color: 'black',
  },
  menuTrigger: {
    paddingEnd: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
});

export default ViewProductList;
