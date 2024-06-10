export default {
  fromKjToKCalories: (kj: number) => Number((kj * 0.239006).toFixed(2)),
  fromKCaloriesToKj: (KCalories: number) =>
    Number((KCalories * 4.184).toFixed(2)),
};
