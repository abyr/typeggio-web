const LEVELS_DEFINITION_MAP = {
  expert: {
    title: 'Expert',
    ratio: 1,
    code: 'expert'
  },
  proficient: {
    title: 'Proficient',
    ratio: 0.8,
    code: 'proficient'
  },
  competent: {
    title: 'Competent',
    ratio: 0.6,
    code: 'competent'
  },
  advanced_beginner: {
    title: 'Advanced beginner',
    ratio: 0.4,
    code: 'advanced-beginner'
  },
  novice: {
    title: 'Novice',
    ratio: 0.2,
    code: 'novice'
  },
  fail: {
    title: 'Failed',
    ratio: 0,
    code: 'failed'
  }
};

const averageWpm = 44;

function getLevel({
  misprintsCount,
  wordsPerMinute
}) {
  const accuracyRatio = countAccuracyRatio(misprintsCount);
  const speedRatio = countSpeedRatio(wordsPerMinute);

  const criterias = [accuracyRatio, speedRatio];
  const sumOfCriterias = criterias.reduce((sum, x) => sum + x, 0);

  const ratio = sumOfCriterias / criterias.length;

  if (ratio <= 0) {
    return Object.assign({}, LEVELS_DEFINITION_MAP.fail);
  } else {
    return Object.assign({}, Object.values(LEVELS_DEFINITION_MAP).find(x => x.ratio <= ratio));
  }
}

function countAccuracyRatio(misprintsCount) {
  return 1 - misprintsCount / 10;
}

function countSpeedRatio(wpm) {
  const wpmRatio = wpm / averageWpm;

  if (wpmRatio > 1) {
    return 1;
  } else {
    return wpmRatio;
  }
}

export default { getLevel };
