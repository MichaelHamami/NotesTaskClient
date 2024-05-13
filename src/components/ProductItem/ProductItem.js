import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, I18nManager, Modal} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';
import * as ProductListActions from '../../redux/actions/productList.actions';
import {getProductLists, updateProductList} from '../../api/productList.api';
import {getProductListById, getProductItem} from '../../redux/selectors/productList.selectors';
import {updateProduct} from '../../api/product.api';
import {selectCategories} from '../../redux/selectors/category.selectors';
import ClickableIcon from '../baseComponents/ClickableIcon';
import LabelWithValue from '../baseComponents/LabelWithValue';
import OptionsModal from '../Modals/OptionsModal';
import AreYouSureModal from '../Modals/AreYouSureModal';
import * as Constant from '../../constants';

const ProductItem = ({route, navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const productList = useSelector(state => getProductListById(state, route.params.productListId));
  const product = useSelector(state => getProductItem(state, route.params.productListId, route.params.productId));
  const categories = useSelector(selectCategories);
  // console.log('productListId:', route.params.productListId, ' ProductItem', product);
  const backIconName = I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  const [isLoading, setIsLoading] = useState(false);
  const [addItemNameValue, setAddItemNameValue] = useState(product?.name);
  const [productQuantity, setProductQuantity] = useState(product?.quantity ?? 1);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [unitTypeModalVisible, setUnitTypeModalVisible] = useState(false);
  const [areYouSureModalVisible, setAreYouSureModalVisible] = useState(false);

  const [category, setCategory] = useState(product?.category);
  const [unitType, setUnitType] = useState(product?.unit_type ?? 1);
  const [description, setDescription] = useState(product?.description ?? '');

  const categoriesOptions = categories.map(category => {
    return {
      ...category,
      label: getCategoryName(category.name, category.isSystem),
    };
  });

  const unitTypeOptions = Object.entries(labels.unit_type).map(([key, value]) => {
    return {
      key,
      label: value,
    };
  });

  const closeCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const closeAreYouSureModal = () => {
    setAreYouSureModalVisible(false);
  };

  const handleOptionSelect = option => {
    setCategory(option);
    closeCategoryModal();
  };

  const handleUnitTypeSelect = option => {
    setUnitType(option.key);
    closeUnitTypeModal();
  };

  const closeUnitTypeModal = () => {
    setUnitTypeModalVisible(false);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, [route.params?.productListId]);

  const fetchData = async () => {
    try {
      const data = await getProductLists();
      dispatch(ProductListActions.getProductLists(data));
    } catch (error) {
      console.error('Error fetching ProductLists:', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = text => {
    setAddItemNameValue(text);
  };

  function getCategoryName(name, isSystem) {
    if (!isSystem) return name;
    const labelName = name.replace('!{[', '').replace(']}', '');
    return labels.categoriesNames[labelName];
  }

  const addQuantity = () => {
    setProductQuantity(prevState => prevState + 1);
  };

  const removeQuantity = () => {
    setProductQuantity(prevState => {
      if (prevState <= 0) return 0;
      return prevState - 1;
    });
  };

  const saveItem = async () => {
    const data = {
      name: addItemNameValue,
      quantity: productQuantity,
      category: category._id,
      unit_type: unitType,
      description: description,
    };
    const updatedData = await updateProduct(product._id, data);

    const itemIndex = productList.items.findIndex(item => item._id === product._id);
    if (itemIndex !== -1) {
      const updatedProductList = {
        ...productList,
        items: [...productList.items.slice(0, itemIndex), updatedData, ...productList.items.slice(itemIndex + 1)],
      };
      dispatch(ProductListActions.updateProductList(route.params.productListId, updatedProductList));
    }

    navigation.goBack();
  };

  const deleteItem = async () => {
    const items = productList.items.filter(item => item._id !== product._id).map(item => item._id);
    const updateProductListData = await updateProductList(route.params.productListId, {items});

    dispatch(ProductListActions.updateProductList(route.params.productListId, updateProductListData));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headerContainer}>
        <View style={headerItemStyles.flexStart}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name={backIconName} size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={headerItemStyles.titleContainer}>
          <TextInput style={headerItemStyles.title} value={addItemNameValue} onChangeText={handleNameChange} />
        </View>
        <View>
          <Menu>
            <MenuTrigger>
              <Icon name="ellipsis-v" size={24} color="white" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => {}} disabled={isLoading} style>
                <Text style={{color: 'black'}}>{labels.deleteList}</Text>
              </MenuOption>
              <View style={headerItemStyles.divider}></View>
              <MenuOption onSelect={() => {}} disabled={isLoading}>
                <Text style={{color: 'black'}}>{labels.duplicateList}</Text>
              </MenuOption>
              <View style={headerItemStyles.divider}></View>

              <MenuOption onSelect={() => {}} disabled={isLoading}>
                <Text style={{color: 'black'}}>{labels.editName}</Text>
              </MenuOption>
              <View style={headerItemStyles.divider}></View>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <ScrollView>
        <View style={styles.propertiesContainer}>
          <View style={styles.rowContainer}>
            <View style={[styles.rowPart, {borderEndWidth: 1, borderEndColor: 'black'}]}>
              <ClickableIcon iconName={'add'} onPress={addQuantity} iconColor={'black'} />
              <LabelWithValue label={labels.quantity} value={productQuantity} />
              <ClickableIcon iconName={'remove'} onPress={removeQuantity} />
            </View>
            <View style={styles.rowPart}>
              <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
                <LabelWithValue label={labels.unitType} value={labels.unit_type[unitType]} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
            <Text>{labels.category}</Text>
            <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
              <Text>{getCategoryName(category.name, category.isSystem)}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.rowContainer, {justifyContent: 'space-between', gap: 20}]}>
            <Text>{labels.description}</Text>
            <TextInput style={styles.input} value={description} onChangeText={handleDescriptionChange} multiline={true} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={saveItem} style={[styles.button, {backgroundColor: Constant.PRIMARY_COLOR}]}>
          <IconMaterial name="save" size={20} color="white" />
          <Text style={{color: 'white'}}>{labels.save}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAreYouSureModalVisible(true)} style={[styles.button, {backgroundColor: 'white'}]}>
          <IconMaterial name="delete" size={20} color="black" />
          <Text style={{color: 'black'}}>{labels.delete}</Text>
        </TouchableOpacity>
      </View>
      <OptionsModal
        options={categoriesOptions}
        title={labels.categories}
        visible={categoryModalVisible}
        onSelectedOption={handleOptionSelect}
        closeModal={closeCategoryModal}
      />
      <OptionsModal
        options={unitTypeOptions}
        title={labels.unitTypes}
        visible={unitTypeModalVisible}
        onSelectedOption={handleUnitTypeSelect}
        closeModal={closeUnitTypeModal}
      />
      <AreYouSureModal text={labels.deleteProductTitle} visible={areYouSureModalVisible} onClose={closeAreYouSureModal} onApprove={deleteItem} />
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

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Constant.PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: '30%',
    minHeight: 50,
  },
  propertiesContainer: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 20,
    height: '55%',
    paddingHorizontal: '5%',
  },
  rowContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#99b2c7',
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  rowPart: {
    width: '50%',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 200, // Adjust the max height to control the visible area
  },
  buttonsContainer: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    paddingHorizontal: '5%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    borderRadius: 20,
    flexDirection: 'row',
    borderRadius: 20,
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});

const headerItemStyles = StyleSheet.create({
  titleContainer: {
    gap: 10,
    flexDirection: 'row',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
});

export default ProductItem;
