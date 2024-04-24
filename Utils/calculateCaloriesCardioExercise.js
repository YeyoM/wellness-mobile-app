/**
 * calculateCaloriesCardioExercise
 * @param {number} userWeight - The weight of the user in kg or lbs
 * @param {string} weightUnit - The unit of the user's weight (kg or lbs)
 * @param {string} exerciseName - The name of the exercise
 * @param {number} duration - The duration of the exercise in minutes
 * @param {number} resistanceLevel - The resistance level of the exercise (only for elliptical, stationary bike, and rowing machine)
 * @param {number} incline - The incline level of the exercise (only for treadmill)
 * @param {number} speed - The speed of the exercise (only for treadmill)
 * @returns {number} - The number of calories burned during the exercise
 */
export default function calculateCaloriesCardioExercise(
  userWeight,
  weightUnit,
  exerciseName,
  duration,
  resistanceLevel,
  incline,
  speed,
) {
  if (!userWeight || userWeight < 0) {
    throw new Error("userWeight must be a positive number");
  }

  if (typeof exerciseName !== "string") {
    throw new Error("exerciseName must be a string");
  }

  if (!duration || duration < 0) {
    console.log(duration);
    throw new Error("duration must be a positive number");
  }

  if (!resistanceLevel || resistanceLevel < 0) {
    resistanceLevel = 0;
  }

  if (!incline || incline < 0) {
    incline = 0;
  }

  if (!speed || speed < 0) {
    speed = 0;
  }

  let calories;

  switch (exerciseName) {
    case "Treadmill":
      if (weightUnit === "kg") {
        calories =
          ((speed * 0.1 + speed * 1.8 * (incline / 100)) *
            userWeight *
            duration) /
          60;
      } else {
        calories =
          ((speed * 0.1 + speed * 1.8 * (incline / 100)) *
            userWeight *
            0.453592 *
            duration) /
          60;
      }
      break;
    case "Elliptical":
      if (weightUnit === "kg") {
        calories = (7 * resistanceLevel * userWeight * duration) / 60;
      } else {
        calories =
          (7 * resistanceLevel * userWeight * 0.453592 * duration) / 60;
      }
      break;

    case "Stationary Bike":
      if (weightUnit === "kg") {
        calories = (5 * resistanceLevel * userWeight * duration) / 60;
      } else {
        calories =
          (5 * resistanceLevel * userWeight * 0.453592 * duration) / 60;
      }
      break;

    case "Rowing Machine":
      if (weightUnit === "kg") {
        calories = (6 * resistanceLevel * userWeight * duration) / 60;
      } else {
        calories =
          (6 * resistanceLevel * userWeight * 0.453592 * duration) / 60;
      }
      break;

    default:
      throw new Error("Invalid exercise name");
  }

  return Math.round(calories);
}
