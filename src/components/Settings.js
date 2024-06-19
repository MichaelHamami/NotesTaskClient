import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import useUser from 'hooks/useUser';
import BaseHeader from 'components/baseComponents/BaseHeader';
import ClickableIcon from 'components/baseComponents/ClickableIcon';
import {useLabelsContext} from 'context/LabelsContext/label.context';
import OptionsModal from './Modals/OptionsModal';
import {updateUserInfo} from 'api/user.api';
import {addUser} from 'redux/actions/user.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from 'MyConstants';

function Settings({navigation}) {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const {userInfo, backIconName} = useUser();
  const [languageModal, setLanguageModal] = useState(false);
  const languageText = getLanguageText();

  const languageOptions = Object.keys(labels.languageNameByCode).map(key => {
    return {
      key,
      label: labels.languageNameByCode[key],
    };
  });

  const handlePress = () => {
    navigation.goBack();
  };

  function getLanguageText() {
    const hasUserLanguage = userInfo.languageCode !== null && userInfo.languageCode !== undefined;
    if (hasUserLanguage) {
      return labels.languageNameByCode[userInfo?.languageCode];
    }
    return labels.phoneLanguage;
  }

  const handleLanguageSelect = option => {
    setLanguageModal(false);
    updateUserInfoAction({languageCode: Number(option.key)});
  };

  const handleCloseLanguageModal = () => {
    setLanguageModal(false);
  };

  const updateUserInfoAction = async userInfo => {
    try {
      const user = await updateUserInfo(userInfo);
      dispatch(addUser(user));
      const valueToLocal = String(user.languageCode);
      await AsyncStorage.setItem(Constant.USER_LANGUAGE_KEY, valueToLocal);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BaseHeader>
        <ClickableIcon iconName={backIconName} iconColor={'white'} onPress={handlePress} />
        <Text style={{color: 'white'}}>{labels.settings}</Text>
      </BaseHeader>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text>{labels.language}</Text>
          <TouchableOpacity onPress={() => setLanguageModal(true)}>
            <Text>{languageText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <OptionsModal
        options={languageOptions}
        title={labels.language}
        onSelectedOption={handleLanguageSelect}
        visible={languageModal}
        closeModal={handleCloseLanguageModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    gap: 20,
  },
});

export default Settings;
