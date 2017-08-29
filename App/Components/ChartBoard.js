import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ViewPropTypes } from 'react-native';
import { scaleLinear } from 'd3-scale';
import { arc } from 'd3-shape';
import { max } from 'd3-array';
import Svg, { G, Circle, Text as SvgText, Line, Path } from 'react-native-svg';
import { getLevelInfoByValue, getConstraintedHeight, GLUCOSE_DETAIL_TYPES } from '../Utils/Chart';

const fontDefault = {
  fontFamily: 'DIN-Medium',
};

export default class ChartBoard extends Component {
  static defaultProps = {
    data: [],
    style: {},
    onPress: () => {},
    title: '',
    day: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      width: 360,
      height: 190,
      unitW: 360 / (props.data.length || 1),
    };
    this.marginTop = 70;
    this.marginBottom = 40;
    this.onLayout = this.onLayout.bind(this);
    this.arc = arc()
      .innerRadius(0)
      .outerRadius(2.5)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this.setState({ unitW: this.state.width / (this.props.data.length || 1) });
    }
  }
  onLayout(e) {
    const customW = e.nativeEvent.layout.width;
    this.setState({
      width: customW,
      height: getConstraintedHeight(customW, [720, 380]),
      unitW: customW / (this.props.data.length || 1),
    });
  }
  ylinear(value) {
    const { data } = this.props;
    const { height } = this.state;
    if (!max(data, d => d.value)) {
      return height - this.marginTop - this.marginBottom;
    }
    return scaleLinear()
        .domain([max(data, d => d.value), 0])
        .range([0, height - this.marginTop - this.marginBottom])(value);
  }
  xlinear(value) {
    const { data } = this.props;
    const { unitW } = this.state;
    return scaleLinear()
        .domain([0, data.length - 1])
        .range([0, unitW * (data.length - 1)])(value);
  }
  render() {
    const { unitW, width, height } = this.state;
    const { data, style, onPress, title, day } = this.props;
    console.log(data);
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={[{
            height,
            backgroundColor: '#2994ff',
          }, style]}
          onLayout={this.onLayout}
        >
          <Svg width={width} height={height}>
            <SvgText fill="#fff" y={10} x={10} fontSize={16}>{title}</SvgText>
            <SvgText fill="#fff" y={30} x={10} fontSize={11}></SvgText>
            <SvgText fill="#fff" y={30} x={width - 10} fontSize={11} textAnchor="end">{day}</SvgText>
            <G translate={`0,${this.marginTop}`}>
              <Line
                x1="0"
                y1={this.ylinear(0)}
                x2={width}
                y2={this.ylinear(0)}
                strokeWidth="1"
                stroke="#fff"
              />
            </G>
            <G translate={`${unitW / 2},${this.marginTop}`}>
              {data.map((d, i) => (
                <G
                  key={d.time}
                  translate={`${unitW * i},${height - this.marginTop - this.marginBottom}`}
                >
                  <Path d={this.arc()} fill="#fff" />
                  <SvgText fill="#fff" y={20} x={0} fontSize={9} textAnchor="middle">
                    {d.time}
                  </SvgText>
                  <SvgText fill="#fff" y={6} x={0} fontSize={9} textAnchor="middle">
                    {d.desc}
                  </SvgText>
                </G>
              ))}
              {
                data.map((v, i) => (v.value ? <G key={v.time} key={v.time}><Circle
                  r="5"
                  cx={i * unitW}
                  cy={this.ylinear(v.value)}
                  stroke="#fff"
                  fill='blue'
                  strokeWidth="1.5"
                />
                  <SvgText fill="#fff" y={this.ylinear(v.value) - 26} x={(i * unitW)} fontSize={15} textAnchor="middle" fontFamily={fontDefault.fontFamily}>
                    {v.value}
                  </SvgText>
                </G>
                : null
                ))
              }
            </G>
          </Svg>
        </View>
      </TouchableOpacity>
    );
  }
}

ChartBoard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  title: PropTypes.string,
  day: PropTypes.string,
};