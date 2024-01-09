import Carousel from "react-native-reanimated-carousel";

import { Dimensions } from "react-native";
import React from "react";

import CarouselItem from "./CarouselItem";

export default function CarouselDays({ currentDay, setCurrentDay, totalDays }){

  const [loop, setLoop] = React.useState(false);
  const r = React.useRef(null);

  const DATA_ = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  const DATA = DATA_.slice(0, totalDays);

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