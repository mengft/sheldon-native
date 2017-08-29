import moment from 'moment';

export const GLUCOSE_DETAIL_TYPES = [
  {
    id: 1,
    desc: '早餐前',
    standardType: 1,
    glucType: 'fasting',
  },
  {
    id: 2,
    desc: '早餐后',
    standardType: 2,
    glucType: 'afterMeal',
  },
  {
    id: 3,
    desc: '午餐前',
    standardType: 2,
    glucType: 'beforeMeal',
  },
  {
    id: 4,
    desc: '午餐后',
    standardType: 2,
    glucType: 'afterMeal',
  },
  {
    id: 5,
    desc: '晚餐前',
    standardType: 2,
    glucType: 'beforeMeal',
  },
  {
    id: 6,
    desc: '晚餐后',
    standardType: 2,
    glucType: 'afterMeal',
  },
  {
    id: 7,
    desc: '睡前',
    standardType: 2,
    glucType: 'beforeSleep',
  },
];

export const GLUCOSE_TIME_TYPES = [
  {
    id: 1,
    desc: '日',
    number: 30,
    dotsPerPage: 7,
  },
  {
    id: 2,
    desc: '周',
    number: 52,
    dotsPerPage: 5,
  },
  {
    id: 3,
    desc: '月',
    number: 12,
    dotsPerPage: 5,
  },
];

export const SYMPTOM_TYPES = [
  {
    id: 1,
    desc: '轻度',
  },
  {
    id: 2,
    desc: '中度',
  },
  {
    id: 3,
    desc: '重度',
  },
];

export const BLOOD_GROUP = [
  {
    id: 1,
    name: 'A',
  },
  {
    id: 2,
    name: 'B',
  },
  {
    id: 3,
    name: 'O',
  },
  {
    id: 4,
    name: 'AB',
  },
];

export const GLUCS_TYPES = {
  fasting: 1,
  beforeMeal: 2,
  afterMeal: 3,
  beforeSleep: 4,
};

export const GLUCS_TYPES_ARR = [{
  name: 'fasting',
  title: '空腹平均血糖',
  tab: '空腹',
  standardType: 1,
},
{
  name: 'beforeMeal',
  title: '午晩餐前平均血糖',
  tab: '午晚餐前',
  standardType: 2,
},
{
  name: 'afterMeal',
  title: '餐后平均血糖',
  tab: '餐后',
  standardType: 2,
},
{
  name: 'beforeSleep',
  title: '睡前平均血糖',
  tab: '睡前',
  standardType: 2,
},
];

export const EVALUATION_TYPES = {
  kidneys: {
    desc: '糖尿病肾病',
    standardType: 4,
    id: 1,
  },
  eyes: {
    desc: '糖尿病眼病',
    standardType: 5,
    id: 2,
  },
  hearts: {
    desc: '糖尿病冠心病',
    standardType: 6,
    id: 3,
  },
};
/*
  绘图区域的宽高约束关系
  getConstraintedHeight(Dimensions.width, [720, 380]);
*/
export const getConstraintedHeight = (width, [w, h]) => h * (width / w);

/*
 根据值计算颜色，正常否等信息
 */
export const getLevelInfoByValue = (value, standardType = 2) => {
  if (standardType === 1) { // 空腹血糖
    if (value > 7) {
      return { level: 'high', color: '#ff8d33', desc: '偏高' };
    }
    if (value < 4.4 && value !== null) {
      return { level: 'low', color: '#ff5ba7', desc: '偏低' };
    }
    return { level: 'normal', color: '#94ce58', desc: '正常' };
  } 
  if (standardType === 2) { // 普通血糖
    if (value > 10) {
      return { level: 'high', color: '#ff8d33', desc: '偏高' };
    }
    if (value < 4.4 && value !== null) {
      return { level: 'low', color: '#ff5ba7', desc: '偏低' };
    }
    return { level: 'normal', color: '#94ce58', desc: '正常' };
  }
  if (standardType === 3) { // 低血糖
    return { level: 'normal', color: '#94ce58', desc: '正常' };
  }
  if (standardType === 4) { // 糖尿病肾病风险
  }
  if (standardType === 5) { // 糖尿病眼底病变风险
    // 低0-7.5%  中7.5-15%  高＞15%
    if (value > 15) {
      return { level: 'high', color: '#ff8d33', desc: '高风险' };
    }
    if (value < 7.5 && value !== null) {
      return { level: 'low', color: '#ff5ba7', desc: '低风险' };
    }
  }
  if (standardType === 6) { // 糖尿病冠心病风险
    // 0-15%低风险，15-30%中风险，30%以上高风险
    if (value > 30) {
      return { level: 'high', color: '#ff8d33', desc: '高风险' };
    }
    if (value < 15 && value !== null) {
      return { level: 'low', color: '#ff5ba7', desc: '低风险' };
    }
  }
  return { level: 'normal', color: '#94ce58', desc: '中风险' };
};
/**
 * 首页board绘图处理方法
 *  [{
      "createTime": 0,
      "glucoseId": "string",
      "measureTime": 0,
      "type": 0,
      "updateTime": 0,
      "value": 0
    }]
    填补空值变为
    [{
      "time": "7:30",
      "desc": "早餐前",
      "value": 5.8,
      "type": 1
    }]
 */
const ADVICES = [
  '恭喜，您今天血糖值达标了。坚持您的饮食、运动计划和药物使用，控制血糖就是这么简单。',
  '您今天有血糖超标的数据，是运动少了，还是饮食变化，药物使用是否正确？寻找原因，控制血糖，加油。',
  '您本周内曾发生低血糖。发生低血糖症状时，请尽量详细记录发生的日期、时间、症状、血糖值以及饮食、运动情况等，并及时就医。',
  '请及时录入您的血糖数据，有效管理血糖。',
];

