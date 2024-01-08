import Carousel from "react-native-reanimated-carousel";

const DATA = ["Day 1", "Day 2", "Day 3", "Day 4"];

import { Dimensions } from "react-native";
import React from "react";

import CarouselItem from "./CarouselItem";

export default function CarouselDays({ currentDay, setCurrentDay }){

  const [loop, setLoop] = React.useState(false);
  const r = React.useRef(null);

  return (
    <Carousel
      key={`${loop}`}
      ref={r}
      loop={false}
      onSnapToItem={(index) => setCurrentDay(index)}
      style={{
        width: Dimensions.get("window").width,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
      width={90}
      height={80}
      data={DATA}
      renderItem={({ item, animationValue }) => {
        return (
          <CarouselItem
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
  )
}