import { Pressable } from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import React from "react";


export default function CarouselItem(props) {
  const { animationValue, label, onPress } = props;
 
  const translateY = useSharedValue(0);
 
  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
 
    return {
      opacity,
    };
  }, [animationValue]);
 
  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );
 
    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#fff", "#fff", "#fff"],
    );
 
    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);
 
  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);
 
  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);
 
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#323743",
            width: "80%",
            borderRadius: 14,
          },
          containerStyle,
        ]}
      >
        <Animated.Text
          style={[{ fontSize: 20, color: "#fff" }, labelStyle]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
 