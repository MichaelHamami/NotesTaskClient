import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, I18nManager, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {useLabelsContext} from '../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-easy-toast';
import * as ReduxActions from '../redux/actions/category.actions';
import {createCategory} from '../api/category.api';
import TextAreaRow from './baseComponents/TextAreaRow';
import jsonIcon from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import * as Constant from '../constants';
import OptionsModal from './Modals/OptionsModal';

const CreateCategory = ({navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [colorValue, setColorValue] = useState('#000000');
  const [iconValue, setIconValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backIconName = I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  const iconNames = Object.keys(jsonIcon).map(iconName => {
    return {
      label: iconName,
    };
  });

  const handlePress = () => {
    navigation.goBack();
  };

  const resetInputs = () => {
    setInputValue('');
    setColorValue('');
    setIconValue('');
  };

  const validateInputs = () => {
    if (inputValue.trim().length <= 0) return false;
    return true;
  };

  const createCategoryItem = async body => {
    setIsLoading(true);

    try {
      const data = await createCategory(body);
      dispatch(ReduxActions.addCategory(data));
      resetInputs();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClicked = () => {
    if (validateInputs()) {
      const body = {
        name: inputValue,
        image: iconValue,
        color: colorValue,
      };
      createCategoryItem(body);
    }
  };

  const handleIconNameSelected = icon => {
    setShowModal(false);
    setIconValue(icon.label);
  };

  const Header = ({title}) => {
    return (
      <View style={headerStyles.headerContainer}>
        <TouchableOpacity onPress={handlePress}>
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
      <Header title={labels.addCategory} />
      <View style={styles.container}>
        <TextAreaRow label={labels.category} placeholder={labels.categoryNamePlaceHolder} value={inputValue} onChangeText={setInputValue} />
        <TextAreaRow label={labels.iconName} value={iconValue} onChangeText={setIconValue} />
        <TextAreaRow label={labels.color} value={colorValue} onChangeText={setColorValue} />
        <Button title={labels.supportedIcons} onPress={() => setShowModal(true)} />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveClicked} disabled={isLoading}>
          <Text style={styles.buttonLabel}>{labels.save}</Text>
        </TouchableOpacity>
        <Text>{labels.preview}:</Text>
        <View style={styles.previewContainer}>
          <View style={styles.previewCategory}>
            <IconMaterial name={iconValue} size={20} color={colorValue} />
            <Text style={{color: colorValue}}>{inputValue}</Text>
          </View>
          <View
            style={[
              styles.previewItem,
              {borderStartColor: colorValue, borderStartWidth: 1, borderTopColor: colorValue, borderTopWidth: 2},
              {paddingStart: 10},
            ]}>
            <Text>{`${labels.exampleOf} ${inputValue}`}</Text>
          </View>
        </View>
      </View>

      <OptionsModal
        options={iconNames}
        title={labels.supportedIcons}
        visible={showModal}
        onSelectedOption={handleIconNameSelected}
        closeModal={() => setShowModal(false)}
      />
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
  previewContainer: {
    flexDirection: 'column',
    height: 20,
    width: '100%',
  },
  previewCategory: {
    flexDirection: 'row',
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  colorPicker: {},
  container: {
    justifyContent: 'center',
    padding: 16,
    gap: 20,
  },
  input: {
    textAlign: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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

export default CreateCategory;
