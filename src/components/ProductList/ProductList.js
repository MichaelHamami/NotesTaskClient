import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  I18nManager,
  TouchableWithoutFeedback,
  ImageBackground,
  Button,
  ScrollView,
} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';
import * as ProductListActions from '../../redux/actions/productList.actions';
import {
  getProductLists,
  addProductToProductList,
  deleteProductList,
  duplicateProductList,
  updateProductListItems,
  deleteProductListItems,
} from '../../api/productList.api';
import {getProductListById, getAllItemsFilterByProductId} from '../../redux/selectors/productList.selectors';
import SuggestionList from './SuggestionList';
import CheckBox from '@react-native-community/checkbox';
import cartGif from '../../assets/clown-cart.gif';
import {BOUGHT_LIST_ID} from './ProductList.helper';
import useProductList from './useProductList';
import BaseHeader from '../baseComponents/BaseHeader';
import ClickableIcon from '../baseComponents/ClickableIcon';
import * as Constant from '../../constants';

const ProductList = ({route, navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const productList = useSelector(state => getProductListById(state, route.params.productListId));
  const allItems = useSelector(state => getAllItemsFilterByProductId(state, route.params.productListId));
  const isHomeProductList = productList?.type === Constant.PRODUCT_LIST_TYPE.HOME;
  const {handleProductUpdate, calculateShoppingProductList} = useProductList();
  const hasItems = productList?.items?.length > 0;
  const backIconName = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
  const searchBackIconName = !I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addItemNameValue, setAddItemNameValue] = useState('');
  const showSuggestions = addItemNameValue.length > 1;

  const categoriesAndItems = useMemo(() => {
    return getCategoriesWithItems(searchValue ? productList?.items.filter(item => item.name.includes(searchValue)) : productList?.items);
  }, [searchValue, productList?.items]);

  function getCategoriesWithItems(searchedItems) {
    if (!searchedItems || searchedItems.length === 0) return [];

    let categoriesAndItems = {
      [BOUGHT_LIST_ID]: {
        _id: BOUGHT_LIST_ID,
        name: labels.boughtListName,
        isSystem: false,
        color: '#000000',
        items: [],
        image: 'shopping-cart',
      },
    };

    searchedItems.forEach(product => {
      if (product.bought && !isHomeProductList) {
        categoriesAndItems[BOUGHT_LIST_ID].items.push({...product, category: undefined});
        return;
      }

      if (!categoriesAndItems[product.category._id]) {
        categoriesAndItems[product.category._id] = {...product.category, items: []};
      }
      categoriesAndItems[product.category._id].items.push({...product, category: undefined});
    });

    if (categoriesAndItems[BOUGHT_LIST_ID].items.length === 0) delete categoriesAndItems[BOUGHT_LIST_ID];

    return Object.values(categoriesAndItems).sort((a, b) => a._id.localeCompare(b._id));
  }

  const suggestions = useMemo(() => {
    if (!addItemNameValue) return [];
    return allItems.filter(item => item.name.includes(addItemNameValue));
  }, [addItemNameValue]);

  const handlePress = () => {
    navigation.navigate('MainProductList');
  };

  const handleItemPress = productId => {
    navigation.navigate('ProductItem', {productListId: route.params.productListId, productId: productId});
  };

  useEffect(() => {
    fetchProductLists();
  }, [route.params?.productListId]);

  const fetchProductLists = async () => {
    try {
      const data = await getProductLists();
      dispatch(ProductListActions.getProductLists(data));
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
    console.log('navigateToItems');
    // TODO: Navigate to add Item Screen
  };

  const handleDeleteProductList = async id => {
    setIsLoading(true);

    try {
      await deleteProductList(id);
      dispatch(ProductListActions.deleteProductList(id));
      setIsLoading(false);
      navigation.navigate('MainProductList');
    } catch (error) {
      console.error('Error deleting ProductList:', error); // TODO:USE TOAST
      setIsLoading(false);
    }
  };

  const handleDuplicateProductList = async () => {
    setIsLoading(true);

    try {
      const data = await duplicateProductList(productList._id, `${productList.name} - ${labels.copy}`);
      dispatch(ProductListActions.addProductList(data));

      setIsLoading(false);
      navigation.navigate('ProductList', {productListId: data._id});
    } catch (error) {
      console.error('Error duplicating ProductLists', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const body = {name: addItemNameValue};
      const data = await addProductToProductList(route.params.productListId, body);
      dispatch(ProductListActions.updateProductList(route.params.productListId, data));
    } catch (error) {
      console.error('Error addProductToProductList:', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
      setAddItemNameValue('');
    }
  };

  const productSelected = async (id, currentValue) => {
    await handleProductUpdate(id, {bought: !currentValue}, productList);
  };

  const QuantityView = ({quantity, unit_type, current_quantity}) => {
    return (
      <View style={quantityStyles.container}>
        {isHomeProductList && (
          <>
            <Text>{current_quantity}</Text>
            <Text>{labels.outOf}</Text>
          </>
        )}
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

  const handleBackItemsToList = async items => {
    try {
      const itemsIds = items.map(item => item._id);
      const productListUpdated = await updateProductListItems(productList._id, itemsIds, {bought: false});
      dispatch(ProductListActions.updateProductList(productList._id, productListUpdated));
    } catch (error) {}
  };

  const deleteBoughtItems = async items => {
    try {
      const itemsIds = items.map(item => item._id);
      const productListUpdated = await deleteProductListItems(productList._id, itemsIds);
      dispatch(ProductListActions.updateProductList(productList._id, productListUpdated));
    } catch (error) {}
  };

  const ListItem = ({name, items, color, isSystem, isBoughtList, image}) => {
    return (
      <View style={categoriesAndItemStyles.container}>
        <View style={categoriesAndItemStyles.header}>
          <IconMaterial name={image} size={20} color={color} />
          <Text style={[categoriesAndItemStyles.label, {color: color}]}>{getCategoryName(name, isSystem)} </Text>
        </View>

        {isBoughtList && (
          <View style={[categoriesAndItemStyles.boughtSection]}>
            <TouchableOpacity
              onPress={() => handleBackItemsToList(items)}
              style={[categoriesAndItemStyles.boughtPart, {borderBlockEndColor: 'black', borderEndWidth: 1}]}>
              <IconMaterial name={'settings-backup-restore'} size={20} color={'black'} />
              <Text>{labels.backToList} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteBoughtItems(items)} style={categoriesAndItemStyles.boughtPart}>
              <IconMaterial name={'delete'} size={20} color={'black'} />
              <Text> {labels.deleteBoughtList}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          {items.map((product, index) => (
            <View
              key={index}
              style={[
                categoriesAndItemStyles.subItem,
                index === 0 && {borderStartColor: color, borderStartWidth: 1, borderTopColor: color, borderTopWidth: 2},
                isHomeProductList && {paddingStart: 10},
              ]}>
              {!isHomeProductList && (
                <CheckBox
                  value={product.bought}
                  onValueChange={() => productSelected(product._id, product.bought)}
                  style={categoriesAndItemStyles.checkboxContainer}
                />
              )}
              <TouchableOpacity style={categoriesAndItemStyles.itemName} onPress={() => handleItemPress(product._id)}>
                <View>
                  <Text style={categoriesAndItemStyles.nameText}>{product.name}</Text>
                </View>
              </TouchableOpacity>

              <QuantityView quantity={product.quantity} unit_type={product.unit_type} current_quantity={product.current_quantity} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {searchValue === false ? (
        <BaseHeader>
          <View style={headerStyles.titleAndBackButtonContainer}>
            <ClickableIcon iconName={backIconName} iconColor={'white'} onPress={handlePress} />
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
              <MenuTrigger>
                <Icon name="ellipsis-v" size={24} color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleDeleteProductList(productList?._id)} disabled={isLoading} style>
                  <Text style={{color: 'black'}}>{labels.deleteList}</Text>
                </MenuOption>
                <View style={headerStyles.divider}></View>

                <MenuOption onSelect={handleDuplicateProductList} disabled={isLoading}>
                  <Text style={{color: 'black'}}>{labels.duplicateList}</Text>
                </MenuOption>
                <View style={headerStyles.divider}></View>
                {isHomeProductList && (
                  <>
                    <MenuOption onSelect={() => calculateShoppingProductList(productList)} disabled={isLoading}>
                      <Text style={{color: 'black'}}>{labels.generateShoppingList}</Text>
                    </MenuOption>
                    <View style={headerStyles.divider}></View>
                  </>
                )}
              </MenuOptions>
            </Menu>
          </View>
        </BaseHeader>
      ) : (
        <BaseHeader>
          <View style={headerStyles.titleAndBackButtonContainer}>
            <ClickableIcon iconName={searchBackIconName} iconColor={'white'} onPress={cancelSearchMode} />
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
        </BaseHeader>
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
      {hasItems ? (
        <>
          <View style={styles.categoriesAndItemsContainer}>
            <ScrollView>
              {categoriesAndItems.map((category, index) => (
                <View key={index}>
                  <ListItem {...category} isBoughtList={category._id === BOUGHT_LIST_ID} />
                </View>
              ))}
            </ScrollView>
            {isHomeProductList && (
              <View style={categoriesAndItemStyles.homeFooter}>
                <Button title={labels.generateShoppingList} onPress={() => calculateShoppingProductList(productList, navigation)} color={'red'} />
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={noItemsStyles.container}>
          <TouchableWithoutFeedback onPress={navigateToItems}>
            <View style={noItemsStyles.box}>
              <Text style={noItemsStyles.textStyle}>{labels.noItemsTitle}</Text>
              <Text style={noItemsStyles.textStyle}>{labels.noItemsSubTitle}</Text>
              <ImageBackground source={cartGif} style={noItemsStyles.gif}></ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
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

const noItemsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'white',
  },
  box: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
  gif: {
    width: 150,
    height: 150,
  },
});

const quantityStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    gap: 5,
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
  boughtSection: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  boughtPart: {
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
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
  nameText: {
    textAlign: 'left',
  },
  homeFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 30,
    width: '100%',
    height: 40,
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
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    color: 'white',
  },
});

export default ProductList;
