import { runTransaction, doc, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

// we need to add the following properties to each exercise object:
/**
  userId 
  exerciseName
  images
  instructions
  level 
  category 
mechanic
force 
muscle 
equipment
oneRepMax
defaultWeightSystem
defaultWeight
defaultRestTime
defaultNumberOfSets
defaultNumberOfReps
*/
const defaultExercises = [
  {
    userId: null,
    exerciseName: "Barbell Bench Press",
    force: "Push",
    level: "Beginner",
    mechanic: "Compound",
    equipment: "Barbell",
    instructions: [
      "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.",
      "After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack.",
    ],
    category: "Strength",
    images: [
      "Barbell_Bench_Press_-_Medium_Grip/0.jpg",
      "Barbell_Bench_Press_-_Medium_Grip/1.jpg",
    ],
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Chest",
    type: "Strength",
    oneRepMax: 0,
    weightRecord: [],
  },

  {
    userId: null,
    exerciseName: "Barbell Squat",
    force: "Push",
    level: "Beginner",
    mechanic: "Compound",
    equipment: "Barbell",
    instructions: [
      "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack to just below shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.",
      "Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.",
      "Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times and also maintain a straight back. This will be your starting position. (Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances discussed in the foot stances section).",
      "Begin to slowly lower the bar by bending the knees and hips as you maintain a straight posture with the head up. Continue down until the angle between the upper leg and the calves becomes slightly less than 90-degrees. Inhale as you perform this portion of the movement. Tip: If you performed the exercise correctly, the front of the knees should make an imaginary straight line with the toes that is perpendicular to the front. If your knees are past that imaginary line (if they are past your toes) then you are placing undue stress on the knee and the exercise has been performed incorrectly.",
      "Begin to raise the bar as you exhale by pushing the floor with the heel of your foot as you straighten the legs again and go back to the starting position.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "Strength",
    images: ["Barbell_Squat/0.jpg", "Barbell_Squat/1.jpg"],
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Legs",
    type: "Strength",
    oneRepMax: 0,
    weightRecord: [],
  },
  {
    userId: null,
    exerciseName: "Barbell Deadlift",
    force: "Pull",
    level: "Intermediate",
    mechanic: "Compound",
    equipment: "Barbell",
    instructions: [
      "Stand in front of a loaded barbell.",
      "While keeping the back as straight as possible, bend your knees, bend forward and grasp the bar using a medium (shoulder width) overhand grip. This will be the starting position of the exercise. Tip: If it is difficult to hold on to the bar with this grip, alternate your grip or use wrist straps.",
      "While holding the bar, start the lift by pushing with your legs while simultaneously getting your torso to the upright position as you breathe out. In the upright position, stick your chest out and contract the back by bringing the shoulder blades back. Think of how the soldiers in the military look when they are in standing in attention.",
      "Go back to the starting position by bending at the knees while simultaneously leaning the torso forward at the waist while keeping the back straight. When the weights on the bar touch the floor you are back at the starting position and ready to perform another repetition.",
      "Perform the amount of repetitions prescribed in the program.",
    ],
    category: "Strength",
    images: ["Barbell_Deadlift/0.jpg", "Barbell_Deadlift/1.jpg"],
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Back",
    type: "Strength",
    oneRepMax: 0,
    weightRecord: [],
  },
  {
    userId: null,
    exerciseName: "Barbell Seated Shoulder Press",
    force: "Push",
    level: "Intermediate",
    mechanic: "Compound",
    equipment: "Barbell",
    instructions: [
      "Sit on a bench with back support in a squat rack. Position a barbell at a height that is just above your head. Grab the barbell with a pronated grip (palms facing forward).",
      "Once you pick up the barbell with the correct grip width, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position.",
      "Lower the bar down to the shoulders slowly as you inhale.",
      "Lift the bar back up to the starting position as you exhale.",
      "Repeat for the recommended amount of repetitions.",
    ],
    images: ["Barbell_Shoulder_Press/0.jpg", "Barbell_Shoulder_Press/1.jpg"],
    category: "Strength",
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Shoulders",
    type: "Strength",
    oneRepMax: 0,
    weightRecord: [],
  },
];

/**
 * saveDefaultExercises
 * @param {string} userId - the user's id
 * @param {object} currentSavedExercises - the user's current saved exercises
 * @returns {object} - the new exercises
 * @throws {Error} - if the exercise is already in the user's exercises or if the exercise object is not valid
 */
export default async function saveDefaultExercises(
  userId,
  currentSavedExercises,
) {
  if (!userId) {
    throw new Error("No user id provided");
  }

  const userRef = doc(FIRESTORE, "users", userId);
  const newExercisesRefs = [];

  const defaultExercisesToAdd = defaultExercises.filter(
    (exercise) =>
      !currentSavedExercises.some(
        (savedExercise) => savedExercise.exerciseName === exercise.exerciseName,
      ),
  );

  for (const exercise of defaultExercisesToAdd) {
    exercise.userId = userId;
    const newExerciseRef = doc(collection(FIRESTORE, "exercises"));
    newExercisesRefs.push(newExerciseRef);
  }

  try {
    const newExercises = await runTransaction(
      FIRESTORE,
      async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const userExercisesIds = userDoc.data().exercises;
        const newExercisesIds = [];
        const newExercises = defaultExercisesToAdd.map((exercise, index) => {
          const newExerciseId = newExercisesRefs[index].id;
          newExercisesIds.push(newExerciseId);
          return {
            ...exercise,
            exerciseId: newExerciseId,
          };
        });
        for (const newExercise of newExercises) {
          console.log(newExercise);
          transaction.set(newExercisesRefs.shift(), newExercise);
        }
        console.log("ADDING DEFAULT EXERCISES SUCCEEDED TRANSACTION");
        const updatedExercises = [...userExercisesIds, ...newExercisesIds];
        transaction.update(userRef, {
          exercises: updatedExercises,
        });
        console.log("UPDATING USER SUCCEEDED TRANSACTION");
        return newExercises;
      },
    );
    console.log("TRANSACTION SUCCEEDED");
    return newExercises;
  } catch (err) {
    console.error("TRANSACTION FAILED: ", err);
    throw new Error(err);
  }
}
