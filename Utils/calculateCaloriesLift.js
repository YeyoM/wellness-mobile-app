/**
 * @param {number} timeLifting - The time spent lifting in minutes
 * @param {number} userWeight - The user's weight in kg or lbs
 * @param {string} weightUnit - The unit of the user's weight, either "kg" or "lbs"
 * @returns {number} - The number of calories burned
 */
export default function calculateCaloriesLift(
  timeLifting,
  userWeight,
  weightUnit,
  userGender,
) {
  if (timeLifting < 0) {
    throw new Error("timeLifting must be a positive number");
  }

  if (userWeight < 0) {
    throw new Error("userWeight must be a positive number");
  }

  if (weightUnit !== "kg" && weightUnit !== "lbs") {
    throw new Error("weightUnit must be either 'kg' or 'lbs'");
  }

  if (
    userGender !== "Male" &&
    userGender !== "Female" &&
    userGender !== "Other"
  ) {
    throw new Error("userGender must be either 'Male', 'Female' or 'Other'");
  }

  let calories;

  if (weightUnit === "kg") {
    if (userGender === "Female") {
      calories = userWeight * timeLifting * 0.0637;
    } else {
      calories = userWeight * timeLifting * 0.0713;
    }
  } else {
    if (userGender === "Female") {
      calories = userWeight * 0.453592 * timeLifting * 0.0637;
    } else {
      calories = userWeight * 0.453592 * timeLifting * 0.0713;
    }
  }

  return calories;
}
