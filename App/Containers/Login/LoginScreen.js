import React, { Component } from 'react';
import { View, ActivityIndicator, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN } from '../../Redux/ActionTypes';
import { Colors, px2dp, Metrics} from '../../Themes';
import { DefaultButton } from '../../Components';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { username, password } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.C8,
        }}
      >
        <Text
          style={{
            fontSize: px2dp(48),
            marginTop: 68,
            color: Colors.C2,
          }}
        >
          登录
        </Text>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: px2dp(142),
            width: Metrics.screenWidth - px2dp(120),
            borderTopColor: Colors.C10,
            borderTopWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: Metrics.screenWidth - px2dp(120),
              height: px2dp(100),
              borderBottomColor: Colors.C10,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                borderRightColor: Colors.C10,
                borderRightWidth: px2dp(1),
                height: px2dp(100),
                width: px2dp(160),
              }}
            >
              <Text style={{ fontSize: px2dp(32), color: Colors.C2 }}>
                +86
              </Text>
            </View>
            <TextInput
              placeholder="请填写电话号码"
              placeholderTextColor={Colors.C5}
              selectionColor={Colors.C5}
              onChangeText={username => this.setState({ username })}
              style={{
                flex: 1,
                marginLeft: px2dp(30),
                fontSize: px2dp(32),
                color: Colors.C2,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: Metrics.screenWidth - px2dp(120),
              height: px2dp(100),
              borderBottomColor: Colors.C10,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: px2dp(32),
                color: Colors.C2,
                width: px2dp(160),
              }}
            >
              密码
            </Text>
            <TextInput
              placeholder="请填写密码"
              placeholderTextColor={Colors.C5}
              selectionColor={Colors.C5}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
              style={{
                flex: 1,
                marginLeft: px2dp(30),
                fontSize: px2dp(32),
                color: Colors.C2,
              }}
              returnKeyLabel="go"
              blurOnSubmit
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: Metrics.screenWidth - px2dp(310),
              marginBottom: px2dp(50),
            }}
          >

            <Text
              style={{ fontSize: px2dp(24), color: Colors.C4 }}
            >
              注册
            </Text>
            <Text
              style={{ fontSize: px2dp(24), color: Colors.C4 }}
            >
              密码找回
            </Text>
          </View>
          <DefaultButton
            title="登录"
            style={{
              width: px2dp(540),
              height: px2dp(90),
              marginBottom: px2dp(150),
            }}
            onPress={()=>this.props.loginAction(username, password)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  navigationState: state.rootNav,
  rootNav: state.rootNav,
});

const loginAction = (username, password) => ({
  type: LOGIN,
  payload: {username, password}
})

export default connect(mapStateToProps, {
  loginAction
})(LoginScreen);
