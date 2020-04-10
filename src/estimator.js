const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = { currentlyInfected: input.reportedCases * 10 };
  const severeImpact = { currentlyInfected: input.reportedCases * 50 };

  const { periodType } = input;
  const { timeToElapse } = input;

  if (periodType === 'months') {
    const days = timeToElapse * 30;
    const factor = parseInt(days / 3, 10);
    impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  } else if (periodType === 'weeks') {
    const days = timeToElapse * 7;
    const factor = parseInt(days / 3, 10);
    impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  } else {
    const days = timeToElapse;
    const factor = parseInt(days / 3, 10);
    impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  }

  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;
  impact.hospitalBedsByRequestedTime = (
    parseInt(0.35 * input.totalHospitalBeds - impact.severeCasesByRequestedTime, 10)
  );
  severeImpact.hospitalBedsByRequestedTime = (
    parseInt(0.35 * input.totalHospitalBeds - severeImpact.severeCasesByRequestedTime, 10)
  );
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
