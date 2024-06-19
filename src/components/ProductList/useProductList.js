import {useDispatch} from 'react-redux';
import {updateProduct} from 'api/product.api';
import {generateRelativeProductList} from 'api/productList.api';
import * as ProductListActions from 'redux/actions/productList.actions';

const useProductList = () => {
  const dispatch = useDispatch();

  const handleProductUpdate = async (productId, dataToUpdate, productList) => {
    const updatedProduct = await updateProduct(productId, dataToUpdate);

    const itemIndex = productList.items.findIndex(item => item._id === productId);
    if (itemIndex !== -1) {
      const updatedProductList = {
        ...productList,
        items: [...productList.items.slice(0, itemIndex), updatedProduct, ...productList.items.slice(itemIndex + 1)],
      };
      dispatch(ProductListActions.updateProductList(productList._id, updatedProductList));
    }
  };

  const calculateShoppingProductList = async (productList, navigation) => {
    try {
      const date = new Date();
      const formattedDate = new Intl.DateTimeFormat({
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(date);

      const generatedName = `${productList.name}_${formattedDate}`;
      const newProductList = await generateRelativeProductList(productList._id, generatedName);
      dispatch(ProductListActions.addProductList(newProductList));
      navigation.navigate('ProductList', {productListId: newProductList._id});
    } catch (error) {
      return false;
    }
  };

  return {handleProductUpdate, calculateShoppingProductList};
};

export default useProductList;
