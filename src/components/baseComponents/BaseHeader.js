import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Constant from '../../MyConstants';

const BaseHeader = ({children}) => {
  return <View style={[styles.header]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Constant.PRIMARY_COLOR,
  },
});

export default BaseHeader;
