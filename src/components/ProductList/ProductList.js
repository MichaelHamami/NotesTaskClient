import React, {useState} from 'react';
import {View, useWindowDimensions, TouchableOpacity, Text, StyleSheet, StatusBar, Animated} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
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
    {key: 'shoppingList', title: labels.shoppingList},
    {key: 'productList', title: labels.productList},
  ]);

  const onPlusPress = () => {
    console.log('onPlusPress clicked');
  };

  const onMenuPress = () => {
    console.log('onMenuPress pressed');
  };

  const renderTab = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex => (inputIndex === i ? 1 : 0.5)),
          });
          return (
            <TouchableOpacity style={styles.tabItem} onPress={() => setIndex(i)}>
              <Icon name="bars" size={24} color="white" />
              {/* <Text style={styles.title}>{route.title}</Text> */}
              <Animated.Text style={{opacity, color: 'white'}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPlusPress}>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{labels.myLists}</Text>
        <TouchableOpacity style={styles.button} onPress={onMenuPress}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTab}
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
  button: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBar: {
    backgroundColor: '#183153',

    borderBottomColor: '#ccc',
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProductList;
