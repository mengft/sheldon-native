import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Themes/Colors';

const HeaderRight = ({ navigation, color, onPress, iconName = 'add', text, textStyle, iconStyle, }) => {
  let onPressFunc;
  if (onPress) {
    onPressFunc = () => onPress(navigation);
  } else {
    onPressFunc = () => {};
  }
  return (
    <TouchableOpacity onPress={onPressFunc} style={{ padding: 10, paddingLeft: 20 }} >
      { text ? <Text style={[{ color: Colors.C3, fontSize: 15, marginRight: 5 }, textStyle]}>{text}</Text>
        : <Icon size={13} name={iconName} color={color || Colors.CB} style={[{ right:5 }, iconStyle]} /> }
    </TouchableOpacity>
  );
};

module.exports = HeaderRight;
