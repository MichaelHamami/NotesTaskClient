import {TouchableOpacity} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const ClickableIcon = ({style, iconName, iconColor, iconSize = 24, iconStyle, onPress = () => {}, isLoading = false}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={isLoading}>
      <IconMaterial name={iconName} size={iconSize} color={iconColor} iconStyle={iconStyle} />
    </TouchableOpacity>
  );
};

export default ClickableIcon;
