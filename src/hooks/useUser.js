import {I18nManager} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from 'redux/selectors';
import * as Constant from 'MyConstants';

const useUser = () => {
  const user = useSelector(selectUser);
  const backIconName = getBackIconName();

  function getBackIconName() {
    const language = user?.languageCode;
    if (language !== null || language !== undefined) {
      if (language == Constant.USER_LANGUAGE.HEB) return 'arrow-forward';
      if (language == Constant.USER_LANGUAGE.ENG) return 'arrow-back';
    }

    return I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
  }

  return {userInfo: user, backIconName: backIconName};
};

export default useUser;
