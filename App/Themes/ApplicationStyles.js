import React from 'react';
import { View } from 'react-native';
import Colors from './Colors';

const applicationStyles = {
  defaultHeaderStyle: {
    headerStyle: {
      backgroundColor: Colors.C8,
    },
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: 18,
      color: Colors.C1,
    },
    headerLeft: (<View></View>),
    headerRight: (<View></View>),
  },
  blueHeaderStyle: {
    headerStyle: {
      backgroundColor: Colors.CB,
      shadowColor: 'transparent',
      shadowRadius: 0,
      elevation: 0,
      shadowOffset: { height: 0 },
    },
    headerTitleStyle: {
      color: Colors.C8,
      alignSelf: 'center',
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: 18,
    },
    headerTintColor: Colors.C8,
    headerLeft: (<View></View>),
    headerRight: (<View></View>),
  },
  emptyHeaderStyle: {
    headerStyle: {
      backgroundColor: Colors.C8,
      shadowColor: 'transparent',
      shadowRadius: 0,
      elevation: 0,
      shadowOffset: { height: 0 },
    },
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: 18,
      color: Colors.C1,
    },
  },
  headerLeft: (<View></View>),
  headerRight: (<View></View>),
};

export default applicationStyles;
