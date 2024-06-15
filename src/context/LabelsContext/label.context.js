import React, {useContext, useMemo, useState, useEffect} from 'react';
import useUser from '../..//hooks/useUser';
import {I18nManager} from 'react-native';
import {heb, eng} from '../../languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from '../../constants';

const LabelsContext = React.createContext();

const LabelsContextProvider = ({children}) => {
  const [language, setLanguage] = useState(null);
  const {userInfo} = useUser();

  const labels = useMemo(() => {
    return getPhoneLanguage();
  }, [language, userInfo?.languageCode]);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getLanguage();
      if (lang !== undefined) {
        setLanguage(lang);
      }
    };
    fetchLanguage();
  }, []);

  const getLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem(Constant.USER_LANGUAGE_KEY);
      return language;
    } catch (error) {
      console.error('Error getting language:', error);
    }
  };

  function getPhoneLanguage() {
    if (userInfo?.languageCode == Constant.USER_LANGUAGE.HEB) return heb();
    if (userInfo?.languageCode == Constant.USER_LANGUAGE.ENG) return eng();

    if (language == Constant.USER_LANGUAGE.ENG) return eng();
    if (language == Constant.USER_LANGUAGE.ENG) return eng();

    return I18nManager.isRTL ? heb() : eng();
  }

  return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
};

const useLabelsContext = () => {
  const context = useContext(LabelsContext);

  if (context === undefined) {
    throw new Error('useLabelsContext Error');
  }

  return context;
};

export {LabelsContextProvider, useLabelsContext};
