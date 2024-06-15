import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import ViewAllProductLists from './ViewAllProductLists';
import ClickableIcon from '../baseComponents/ClickableIcon';
import BaseHeader from '../baseComponents/BaseHeader';
import useUser from '../../hooks/useUser';
import * as Constant from '../../constants';

const {width} = Dimensions.get('window');
const renderScene = SceneMap({
  shoppingList: () => <ViewAllProductLists type={Constant.PRODUCT_LIST_TYPE.SHOPPING} />,
  productList: () => <ViewAllProductLists type={Constant.PRODUCT_LIST_TYPE.HOME} />,
});

function MainProductList({navigation}) {
  const labels = useLabelsContext();
  useUser();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'shoppingList', title: labels.shoppingList, iconName: 'shopping-cart'},
    {key: 'productList', title: labels.productList, iconName: 'list'}, //TODO: change to better icon
  ]);

  const menuItems = [
    {title: labels.profile, iconName: 'person', onPress: () => handleNavigateToScreen('Profile')},
    {title: labels.addCategory, iconName: 'add', onPress: () => handleNavigateToScreen('CreateCategory')},
    {title: labels.settings, iconName: 'settings', onPress: () => handleNavigateToScreen('Settings')},
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuAnimation = useRef(new Animated.Value(width)).current;

  const onPlusPress = () => {
    navigation.navigate('CreateList');
  };

  const onMenuPress = () => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white', height: 4}}
      renderLabel={({route, focused}) => <Text style={{color: focused ? 'white' : 'black'}}>{route.title}</Text>}
      renderIcon={({route, color}) => <IconMaterial name={route.iconName} color={color} size={20} />}
      style={styles.tabBar}
    />
  );

  const handleNavigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const MenuItem = ({menuItem}) => {
    return (
      <TouchableOpacity style={[styles.menuItem]} onPress={menuItem.onPress}>
        <ClickableIcon iconName={menuItem.iconName} onPress={menuItem.onPress} iconColor={'black'} />
        <Text style={styles.menuItemText}>{menuItem.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <BaseHeader>
        <ClickableIcon style={styles.sideButtons} onPress={onMenuPress} iconName={'menu'} iconColor={'white'} iconSize={30} />
        <Text style={styles.title}>{labels.myLists}</Text>
        <ClickableIcon style={styles.sideButtons} onPress={onPlusPress} iconName={'add'} iconColor={'white'} iconSize={30} />
      </BaseHeader>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width}}
        renderTabBar={renderTabBar}
      />
      <Animated.View style={[styles.sideMenu, {transform: [{translateX: menuAnimation}]}]}>
        <View style={styles.menuItems}>
          {menuItems.map((menuItem, index) => (
            <MenuItem menuItem={menuItem} key={index} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideButtons: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBar: {
    backgroundColor: Constant.PRIMARY_COLOR,
  },
  sideMenu: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: '40%',
    height: '100%',
    backgroundColor: 'white',
    padding: 8,
    zIndex: 10,
  },
  menuItems: {
    flexDirection: 'column',
  },
  menuItem: {
    borderBottomWidth: 1,
    height: 50,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  menuItemText: {
    color: Constant.PRIMARY_COLOR,
    fontSize: 10,
  },
});

export default MainProductList;
