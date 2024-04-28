import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, I18nManager} from 'react-native';
import {useDispatch} from 'react-redux';
import {useLabelsContext} from '../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-easy-toast';
import * as ReduxActions from '../redux/actions/productList.actions';
import {createProductList} from '../api/productList.api';
import * as Constant from '../constants';

const CreateList = ({navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();

  const options = [
    {
      label: labels.shopping,
      value: 0,
    },
    {
      label: labels.products,
      value: 1,
    },
  ];

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(options[0].value); //TODO: selected the option by optional route params
  const backIconName = I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {};

  const createList = async listName => {
    setIsLoading(true);

    try {
      const body = {name: listName, type: selectedOption};
      const data = await createProductList(body);
      console.log(data); // {"_id:..."}
      dispatch(ReduxActions.addProductList(data));
      // TODO: navigate to the selected list by the id
    } catch (error) {
      console.error('Error creating product list:', error);
      this.toast.show(labels.creatingListErrorToaster, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClicked = () => {
    console.log('save clicked');
    if (!inputValue || inputValue.trim() === '') {
      this.toast.show(labels.listNameErrorMessage, 2000);
      return null;
    }
    createList(inputValue);
  };

  const SelectableOption = ({option, isSelected, onSelect}) => {
    return (
      <TouchableOpacity style={[styles.optionContainer, isSelected && styles.selectedOption]} onPress={onSelect}>
        {isSelected && <Icon name={'check-circle'} size={20} color={Constant.PRIMARY_COLOR} />}
        <Text style={{color: Constant.PRIMARY_COLOR, fontSize: 20}}>{option.label}</Text>
      </TouchableOpacity>
    );
  };

  const Header = ({title}) => {
    return (
      <View style={headerStyles.headerContainer}>
        <TouchableOpacity style={headerStyles.backButton} onPress={handlePress}>
          <Icon name={backIconName} size={20} color="white" />
        </TouchableOpacity>
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.title}>{title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title={labels.addList} />
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder={labels.listNamePlaceHolder} value={inputValue} onChangeText={setInputValue} />
        <View style={styles.optionsContainer}>
          <SelectableOption
            option={options[0]}
            isSelected={selectedOption === options[0].value}
            onSelect={() => setSelectedOption(options[0].value)}
          />
          <SelectableOption
            option={options[1]}
            isSelected={selectedOption === options[1].value}
            onSelect={() => setSelectedOption(options[1].value)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveClicked} disabled={isLoading}>
        <Text style={styles.buttonLabel}>{labels.save}</Text>
      </TouchableOpacity>
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

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Constant.PRIMARY_COLOR,
  },
  titleContainer: {
    flex: 1,
    marginEnd: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    textAlign: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  optionsContainer: {
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    marginEnd: 8,
    flex: 1,
  },
  selectedOption: {
    borderColor: Constant.PRIMARY_COLOR,
    borderWidth: 1,
    gap: 5,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: Constant.PRIMARY_COLOR,
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    width: '30%',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreateList;
