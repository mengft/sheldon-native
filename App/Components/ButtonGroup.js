import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { Colors, px2dp } from '../Themes';

const StyledButtonGroup = props => {
  const {
    component,
    buttons,
    onPress,
    selectedIndex,
    containerStyle,
    innerBorderStyle,
    lastBorderStyle,
    buttonStyle,
    textStyle,
    selectedTextStyle,
    selectedBackgroundColor,
    underlayColor,
    activeOpacity,
    onHideUnderlay,
    onShowUnderlay,
    setOpacityTo,
    containerBorderRadius,
    ...attributes
  } = props;

  const Component = component || TouchableHighlight;
  return (
    <View
      style={[styles.container, containerStyle && containerStyle]}
      {...attributes}
    >
      {buttons.map((button, i) => {
        return (
          <Component
            activeOpacity={activeOpacity}
            setOpacityTo={setOpacityTo}
            onHideUnderlay={onHideUnderlay}
            onShowUnderlay={onShowUnderlay}
            underlayColor={underlayColor || '#ffffff'}
            onPress={onPress ? () => onPress(i) : () => {}}
            key={i}
            style={[
              styles.button,
              i < buttons.length - 1 && {
                borderRightWidth: (innerBorderStyle &&
                  innerBorderStyle.width) ||
                  1,
                borderRightColor: (innerBorderStyle &&
                  innerBorderStyle.color) ||
                  Colors.C8,
              },
              i === buttons.length - 1 && {
                ...lastBorderStyle,
                borderTopRightRadius: containerBorderRadius || 0,
                borderBottomRightRadius: containerBorderRadius || 0,
              },
              selectedIndex === i && {
                backgroundColor: selectedBackgroundColor || Colors.C8,
              },
            ]}
          >
            <View style={[styles.textContainer, buttonStyle && buttonStyle]}>
              {button.element
                ? <button.element />
                : <Text
                    style={[
                      styles.buttonText,
                      textStyle && textStyle,
                      selectedIndex === i && { color: Colors.CB },
                      selectedIndex === i && selectedTextStyle,
                    ]}
                  >
                    {button}
                  </Text>}
            </View>
          </Component>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    height: px2dp(52),
    width: px2dp(542),
    alignSelf: 'center',
    backgroundColor: Colors.CB,
    borderColor: Colors.C8,
  },
  buttonStyle: { borderRadius: 6 },
  buttonText: {
    fontSize: px2dp(24),
    color: Colors.C8,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
  },
});

StyledButtonGroup.propTypes = {
  button: PropTypes.object,
  component: PropTypes.any,
  onPress: PropTypes.func,
  buttons: PropTypes.array,
  containerStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  selectedTextStyle: Text.propTypes.style,
  underlayColor: PropTypes.string,
  selectedIndex: PropTypes.number,
  activeOpacity: PropTypes.number,
  onHideUnderlay: PropTypes.func,
  onShowUnderlay: PropTypes.func,
  setOpacityTo: PropTypes.any,
  innerBorderStyle: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number,
  }),
  lastBorderStyle: PropTypes.oneOfType([
    View.propTypes.style,
    Text.propTypes.style,
  ]),
  buttonStyle: View.propTypes.style,
  selectedBackgroundColor: PropTypes.string,
  containerBorderRadius: PropTypes.number,
};

export default StyledButtonGroup;