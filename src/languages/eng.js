import * as Constant from 'MyConstants';

const eng = () => {
  return {
    new: 'Add',
    create: 'Create',
    shoppingList: 'Shopping List',
    productList: 'Product List',
    myLists: 'My Lists',
    addList: 'Add new list',
    listNamePlaceHolder: 'Name of the list',
    shopping: 'Shopping',
    products: 'Products',
    save: 'save',
    delete: 'delete',
    listNameErrorMessage: 'Please insert list name',
    creatingListErrorToaster: 'Failed to create List',
    deleteList: 'Delete list',
    editName: 'Edit Name',
    duplicateList: 'Duplicate List',
    save: 'Save',
    cancel: 'Cancel',
    copy: 'Copy',
    searchListPlaceHolder: 'Search items in the list',
    addProduct: 'Add Product',
    defaultCategory: 'Other',
    unit_type: {
      1: 'each',
      2: 'lb',
      3: 'pkg',
      4: 'oz',
      5: 'gal',
    },
    categoriesNames: {
      OTHER: 'Other',
      CLEANING_SUPPLIES: 'Cleaning Supplies',
      DAIRY: 'Dairy',
    },
    noItemsTitle: 'Your list is empty',
    noItemsSubTitle: 'Click here or type a new product',
    quantity: 'Quantity',
    unitType: 'Unit Type',
    category: 'Category',
    description: 'Description',
    price: 'Price',
    priceValue: '$ {{price}}',
    categories: 'Categories',
    unitTypes: 'Unit Types',
    deleteProductTitle: 'Are you sure you want to delete this product',
    yes: 'Yes',
    no: 'No',
    boughtListName: 'Shopping cart',
    backToList: 'Return to list',
    deleteBoughtList: 'Delete Bought List',
    currentQuantityAtHome: 'Current Quantity of Product',
    generateShoppingList: 'Generate shopping list',
    outOf: 'Out of',
    signup: 'Signup',
    login: 'Login',
    addCategory: 'Add Category',
    categoryNamePlaceHolder: 'Name of the category',
    color: 'Color',
    iconName: 'Icon Name',
    supportedIcons: 'Supported Icons',
    preview: 'Preview',
    exampleOf: 'Example Of',
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    languageNameByCode: {
      [Constant.USER_LANGUAGE.HEB]: 'Hebrew',
      [Constant.USER_LANGUAGE.ENG]: 'English',
    },
    defaultAuthErrorMessage: 'Username or Password are invalid.',
    usernameAndPasswordRequired: 'Username and Password are required.',
    rememberMe: 'Remember me',
    userName: 'User Name',
    password: 'Password',
    phoneLanguage: 'Phone Language',
    loading: 'Loading',
  };
};

export default eng;
