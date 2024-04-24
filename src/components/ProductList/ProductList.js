import React, {useState} from 'react';
import {View, useWindowDimensions, TouchableOpacity, Text, StyleSheet, StatusBar, Animated} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useLabelsContext} from '../../context/LabelsContext/label.context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

const renderScene = SceneMap({
  shoppingList: FirstRoute,
  productList: SecondRoute,
});

function ProductList() {
  const layout = useWindowDimensions();
  const labels = useLabelsContext();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'shoppingList', title: labels.shoppingList, iconName: 'shopping-cart'},
    {key: 'productList', title: labels.productList, iconName: 'bars'}, //TODO: change to better icon
  ]);

  const onPlusPress = () => {
    console.log('onPlusPress clicked');
  };

  const onMenuPress = () => {
    console.log('onMenuPress pressed');
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white', height: 4}}
      renderLabel={({route, focused}) => <Text style={{color: focused ? 'white' : 'black'}}>{route.title}</Text>}
      renderIcon={({route, color}) => <Icon name={route.iconName} color={color} size={20} />}
      style={styles.tabBar}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.sideButtons} onPress={onPlusPress}>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{labels.myLists}</Text>
        <TouchableOpacity style={styles.sideButtons} onPress={onMenuPress}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#183153',
  },
  sideButtons: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBar: {
    backgroundColor: '#183153',
  },
});

export default ProductList;
