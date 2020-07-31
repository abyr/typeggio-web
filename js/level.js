const LEVELS_DEFINITION_MAP = {
  expert: {
    title: 'Expert',
    ratio: 1,
    color: 'green'
  },
  proficient: {
    title: 'Proficient',
    ratio: 0.8,
    color: 'green'
  },
  competent: {
    title: 'Competent',
    ratio: 0.6,
    color: 'blue'
  },
  advanced_beginner: {
    title: 'Advanced beginner',
    ratio: 0.4,
    color: 'yellow'
  },
  novice: {
    title: 'Novice',
    ratio: 0.2,
    color: 'yellow'
  },
  fail: {
    title: 'Failed',
    ratio: 0,
    color: 'red'
  }
};

const averageWpm = 44;

function getLevel(stats) {
  const accuracyRatio = 1 - stats.totalErrors / 10;
  const speedRatio = countSpeedRatio(stats.wpm);

  const criterias = [accuracyRatio, speedRatio];
  const sumOfCriterias = criterias.reduce((sum, x) => sum + x, 0);

  const ratio = sumOfCriterias / criterias.length;

  if (ratio <= 0) {
    return LEVELS_DEFINITION_MAP.fail;
  } else {
    return Object.values(LEVELS_DEFINITION_MAP).find(x => x.ratio <= ratio);
  }
}

function countAccuracyRatio(errors) {
  return 1 - stats.totalErrors / 10;
}

function countSpeedRatio(wpm) {
  const wpmRatio = wpm / averageWpm;

  if (wpmRatio > 1) {
    return 1;
  } else {
    return wpmRatio;
  }
}

module.exports = { getLevel };
