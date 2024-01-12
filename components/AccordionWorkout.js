import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const Accordion = ({ routine_, navigation }) => {

  const [ routine, setRoutine ] = useState(routine_);

  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const [isOpen, setIsOpen] = useState(false);

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              heightValue.value = withTiming(measure(listRef).height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
          setIsOpen(!isOpen);
        }}
        style={styles.viewContainer}>
          <Image 
            source={{ uri: routine.image }}
            style={{width: "100%", height: 200, resizeMode: 'cover', borderRadius: 14}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles.textTitle}>{routine.routineName}</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={styles.routineInfo}>{routine.numberOfDays} days</Text>
          </View>
          <Text style={styles.textTap}>Tap to {isOpen ? 'close' : 'open'}</Text>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <Animated.View style={[styles.content, {opacity: progress}]}>
            {routine.days.map((day, index) => (
              <View style={styles.singleDay} key={index}>
                <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10 }}>{day.dayName}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                  <Text style={styles.routineInfo}>{day.exercises.length} exercises</Text>
                  <Text style={styles.routineInfo}>{day.totalSets} sets</Text>
                  <Text style={styles.routineInfo}>{day.totalCalories} calories</Text>
                  <Text style={styles.routineInfo}>{day.totalDuration} minutes</Text>
                </View>
                {routine.days.exercises && day.exercises.map((exercise, index) => (
                  <View key={index} style={styles.singleExercise}>
                  <Text style={styles.textContent_}>{exercise.name}</Text>
                  <View style={{flexDirection: 'row', justifyContent: '', width: '100%'}}>
                    <Text style={styles.textContent}>{exercise.sets} sets</Text>
                    <Text style={styles.textContent}>{exercise.reps} reps</Text>
                    <Text style={styles.textContent}>{exercise.weight} lbs</Text>
                  </View>
                </View>
                ))}
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonEdit} onPress={() => navigation.navigate('Edit Routine', { routine: routine })}>
                <Text style={{color: 'white'}}>Edit</Text>
              </Pressable>
              <Pressable style={styles.buttonStart} onPress={() => navigation.navigate('Workout In Progress', { routine: routine })}>
                <Text style={{color: 'white'}}>Start</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24262B',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    overflow: 'hidden',
    width: '90%',
  },
  
  textTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  },
  
  viewContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },

  content: {
    padding: 10,
    marginTop: 10,
  },
  
  routineInfo: {
    fontSize: 11,
    color: 'white',
    marginRight: 8,
    marginTop: 5,
  },
  
  textTap: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
    alignSelf: 'flex-end',
  },

  singleDay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  
  singleExercise: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#313231',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  
  textContent_: {
    fontSize: 16,
    color: 'white',
  },

  textContent: {
    fontSize: 12,
    color: 'gray',
    marginRight: 8,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  buttonEdit: {
    width: '48%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  buttonStart: {
    width: '48%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

});
