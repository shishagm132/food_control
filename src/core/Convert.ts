export default {
  fromKjToKCalories: (kj: number) => Number((kj * 0.239006).toFixed(2)),
  fromKCaloriesToKj: (KCalories: number) => Math.floor(KCalories * 4.184),
};
