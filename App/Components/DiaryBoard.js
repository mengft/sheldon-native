/**
 * Created by mengft on 9/06/17
 */
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import { px2dp } from '../Themes/Metrics';
import { Colors } from '../Themes';
import Icon from '../Fonts/iconfont';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(200),
    backgroundColor: '#299dff',
    borderRadius: 6,
  },
});

export default class DiaryBoard extends Component {
  static propTypes = {
    name: PropTypes.string,
    area: PropTypes.string,
    day: PropTypes.string,
    number: PropTypes.number,
    style: ViewPropTypes.style,
    onPress: PropTypes.func,
  };

  render() {
    const { name, area, day, number, style, onPress } = this.props;

    const diaryBoard = (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[styles.container, style]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Icon
              name={name}
              style={{
                color: Colors.C8,
                fontSize: px2dp(60),
                width: px2dp(64),
                height: px2dp(64),
                marginLeft: px2dp(40),
              }}
            />
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginLeft: px2dp(30),
              }}
            >
              <Text style={{ fontSize: px2dp(32), color: Colors.C8 }}>
                今{area}消费
              </Text>
              {number !== 0 && <Text
                style={{
                  fontSize: px2dp(22),
                  color: Colors.C8,
                  marginTop: px2dp(18),
                }}
              >
                本月消费： {day} ¥
              </Text>
              }
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: px2dp(70),
                color: Colors.C8,
                lineHeight: px2dp(71),
              }}
            >
              {number}
            </Text>
            <Text
              style={{
                fontSize: px2dp(26),
                color: Colors.C8,
                marginRight: px2dp(40),
                marginTop: px2dp(22),
              }}
            >
              ¥
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        {diaryBoard}
      </View>
    );
  }
}