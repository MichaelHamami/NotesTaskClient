import React, {useContext, useMemo} from 'react';
import {heb, eng} from '../../languages';
import {I18nManager} from 'react-native';

const LabelsContext = React.createContext();

const LabelsContextProvider = ({children}) => {
  const labels = useMemo(() => {
    // TODO: get by user settings
    return getPhoneLanguage();
  }, []);

  return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
};

const getPhoneLanguage = () => {
  return I18nManager.isRTL ? heb() : eng();
};

const useLabelsContext = () => {
  const context = useContext(LabelsContext);

  if (context === undefined) {
    throw new Error('useLabelsContext Error');
  }

  return context;
};

export {LabelsContextProvider, useLabelsContext};
