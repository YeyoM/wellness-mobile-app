import React, { useState, useEffect, useRef, useContext } from "react";
import { Dimensions, ActivityIndicator, View } from "react-native";

import Carousel from "react-native-reanimated-carousel";
import CarouselItemReps from "./CarouselItemReps";

import saveDefaultExercises from "../FirebaseFunctions/Exercises/saveDefaultExercises";

import { AppContext } from "../context/AppContext";

export default function CarouselDays() {
  const { firebaseUser, exercises, updateExercises } = useContext(AppContext);

  const [loop, _setLoop] = useState(false);
  const [allowedExercises, setAllowedExercises] = useState(null);
  const [loading, setLoading] = useState(false);

  const r = useRef(null);

  if (!exercises) {
    return null;
  }

  useEffect(() => {
    setLoading(true);
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
    if (filteredExercises.length === 4) {
      console.log("Already saved exercises!");
      setAllowedExercises(filteredExercises);
      setLoading(false);
    } else {
      console.log("Saving default exercises...");
      // in case the user has not saved the exercises yet, add those default exercises automatically
      saveDefaultExercises(firebaseUser.uid, exercises)
        .then((newExercises) => {
          setAllowedExercises(newExercises);
          updateExercises([...exercises, ...newExercises]);
          setLoading(false);
        })
        .catch((error) => {
          // in case of error, just show the exercises that are already saved
          setAllowedExercises(filteredExercises);
          setLoading(false);
          console.error(error);
        });
    }
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : allowedExercises && allowedExercises.length > 0 ? (
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
      ) : allowedExercises && allowedExercises.length === 0 ? (
        <View style={styles.container}>
          <Text>No exercises found</Text>
        </View>
      ) : null}
    </View>
  );
}
