import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProductListByType} from '../../redux/selectors/selector';
import Toast from 'react-native-easy-toast';
import * as ReduxActions from '../../redux/actions/productList.actions';
import {getProductLists, deleteProductList, createProductList, updateProductList} from '../../api/productList.api';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import ViewProductList from './ViewProductList';

const ViewAllProductLists = ({navigation, type}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const productLists = useSelector(state => getProductListByType(state, type));

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessRunning, setIsProcessRunning] = useState(false);

  useEffect(() => {
    fetchProductLists();
  }, []);

  const fetchProductLists = async () => {
    try {
      const data = await getProductLists();
      dispatch(ReduxActions.getProductLists(data));
    } catch (error) {
      console.error('Error fetching ProductLists:', error); // TODO:USE TOAST
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProductList = async id => {
    setIsProcessRunning(true);

    try {
      const data = await deleteProductList(id);
      dispatch(ReduxActions.deleteProductList(id));
    } catch (error) {
      console.error('Error deleting ProductList:', error); // TODO:USE TOAST
    } finally {
      setIsProcessRunning(false);
    }
  };

  const handleDuplicateProductList = async id => {
    setIsProcessRunning(true);

    try {
      const productToDuplicate = productLists.find(productList => productList._id === id);
      if (!productToDuplicate) throw Error('Not found product to duplicate');
      const body = {
        ...productToDuplicate,
        name: `${productToDuplicate.name} - ${labels.copy}`,
        items: productToDuplicate.items.map(item => item._id), //TODO: Check if need to be fix
        _id: undefined,
      };

      const data = await createProductList(body);
      dispatch(ReduxActions.addProductList(data));
    } catch (error) {
      console.error('Error duplicating ProductLists', error); // TODO:USE TOAST
    } finally {
      setIsProcessRunning(false);
    }
  };

  const handleUpdateName = async (id, name) => {
    setIsProcessRunning(true);

    try {
      const body = {
        name: name,
      };

      const data = await updateProductList(id, body);
      dispatch(ReduxActions.updateProductList(id, data));
    } catch (error) {
      console.error('Error updating name of ProductList', error); // TODO:USE TOAST
    } finally {
      setIsProcessRunning(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {!isLoading &&
        productLists.map(productList => (
          <ViewProductList
            productList={productList}
            key={productList._id}
            onDelete={handleDeleteProductList}
            onDuplicate={handleDuplicateProductList}
            onUpdateName={handleUpdateName}
            parentProcess={isProcessRunning}
          />
        ))}

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

export default ViewAllProductLists;