export const getAdviceByBoard = (glucose, lowGlucsTimes) => {
  let advice = [];
  if (!glucose.some(v => v.value !== null) && lowGlucsTimes === 0) {
    advice.push(ADVICES[3]);
    return advice;
  }
  if (!glucose.some(v => v.value !== null) && lowGlucsTimes > 0) {
    advice.push(ADVICES[2]);
    return advice;
  }
  if (glucose.some(v => ((v.type === 1 && getLevelInfoByValue(v.value, 1).level !== 'normal')) || (v.type > 1 && getLevelInfoByValue(v.value, 2).level !== 'normal'))) {
    advice.push(ADVICES[1]);
    if (lowGlucsTimes > 0) {
      advice.push(ADVICES[2]);
    }
  } else {
    if (lowGlucsTimes > 0) {
      advice.push(ADVICES[2]);
    } else {
      advice.push(ADVICES[0]);
    }
  }
  return advice;
};

export const formatBoardGlucoseData = (data) => {
  let obj = {};
  data.forEach((v) => {
    obj[v.type] = {
      value: v.value,
      time: moment(v.measureTime).format('H:mm'),
      desc: GLUCOSE_DETAIL_TYPES[v.type - 1].desc,
      type: v.type,
    };
  });

  return GLUCOSE_DETAIL_TYPES.map((type) => {
    if (obj[type.id]) {
      return obj[type.id];
    }
    return {
      value: null,
      time: '',
      desc: GLUCOSE_DETAIL_TYPES[type.id - 1].desc,
      type: type.id,
    };
  });
};

export const formatBoardLowGlucsData = (data) => {
  if (!data.length) {
    return {
      lowGlucsTimes: 0,
      latestLowGlucsDate: '',
    };
  }
  return {
    lowGlucsTimes: data.length,
    latestLowGlucsDate: moment(data[0].measureTime).format('YYYYMMDD') === moment(Date.now()).format('YYYYMMDD') ? '今天' : moment(data[0].measureTime).format('MM-DD'),
  };
};

export const formatLowGlucsReportData = (data = [], timeType, timeStartNum = 0) => {
  let obj = {};
  const now = Date.now();
  const newData = data === null ? [] : data;
  function getDate(item) {
    if (timeType === 1) {
      return item.startTime === moment(now).startOf('day').valueOf()
        ? '今天'
        : moment(item.startTime).format('M.DD');
    } else if (timeType === 2) {
      return `${moment(item.startTime).format('M.D')}-${moment(item.endTime).format('M.D')}`;
    }
    return moment(item.startTime).format('M月');
  }

  newData.forEach((item) => {
    obj[item.timeNum] = {
      endTime: item.endTime,
      startTime: item.startTime,
      value: item.value
        ? item.value
        : item.measureTimes ? item.measureTimes : null,
    };
  });

  let report = [];
  let day;
  let i;
  let formattedItem;
  for (
    i = GLUCOSE_TIME_TYPES[timeType - 1].number - 1 + timeStartNum;
    i >= timeStartNum;
    i--
  ) {
    if (obj[i]) {
      formattedItem = obj[i];
    } else if (timeType === 1) {
      day = moment(now).subtract(i, 'days');
      formattedItem = {
        endTime: day.endOf('day').valueOf(),
        startTime: day.startOf('day').valueOf(),
        value: null,
      };
    } else if (timeType === 2) {
      day = moment(now).subtract(i, 'week');
      formattedItem = {
        endTime: day.endOf('isoweek').valueOf(),
        startTime: day.startOf('isoweek').valueOf(),
        value: null,
      };
    } else {
      day = moment(now).subtract(i, 'month');
      formattedItem = {
        endTime: day.endOf('month').valueOf(),
        startTime: day.startOf('month').valueOf(),
        value: null,
      };
    }
    formattedItem.date = getDate(formattedItem);
    report.push(formattedItem);
  }
  return report;
};

export const lowGlucsSelectedRange = (startTime, endTime, timeType) => {
  if (timeType === 1) {
    return moment(startTime).format('M月DD日');
  } else if (timeType === 2) {
    return `${moment(startTime).format('M月DD日')}-${moment(endTime).format('M月DD日')}`;
  }
  return moment(startTime).format('M月');
};

function formatEvaluateValueFromRaw(result, evlType) {
  if (evlType === 'kidneys') {
    return result.pWR ? result.pWR : 0;
  }
  if (evlType === 'eyes') {
    return result.risk5 ? result.risk5 : 0;
  }
  return result.rt ? result.rt : 0;
}

export const formatEvaluationReport = (data, evlType) => {
  const newData = data === null ? [] : data.reverse();
  const report = newData.map((v, i) => {
    const result = v.result;
    return {
      date: moment(v.evaluateDate).format('YYYYMMDD')===moment(Date.now()).format('YYYYMMDD') ? '今天' : moment(v.evaluateDate).format('M.DD'),
      value: formatEvaluateValueFromRaw(result, evlType),
      timestamp: v.evaluateDate,
    };
  });
  return report;
};

export const formatEvaluationBarList = (data, evlType) => {
  const newData = data === null ? [] : data;
  const report = newData.map((v, i) => {
    const result = v.result;
    return {
      date: moment(v.createTime).format('YYYYMMDD')===moment(Date.now()).format('YYYYMMDD') ? '今天' : moment(v.createTime).format('M月DD日'),
      value: formatEvaluateValueFromRaw(result, evlType),
      timestamp: v.createTime,
      evaluationId: v.evaluationId,
    };
  });
  return report;
};