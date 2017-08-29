import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ViewPropTypes,
  Platform,
} from 'react-native';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { line, curveCatmullRom, area } from 'd3-shape';
import Svg, {
  Path,
  Line,
  G,
  Rect,
  Circle,
  Text as SvgText,
  LinearGradient,
  Defs,
  Stop,
} from 'react-native-svg';
import { getLevelInfoByValue, getConstraintedHeight } from '../Utils/Chart';
import { Colors } from '../Themes';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const { width: ww} = Dimensions.get('window');

const fontDefault = {
  fontFamily: 'DIN-Medium',
};


const getIntUnitW = (width, dotsPerPage, horizontalPadding) => {
  const unitW = Math.round((width - horizontalPadding * 2 ) / (dotsPerPage - 1));
  return {
    unitW,
    horizontalPadding: (width - ( dotsPerPage - 1 ) * unitW) / 2
  };
};

const getVerticalPadding = (type) => {
  if (type === 'bar') {
    return { paddingTop: 40, paddingBottom: 10 };
  }
  return { paddingTop: 50, paddingBottom: 20 };
};

export default class Chart extends Component {

  static defaultProps = {
    initialSelected: 0,
    type: 'line',
    data: [],
    dotsPerPage: 7,
    onSelect: () => {},
    horizontalPadding: 25,
    style: {},
    visible: true,
    onScrollToPrev: () => {},
    onScrollToNext: () => {},
    standardType: 2,
  }
  constructor(props) {
    super(props);
    const { unitW, horizontalPadding } = getIntUnitW(ww, props.dotsPerPage, props.horizontalPadding);
    const { paddingTop, paddingBottom } = getVerticalPadding(props.type);
    this.state = {
      selected: props.initialSelected,
      preSelected: props.initialSelected,
      fadeInOpacity: new Animated.Value(1),
      width: ww,
      height: getConstraintedHeight(ww, [750, 390]),
      unitW,
      horizontalPadding,
      paddingTop,
      paddingBottom,
    };
    this.onScroll = this.onScroll.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onResponderRelease = this.onResponderRelease.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.scrollX = 0;
    this.scrollingToPrev = false;
    this.scrollingToNext = false;
  }
  componentDidMount() {
    setTimeout(() => {
      this.scrollBy(this.state.selected);
    }, 100);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      setTimeout(() => this.scrollBy(this.state.selected), 100);
    }
    if (nextProps.type !== this.props.type) {
      const { paddingTop, paddingBottom } = getVerticalPadding(nextProps.type);
      this.setState({
        paddingTop,
        paddingBottom,
      });
    }
    if (nextProps.dotsPerPage !== this.props.dotsPerPage) {
      const { unitW, horizontalPadding } = getIntUnitW(this.state.width, nextProps.dotsPerPage, this.props.horizontalPadding);
      this.setState({
        unitW,
        horizontalPadding,
      });
    }
    if (nextProps.initialSelected !== this.props.initialSelected && nextProps.initialSelected !== this.state.selected) {
      this.setState({
        selected: nextProps.initialSelected,
      });
      setTimeout(() => this.scrollBy(this.state.selected), 100);
    }
  }
  onLayout(e) {
    const customW = e.nativeEvent.layout.width;
    if (customW !== ww) {
      const { unitW, horizontalPadding } = getIntUnitW(customW, this.props.dotsPerPage, this.props.horizontalPadding);
      this.setState({
        width: customW,
        height: getConstraintedHeight(customW, [750, 390]),
        unitW,
        horizontalPadding,
      });
    }
  }
  onScroll(e) {
    const { unitW, horizontalPadding, width } = this.state;
    const { data, onScrollToPrev, onScrollToNext, dotsPerPage } = this.props;
    this.scrollX = e.nativeEvent.contentOffset.x;
    if (this.scrolledBy) {
      this.scrolledBy = false;
      return;
    }
    if (!this.scrollingToPrev && this.scrollX < -20) {
      this.scrollingToPrev = true;
      onScrollToPrev();
      return;
    }
    if (!this.scrollingToNext && !this.scrollingToPrev ) {
      if (data.length <= dotsPerPage && this.scrollX > 20) {
        this.scrollingToNext = true;
        onScrollToNext();
        return;
      }
      if (this.scrollX > unitW * (data.length - 1) + 2 * horizontalPadding + 20 - ww) {
        this.scrollingToNext = true;
        onScrollToNext();
      }
    }
  }
  onPress(e) {
    this.setSelect(this.scrollX + e.nativeEvent.pageX);
  }
  onMomentumScrollEnd(e) {
    const { unitW, horizontalPadding, width } = this.state;
    const { data, dotsPerPage } = this.props;
    this.scrollX = e.nativeEvent.contentOffset.x;
    if (Date.now() - this.panScrollEndTime < 100) {
      this.setSelect(this.scrollX + this.releaseX);
    }
    if (this.scrollX === 0) {
      this.scrollingToPrev = false;
    }
    if (data.length > dotsPerPage && this.scrollX === unitW * (data.length - 1) + 2 * horizontalPadding - ww) {
      this.scrollingToNext = false;
    }
    if (data.length <= dotsPerPage && this.scrollingToNext === true && this.scrollX === 0 ) {
      this.scrollingToNext = false;
    }
  }
  onResponderRelease(e) {
    this.releaseX = e.nativeEvent.pageX;
    this.panScrollEndTime = Date.now();
  }
  onScrollToStart() {
    this.state.fadeInOpacity.setValue(0);
    this.startFadeIn();
  }
  onScrollToEnd() {
    this.setState({ preSelected: -1 });
  }
  setSelect(x) {
    const { unitW, horizontalPadding } = this.state;
    const { data, onSelect } = this.props;
    let n;
    if (x < 0) {
      n = 0;
    } else {
      n = (x - horizontalPadding) / unitW;
      n = Math.min(data.length - 1, Math.round(n));
    }
    n = parseInt(n);
    if (n <= data.length - 1 && n >= 0) {
      if (this.state.selected !== n) {
        this.setState({ selected: n }, () => {
          onSelect(n, data[n]);
        });
      } else {
        onSelect(n, data[n]);
      }
    }
  }
  getLineArea(type = 'line') {
    const { paddingTop } = this.state;
    let curveLine;
    if (type === 'line' || type === 'evlLine') {
      // 空数据连线
      curveLine = line()
        .curve(curveCatmullRom.alpha(1))
        .defined(() => true)
        .x((d, i) => this.xlinear(i))
        .y(d => this.ylinear(d.value));
    } else {
      // 空数据不连线
      curveLine = line()
        .curve(curveCatmullRom.alpha(1))
        .defined(d => d.value)
        .x((d, i) => this.xlinear(i))
        .y(d => this.ylinear(d.value));
    }
    const areaValue = area()
      .curve(curveCatmullRom.alpha(1))
      .defined(curveLine.defined())
      .x(curveLine.x())
      .y1(curveLine.y())
      .y0(this.ylinear(0) + paddingTop);

    return {
      curveLine,
      areaValue,
    };
  }
  ylinear(value) {
    const { height, paddingTop, paddingBottom } = this.state;
    const { data } = this.props;
    if (!max(data, d => d.value)) {
      return scaleLinear()
        .domain([9, 0])
        .range([0, height - paddingBottom - paddingTop])(value);
    }
    return scaleLinear()
        .domain([max(data, d => d.value), 0])
        .range([0, height - paddingBottom - paddingTop])(value);
  }
  xlinear(value) {
    const { unitW } = this.state;
    const { data } = this.props;
    return scaleLinear()
        .domain([0, data.length - 1])
        .range([0, unitW * (data.length - 1)])(value);
  }
  yreverselinear(value) {
    const { height, paddingTop, paddingBottom } = this.state;
    const { data } = this.props;
    return scaleLinear()
        .domain([0, max(data, d => d.value || 0)])
        .range([paddingBottom, (height - paddingTop)])(value);
  }
  ySelectedlinear(value) {
    const { height, paddingTop, paddingBottom } = this.state;
    const { data } = this.props;
    return scaleLinear()
        .domain([0, max(data, d => d.value || 0)])
        .range([paddingBottom + ((height - (paddingTop - paddingBottom)) / 5), (height - paddingTop)])(value);
  }
  startFadeIn() {
    setTimeout(() => {
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 1,
        duration: 200,
      }).start();
    }, 0);
  }
  scrollBy(index) {
    const { unitW, width, horizontalPadding } = this.state;
    const { data, dotsPerPage } = this.props;
    if (this.scrollView && this.scrollView.scrollTo) {
      if (data.length <= dotsPerPage) {
        return;
      } else {
        this.scrollView && this.scrollView.scrollTo({
          x: Math.max((unitW * index) + ((2 * horizontalPadding) - width), 0),
          y: 0,
          animated: false,
        });
      }
      Platform.OS === 'ios' && (this.scrolledBy = true);
    }
  }
  renderValues() {
    const { unitW, height, paddingTop } = this.state;
    const { data, type, standardType } = this.props;
    if (type === 'line' || type === 'breakline' || type === 'evlLine') {
      const { curveLine, areaValue } = this.getLineArea(this.props.type);
      return (
        <G key="values">
          <Path
            stroke="none"
            strokeWidth={2}
            d={areaValue(data) || ""}
            fill={'url(#gradArea)'}
          />
          <Path
            stroke="#fff"
            strokeWidth={2}
            d={curveLine(data) || ""}
            fill="none"
          />
          {
            this.props.data.map((v, i) => (v.value ? <Circle
              key={i}
              r="5"
              cx={i * unitW}
              cy={this.ylinear(v.value)}
              stroke="#fff"
              fill={getLevelInfoByValue(v.value, standardType).color}
              strokeWidth="1.5"
            />
            : null
            ))
          }
          {this.props.data.map((d, i) => (
            <G
              key={i}
              translate={`${unitW * i},${height - paddingTop}`}
            >
              <Circle cx={0} cy={0} r="2.5" strokeWidth={1} fill="#fff" />
              <SvgText fill="#fff" y={-20} x={0} fontSize={12} textAnchor="middle" fontFamily={fontDefault.fontFamily}>
                {d.date}
              </SvgText>
              {this.renderSelected(d, i)}
            </G>
          ))}
        </G>
      );
    }
    return (
      <G>
        {data.map((d, i) => (
          <G
            key={i}
            translate={`${unitW * i},${height - paddingTop}`}
          >
            {this.renderSelected(d, i)}
          </G>
        ))}
        <G key="values" translate={`0, ${height - paddingTop}`}>
          {
            data.map((v, i) => (v.value
            ? <Rect
              key={i}
              x={(i * unitW) - 5}
              y={-this.yreverselinear(v.value)}
              height={this.yreverselinear(v.value)}
              width={10}
              fill="url(#valueBar)"
            />
            : null))
          }
        </G>
        {data.map((d, i) => (
          <G
            key={i}
            translate={`${unitW * i},${height - paddingTop}`}
          >
            <Circle cx={0} cy={0} r="2.5" strokeWidth={1} fill="#fff" />
            <SvgText fill="#fff" y={-20} x={0} fontSize={12} textAnchor="middle" fontFamily={fontDefault.fontFamily}>
              {d.date}
            </SvgText>
          </G>
        ))}
      </G>
    );
  }
  renderSelected(d, i) {
    const { selected, paddingBottom, paddingTop, height, fadeInOpacity } = this.state;
    const { type, data } = this.props;
    const barSelectedY = paddingBottom + ((height - (paddingTop - paddingBottom)) / 5);
    if (type === 'line' || type === 'breakline') {
      return (
        <G>
          {i === selected &&
          <AnimatedRect
            fillOpacity={fadeInOpacity}
            x={-8}
            y={-this.ySelectedlinear(d.value)}
            height={this.ySelectedlinear(d.value)}
            width={16}
            fill={'url(#gradSelectedBar)'}
          />}
          {i === selected &&
            d.value !== null &&
            <AnimatedSvgText
              fill="#fff"
              fillOpacity={fadeInOpacity}
              y={-this.yreverselinear(d.value) - 53}
              x={i === data.length-1 ? 10 : 0}
              fontSize={28}
              textAnchor={i === data.length-1 ? 'end' : (i === 0 ? 'start' : 'middle')}
              fontFamily={fontDefault.fontFamily}
            >
              {d.value.toFixed(1)}
            </AnimatedSvgText>}
          {i === selected &&
            d.value !== null &&
            <AnimatedSvgText
              fill="#fff"
              fillOpacity={fadeInOpacity}
              y={-this.yreverselinear(d.value) - 23}
              x={i === data.length-1 ? 10 : 0}
              textAnchor={i === data.length-1 ? 'end' : (i === 0 ? 'start' : 'middle')}
              fontSize={10}
            >
              mmol/L
            </AnimatedSvgText>}
        </G>
      );
    }
    return (
      <G>
        {i === this.state.selected &&
        <AnimatedRect
          fillOpacity={fadeInOpacity}
          x={-11}
          y={d.value ? ( - 10 - height + paddingTop) : -barSelectedY}
          height={d.value ? height : barSelectedY}
          width={22}
          fill="url(#gradSelectedBar)"
        />}
        {i === selected &&
          d.value !== null &&
          <AnimatedSvgText
            fill="#fff"
            fillOpacity={fadeInOpacity}
            y={-this.yreverselinear(d.value) - 36}
            x={-5}
            fontSize={20}
            fontFamily={fontDefault.fontFamily}
            textAnchor={i === 0 ? 'start' : 'end'}
          >
            { type === 'evlLine' ? (d.value < 10 ? d.value.toFixed(1) : d.value.toFixed(0)) : d.value}
          </AnimatedSvgText>}
        {i === selected &&
          d.value !== null &&
          <AnimatedSvgText
            fill="#fff"
            fillOpacity={fadeInOpacity}
            y={-this.yreverselinear(d.value) - 28}
            x={i === 0 ? (d.value < 10 ? 25 : 20) : 10}
            fontSize={12}
            fontWeight="bold"
            textAnchor={i === 0 ? 'start' : 'end'}
          >
            { type === 'evlLine' ? '%' : '次'}
          </AnimatedSvgText>}
      </G>
    );
  }
  render() {
    const { selected, unitW, width, height, horizontalPadding, paddingTop } = this.state;
    const { data, type, dotsPerPage, style, visible = true, standardType } = this.props;
    const chartWidth = unitW * (Math.max(data.length - 1, dotsPerPage - 1 )) + 2 * horizontalPadding;
    const topLine = standardType === 2 ? 10 : 7.7;
    return (
      <View
        style={[{
          width,
          height,
          backgroundColor: Colors.CB,
          overflow: 'hidden',
        }, style, !visible && { display: 'none' }]}
      >
        {(type === 'line' || type === 'breakline') && <Svg
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <G translate={`0,${paddingTop}`}>
            <Line
              x1="0"
              y1={this.ylinear(topLine)}
              x2={width}
              y2={this.ylinear(topLine)}
              strokeWidth="0.5"
              stroke="#7fbcff"
              strokeDasharray={[3, 2]}
            />
            <Line
              x1="0"
              y1={this.ylinear(4.4)}
              x2={width}
              y2={this.ylinear(4.4)}
              strokeWidth="0.5"
              stroke="#7fbcff"
              strokeDasharray={[3, 2]}
            />
            <SvgText fill="#fff" y={this.ylinear(topLine)} x={2} fontSize={9}>{topLine}</SvgText>
            <SvgText fill="#fff" y={this.ylinear(4.4)} x={2} fontSize={9}>
              4.4
            </SvgText>
          </G>
        </Svg>
        }
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          style={{
            width,
            height,
          }}
          horizontal
          keyboardDismissMode="on-drag"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onResponderRelease={this.onResponderRelease}
        >
          <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
            <Svg width={chartWidth} height={height}>
              <G translate={`${horizontalPadding},${paddingTop}`}>
                <Defs>
                  {data.length !== 0 && <LinearGradient id="gradArea" x1="0%" y1="0%" x2="0%" y2="1000">
                    <Stop offset="5%" stopColor="#036dfb" stopOpacity="0.6" />
                    <Stop offset="10%" stopColor="#036dfb" stopOpacity="0.02" />
                  </LinearGradient>
                  }
                  <LinearGradient id="gradBar" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    <Stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                  </LinearGradient>
                  <LinearGradient
                    id="gradSelectedBar"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    <Stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                  </LinearGradient>
                  <LinearGradient
                    id="valueBar"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <Stop offset="70%" stopColor="#ff882a" stopOpacity="1" />
                    <Stop offset="0%" stopColor="#ffbb2a" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                {this.renderValues()}
              </G>
            </Svg>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

Chart.propTypes = {
  initialSelected: PropTypes.number,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  dotsPerPage: PropTypes.number,
  horizontalPadding: PropTypes.number,
  onSelect: PropTypes.func,
  visible: PropTypes.bool,
  style: ViewPropTypes.style,
  onScrollToPrev: PropTypes.func,
  onScrollToNext: PropTypes.func,
  standardType: PropTypes.number,
};
