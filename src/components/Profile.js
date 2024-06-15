import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useUser from '../hooks/useUser';
import BaseHeader from './baseComponents/BaseHeader';
import ClickableIcon from './baseComponents/ClickableIcon';
import {useLabelsContext} from '../context/LabelsContext/label.context';

function Profile({navigation}) {
  const labels = useLabelsContext();
  const {userInfo, backIconName} = useUser();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <BaseHeader>
        <ClickableIcon iconName={backIconName} iconColor={'white'} onPress={handlePress} />
        <Text style={{color: 'white'}}>{labels.profile}</Text>
      </BaseHeader>

      <View style={styles.content}>
        <Text>{userInfo?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

export default Profile;
