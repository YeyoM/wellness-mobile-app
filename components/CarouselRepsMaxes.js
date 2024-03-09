import Carousel from "react-native-reanimated-carousel";

import { Dimensions } from "react-native";
import React from "react";

import CarouselItemReps from "./CarouselItemReps";

export default function CarouselDays() {
  const [loop, setLoop] = React.useState(false);
  const r = React.useRef(null);

  //const DATA = [{ day: "Day 1" }, { day: "Day 2" }, { day: "Day 3" }];
  const DATA = [
    { exerciseName: "Bench Press", weight: 100, defaultWeightSystem: "lbs" },
    { exerciseName: "Squat", weight: 200, defaultWeightSystem: "lbs" },
    { exerciseName: "Deadlift", weight: 300, defaultWeightSystem: "lbs" },
  ];

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
      data={DATA}
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
