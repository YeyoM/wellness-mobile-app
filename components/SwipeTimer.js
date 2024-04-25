import * as React from "react";
import { View, Pressable, Dimensions, Text, Vibration } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";

const PAGE_WIDTH = Dimensions.get("window").width;

export default function SwipeTimer({
  readableTime,
  currentExerciseIndex,
  setShowTimer,
  restTime,
  type,
}) {
  const animationStyle = React.useCallback((value) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
    const translateX = interpolate(value, [-1, 0, 1], [0, 0, PAGE_WIDTH]);

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  const r = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        ref={r}
        onSnapToItem={(index) => {
          if (index === 1) {
            setShowTimer(true);
          } else {
            setShowTimer(false);
          }
        }}
        autoPlay={false}
        style={{ width: PAGE_WIDTH, height: 150 }}
        width={PAGE_WIDTH}
        data={[...new Array(2).keys()]}
        renderItem={({ index, animationValue }) => {
          return (
            <CustomItem
              key={index}
              index={index}
              animationValue={animationValue}
              readableTime={readableTime}
              restTime={restTime}
              currentExerciseIndex={currentExerciseIndex}
              type={type}
            />
          );
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={400}
      />
    </View>
  );
}

const WorkoutProgress = ({ readableTime, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#0b0b0bdd", "#0b0b0b", "#0b0b0bdd"],
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
      <Text
        style={{
          color: "white",
          fontSize: 90,
          marginBottom: 0,
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        {readableTime}
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
        total time
      </Text>
    </View>
  );
};

const Timer = ({ currentExerciseIndex, animationValue, restTime, type }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#0b0b0bdd", "#0b0b0b", "#0b0b0bdd"],
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  const [readableTime, setReadableTime] = React.useState("00:00");
  const [time, setTime] = React.useState(restTime);
  const [isPaused, setIsPaused] = React.useState(true);

  const calculateReadableTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    setReadableTime(formattedTime);
  };

  // if the currentExerciseIndex changes, reset the timer
  // and set the readable time to the rest time
  React.useEffect(() => {
    setTime(restTime);
    setIsPaused(true);
    calculateReadableTime();
  }, [currentExerciseIndex]);

  // Set the readable time when the component mounts
  React.useEffect(() => {
    const minutes = Math.floor(restTime / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    setIsPaused(true);
    setReadableTime(formattedTime);
  }, []);

  // Update the readable time when the time changes
  React.useEffect(() => {
    let interval;

    const handleTick = () => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          setIsPaused(true);
          Vibration.vibrate(1000);
          return restTime; // Assuming restTime is defined somewhere in your component
        }
        return prevTime - 1;
      });
    };

    if (!isPaused) {
      interval = setInterval(handleTick, 1000);
    }

    calculateReadableTime(); // Initial calculation

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [time, isPaused, restTime]);

  const handlePlayPauseTimer = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const handleResetTimer = () => {
    setIsPaused(true);
    setTime(restTime);
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
      <Text
        style={{
          color: "white",
          fontSize: 90,
          marginBottom: 0,
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        {readableTime}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {!isPaused ? (
          <Pressable onPress={handlePlayPauseTimer}>
            <Ionicons name="pause-circle-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable onPress={handlePlayPauseTimer}>
            <Ionicons name="play-circle-outline" size={30} color="white" />
          </Pressable>
        )}
        <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
          {type === "lift" ? "Rest Timer" : "Exercise Timer"}
        </Text>
        <Pressable onPress={handleResetTimer}>
          <Ionicons name="refresh-circle-outline" size={30} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const CustomItem = ({
  currentExerciseIndex,
  index,
  animationValue,
  readableTime,
  restTime,
  type,
}) => {
  if (index === 0) {
    return (
      <WorkoutProgress
        animationValue={animationValue}
        readableTime={readableTime}
      />
    );
  } else {
    return (
      <Timer
        animationValue={animationValue}
        restTime={restTime}
        currentExerciseIndex={currentExerciseIndex}
        type={type}
      />
    );
  }
};
