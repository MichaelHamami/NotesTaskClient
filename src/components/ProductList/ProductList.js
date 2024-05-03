import React, {useState, useEffect, useMemo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, I18nManager} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';
import * as ReduxActions from '../../redux/actions/productList.actions';
import {getProductLists, addProductToProductList} from '../../api/productList.api';
import {getProductListById, getAllItemsFilterByProductId} from '../../redux/selectors/productList.selectors';
import * as Constant from '../../constants';
import SuggestionList from './SuggestionList';
import CheckBox from '@react-native-community/checkbox';

const ProductList = ({route, navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const productList = useSelector(state => getProductListById(state, route.params.productListId));
  const allItems = useSelector(state => getAllItemsFilterByProductId(state, route.params.productListId));
  const backIconName = I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  const searchBackIconName = !I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addItemNameValue, setAddItemNameValue] = useState('');
  const showSuggestions = addItemNameValue.length > 1;
  const categoriesAndItems = getCategoriesWithItems();

  function getCategoriesWithItems() {
    let categoriesAndItems = {};

    productList?.items.forEach(product => {
      if (!categoriesAndItems[product.category._id]) {
        categoriesAndItems[product.category._id] = {...product.category, items: []};
      }
      categoriesAndItems[product.category._id].items.push({...product, category: undefined});
    });

    return Object.values(categoriesAndItems);
  }

  const suggestions = useMemo(() => {
    if (!addItemNameValue) return [];
    return allItems.filter(item => item.name.includes(addItemNameValue));
  }, [addItemNameValue]);

  const handlePress = () => {
    navigation.navigate('MainProductList');
  };

  useEffect(() => {
    fetchCategories();
  }, [route.params?.productListId]);

  const fetchCategories = async () => {
    try {
      const data = await getProductLists();
      dispatch(ReduxActions.getProductLists(data));
    } catch (error) {
      console.error('Error fetching ProductLists:', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSearchMode = () => {
    setSearchValue(false);
  };

  const toggleEditMode = () => {
    setEditMode(prevState => !prevState);
  };

  const handleInputChange = text => {
    setAddItemNameValue(text);
  };

  const navigateToItems = () => {
    // TODO: Navigate to add Item Screen
  };

  const handleAddItem = async () => {
    console.log('Add Item', addItemNameValue);
    try {
      const body = {name: addItemNameValue};
      const data = await addProductToProductList(route.params.productListId, body);
      dispatch(ReduxActions.updateProductList(route.params.productListId, data));
    } catch (error) {
      console.error('Error addProductToProductList:', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
      setAddItemNameValue('');
    }
  };

  const productSelected = (id, currentValue) => {
    console.log('productSelected -id:', id, ' currentValue:', currentValue);
  };

  const QuantityView = ({quantity, unit_type}) => {
    return (
      <View style={quantityStyles.container}>
        <Text>{quantity ?? 1}</Text>
        <Text>{labels.unit_type[unit_type ?? 1]}</Text>
      </View>
    );
  };

  const getCategoryName = (name, isSystem) => {
    if (!isSystem) return name;
    const labelName = name.replace('!{[', '').replace(']}', '');
    return labels.categoriesNames[labelName];
  };

  const ListItem = ({name, items, color, isSystem}) => {
    return (
      <View style={categoriesAndItemStyles.container}>
        <View style={categoriesAndItemStyles.header}>
          <IconMaterial name={'add'} size={20} color={color} />
          <Text style={[categoriesAndItemStyles.label, {color: color}]}>{getCategoryName(name, isSystem)} </Text>
        </View>
        {items.map((product, index) => (
          <View
            key={index}
            style={[
              categoriesAndItemStyles.subItem,
              index === 0 && {borderStartColor: color, borderStartWidth: 2, borderTopColor: color, borderTopWidth: 2},
            ]}>
            <CheckBox
              value={product.bought}
              onValueChange={() => productSelected(product._id, product.bought)}
              style={categoriesAndItemStyles.checkboxContainer}
            />
            <View style={categoriesAndItemStyles.itemName}>
              <Text>{product.name}</Text>
            </View>
            <QuantityView quantity={product.quantity} unit_type={product.unit_type} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {searchValue === false ? (
        <View style={headerStyles.headerContainer}>
          <View style={headerStyles.titleAndBackButtonContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Icon name={backIconName} size={20} color="white" />
            </TouchableOpacity>
            <View style={headerStyles.titleContainer}>
              <Text style={headerStyles.title}>{productList?.name}</Text>
            </View>
          </View>
          <View style={headerStyles.buttonContainer}>
            <TouchableOpacity onPress={toggleEditMode} disabled={isLoading}>
              <Icon name="pencil-alt" size={24} color={editMode ? '#34a5eb' : 'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSearchValue('')} disabled={isLoading}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
            <Menu>
              <MenuTrigger style={headerStyles.menuTrigger}>
                <Icon name="ellipsis-v" size={24} color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => {}} disabled={isLoading} style>
                  <Text style={{color: 'black'}}>{labels.deleteList}</Text>
                </MenuOption>
                <View style={headerStyles.divider}></View>

                <MenuOption onSelect={() => {}} disabled={isLoading}>
                  <Text style={{color: 'black'}}>{labels.duplicateList}</Text>
                </MenuOption>
                <View style={headerStyles.divider}></View>

                <MenuOption onSelect={() => {}} disabled={isLoading}>
                  <Text style={{color: 'black'}}>{labels.editName}</Text>
                </MenuOption>
                <View style={headerStyles.divider}></View>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      ) : (
        <View style={headerStyles.headerContainer}>
          <View style={headerStyles.titleAndBackButtonContainer}>
            <TouchableOpacity onPress={cancelSearchMode}>
              <Icon name={searchBackIconName} size={20} color="white" />
            </TouchableOpacity>
            <View style={headerStyles.titleContainer}>
              <TextInput
                style={headerStyles.input}
                value={searchValue}
                onChangeText={text => setSearchValue(text)}
                placeholder={labels.searchListPlaceHolder}
                placeholderTextColor={'white'}
              />
            </View>
          </View>
        </View>
      )}

      <View style={styles.addItemContainer}>
        <View style={styles.inputContainer}>
          {suggestions.length > 0 && showSuggestions && <SuggestionList suggestions={suggestions} onEdit={() => setAddItemNameValue('')} />}
          <TextInput style={styles.addProductInput} placeholder={labels.addProduct} value={addItemNameValue} onChangeText={handleInputChange} />

          <View style={styles.inputButtons}>
            {addItemNameValue ? (
              <TouchableOpacity onPress={handleAddItem}>
                <IconMaterial name="done" size={24} color="gray" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={navigateToItems}>
                <IconMaterial name="add" size={24} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.categoriesAndItemsContainer}>
        {categoriesAndItems.map((category, index) => (
          <View key={index}>
            <ListItem {...category} />
          </View>
        ))}
      </View>
      <Toast
        ref={toast => (this.toast = toast)}
        style={{backgroundColor: 'red'}}
        position="top"
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{color: 'white'}}
      />
    </View>
  );
};

const quantityStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
  },
});

const categoriesAndItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  itemName: {
    width: '60%',
  },
});

const styles = StyleSheet.create({
  categoriesAndItemsContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    padding: 16,
  },
  addItemContainer: {
    backgroundColor: Constant.PRIMARY_COLOR,
    height: 70,
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    flex: 1,
    position: 'relative',
  },
  inputButtons: {
    marginRight: 10,
  },
  addProductInput: {
    marginLeft: 10,
    alignItems: 'center',
    flex: 1,
  },
  suggestionsList: {
    backgroundColor: 'red',
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'black',
  },
});

const headerStyles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 56,
    backgroundColor: Constant.PRIMARY_COLOR,
    paddingHorizontal: 16,
  },
  titleAndBackButtonContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    gap: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    color: 'white',
  },
});

export default ProductList;
