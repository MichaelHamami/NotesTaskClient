import {useDispatch} from 'react-redux';
import {updateProduct} from '../../api/product.api';
import * as ProductListActions from '../../redux/actions/productList.actions';

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

  return {handleProductUpdate};
};

export default useProductList;
