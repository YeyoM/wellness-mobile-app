import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSharedValue } from 'react-native-reanimated';
import { Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { useState } from "react";

import TopNavigationBar from "../../components/TopNavigationBar";

export default function SelectWorkoutDuration({ navigation }) {

  const [ value, onChangeText ] = useState('3');
  const [ realTime, setRealTime ] = useState('1:15');
  const [ type, setType ] = useState('Minutes-Hours');

  const progress = useSharedValue(1.25);
  const min = useSharedValue(0.25);
  const max = useSharedValue(3);

  const valueToTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    if (hours === 0) {
      setRealTime(`${minutes}`);
      setType('Minutes');
    }
    else if (minutes === 0) {
      setRealTime(`${hours}`);
      if (hours === 1) {
        setType('Hour');
      }
      else {
        setType('Hours');
      }
    }
    else {
      setRealTime(`${hours}:${minutes}`);
      setType('Minutes-Hours');
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'AI routine maker'} back={true} />
      <View style={styles.content}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>How long do you like your workouts to last?</Text>
        <View style={{ width: '80%', marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="help-circle-outline" size={18} color="#50535B" />
          <Text style={{ color: '#50535B', fontSize: 13, fontWeight: 'bold', textAlign: 'justify', marginLeft: 3 }}>Drag to adjust</Text>
        </View>
        <View style={{ width: '80%', marginBottom: 40, height: 300, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
          <View style={{ transform: [ { rotate: "-90deg" } ], display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', height: 0, width: 240, marginLeft: -110 }}>
            <Slider
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              step={11}
              onHapticFeedback={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onSlidingComplete={(e) => {
                onChangeText(e);
                valueToTime(e);
              }}
              thumbWidth={60}
              hapticMode={HapticModeEnum.STEP}
              theme={{
                disableMinTrackTintColor: '#157AFF',
                maximumTrackTintColor: '#fff',
                minimumTrackTintColor: '#157AFF',
                cacheTrackTintColor: '#fff',
                bubbleBackgroundColor: '#157AFF',
              }}
              markStyle={{
                width: 1,
                height: 10,
                backgroundColor: '#fff',
              }}
              renderBubble={(props) => { return }}
              renderThumb={(props) => {
                return (
                  <Image source={require('../../assets/thumb.png')} style={{ width: 60, height: 60 }} />
                )
              }}
              sliderHeight={10}
            />
          </View>
          <View style={{ marginLeft: -110, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {
              type === 'Minutes-Hours' ?
                (
                  <>
                    <Text style={{ color: '#fff', fontSize: 100, fontWeight: '800', fontStyle: "italic", textAlign: 'justify', alignSelf: "flex-end" }}> {realTime}</Text>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'justify', alignSelf: "flex-end" }}>Minutes</Text>
                  </>
                )
                :
                (
                  <>
                    <Text style={{ color: '#fff', fontSize: 160, fontWeight: '800', fontStyle: "italic", textAlign: 'justify', alignSelf: "flex-end" }}> {realTime}</Text>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'justify', alignSelf: "flex-end" }}>{type}</Text>
                  </>
                )
            }
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('Add Routine')} style={styles.btnContinue}>
          <Text style={styles.btnContinueText}>Continue</Text>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0b0b',
    flex: 1,
    alignItems: 'center'
  },

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn: {
    backgroundColor: '#24262F',
    borderColor: '#24262F',
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 16,
  },

  btnSelected: {
    backgroundColor: '#0496FF',
    borderColor: '#142749',
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 16,
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  btnContinue: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 2,
    width: '85%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 30,
  },

  btnContinueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }

})
