import Carousel from "react-native-reanimated-carousel";

import { Dimensions } from "react-native";
import React from "react";

import CarouselItemReps from "./CarouselItemReps";

export default function CarouselDays({ exercises }) {
  const [loop, _setLoop] = React.useState(false);
  const [allowedExercises, setAllowedExercises] = React.useState([]);
  const r = React.useRef(null);

  if (!exercises) {
    return null;
  }

  React.useEffect(() => {
    const allowed = [
      "Barbell Bench Press",
      "Barbell Deadlift",
      "Barbell Squat",
      "Barbell Seated Shoulder Press",
    ];
    const allowedOneRepMaxes = new Set(allowed);
    const filteredExercises = [];
    exercises.forEach((exercise) => {
      if (allowedOneRepMaxes.has(exercise.exerciseName)) {
        filteredExercises.push(exercise);
      }
    });
    setAllowedExercises(filteredExercises);
  }, [exercises]);

  return (
    <Carousel
      key={`${loop}`}
      ref={r}
      loop={false}
      onSnapToItem={(index) => console.log(index)}
      style={{
        width: Dimensions.get("window").width,
        height: 120,
        marginBottom: 100,
        marginTop: 30,
        marginLeft: 20,
      }}
      width={120}
      height={120}
      data={allowedExercises}
      renderItem={({ item, animationValue }) => {
        return (
          <CarouselItemReps
            animationValue={animationValue}
            label={item}
            onPress={() =>
              r.current?.scrollTo({
                count: animationValue.value,
                animated: true,
              })
            }
          />
        );
      }}
    />
  );
}
