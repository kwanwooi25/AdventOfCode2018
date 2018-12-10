const input = require('./input');

const mapRecords = inputArray => {
  const records = {};
  let guardId = '';
  let asleepAt = 0;

  inputArray.forEach(timestamp => {
    const time = timestamp.split('[')[1].split(']')[0];
    const minute = parseInt(time.split(' ')[1].split(':')[1]);
    const memo = timestamp.split(']')[1].trim();
    
    if (memo.includes('begins shift')) {
      guardId = timestamp.split('#')[1].split(' ')[0];
    } else if (memo.includes('falls asleep')) {
      asleepAt = minute;
    } else if (memo.includes('wakes up')) {
      let wakeUpAt = minute;
      records[guardId] = records[guardId] || {};

      for (let i = asleepAt; i < wakeUpAt; i++) {
        records[guardId][i] = (records[guardId][i]) ? records[guardId][i] + 1 : 1;
      }
    }
  });

  return records;
}

const solution01 = () => {
  const inputArray = input.split('\n').sort();
  const records = mapRecords(inputArray);

  let mostSleepyGuard = 0;
  let mostSleepyMinute = 0;
  let maxMinutesAsleep = 0;

  for (guardId in records) {
    let totalMinutesAsleep = 0;

    for (minute in records[guardId]) {
      totalMinutesAsleep += records[guardId][minute];
    }

    if (totalMinutesAsleep >= maxMinutesAsleep) {
      mostSleepyGuard = parseInt(guardId);
      mostSleepyMinute = parseInt(Object.keys(records[guardId]).reduce((prev, current) => {
        return records[guardId][prev] > records[guardId][current] ? prev : current;
      }, 0));
      maxMinutesAsleep = totalMinutesAsleep;
    }
  }

  return mostSleepyGuard * mostSleepyMinute;
}

const solution02 = () => {
  const inputArray = input.split('\n').sort();
  const records = mapRecords(inputArray);

  let mostSleepyMinuteGuard = 0;
  let mostSleepyMinute = 0;
  let mostSleepyMinuteCount = 0;

  for (guardId in records) {
    for (minute in records[guardId]) {
      if (mostSleepyMinuteCount < records[guardId][minute]) {
        mostSleepyMinute = parseInt(minute);
        mostSleepyMinuteGuard = parseInt(guardId);
        mostSleepyMinuteCount = records[guardId][minute];
      }
    }
  }

  return mostSleepyMinuteGuard * mostSleepyMinute;
}

module.exports = [
  solution01(),
  solution02(),
];