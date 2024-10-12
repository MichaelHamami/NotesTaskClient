import { ToastAndroid, Platform, Alert } from 'react-native';
import moment from 'moment-timezone';

export function splitStringAtFirstOccurrence(inputString, delimiter) {
  var index = inputString.indexOf(delimiter);
  if (index !== -1) {
    var before = inputString.substring(0, index);
    var after = inputString.substring(index + delimiter.length);
    return [before, after];
  } else {
    return [inputString, ''];
  }
}

export const showToast = (message, isSuccess = true) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(isSuccess ? 'Success' : 'Error', message);
  }
};

export const formattedDateTime = endDate => {
  const israelTime = moment.tz(endDate, 'Asia/Jerusalem').format('YYYY-MM-DD HH:mm');
  return israelTime;
};
