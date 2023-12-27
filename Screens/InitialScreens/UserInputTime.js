import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import TopNavigationBar from '../../components/TopNavigationBar';

import { InitialScreensContext } from '../../context/InitialScreensContext';

import React, { useState, useContext } from 'react';

export default function UserInputTime({ navigation }) {

  const { setExerciseDuration } = useContext(InitialScreensContext);

  const [value, onChangeText] = useState('3');
  const [realTime, setRealTime] = useState('3h 0min');

  const progress = useSharedValue(1.5);
  const min = useSharedValue(0.25);
  const max = useSharedValue(5);

  const valueToTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    setRealTime(`${hours}h ${minutes}min`);
  }

  const handleContinue = () => {
    setExerciseDuration(realTime);
    navigation.navigate('Acerca de ti (Nivel de fitness)');
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.912} back={true}/>
      <Text style={styles.title}>¿Cuánto tiempo te gustaría estar en el gym?</Text>
      <Text style={{ color: '#0496FF', fontSize: 80, fontWeight: 'normal', marginTop: 8, marginBottom: 8 }}>
        {realTime}
      </Text>
      <Text style={{ color: '#5f5f5f', fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 40 }}>
        Tus entrenamientos durarán {realTime} en promedio
      </Text>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        style={styles.slider}
        step={19}
        onHapticFeedback={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onSlidingComplete={(e) => {
          onChangeText(e);
          valueToTime(e);
        }}
        thumbWidth={14}
        hapticMode={HapticModeEnum.STEP}
        theme={{
          disableMinTrackTintColor: '#ECECEC',
          maximumTrackTintColor: '#ECECEC',
          minimumTrackTintColor: '#0496FF',
          cacheTrackTintColor: '#0496FF',
          bubbleBackgroundColor: '#0496FF',
        }}
      />
      <View style={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{color: 'white'}}>Menos</Text>
        <Text style={{color: 'white'}}>Más</Text>
      </View>
      <Pressable
        style={styles.btn}
        onPress={handleContinue}
      >
        <Text style={styles.btnText}>Continuar</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'white',
    marginBottom: 40,
    marginTop: 0,
    textAlign: 'center',
    width: '85%',
  },

  slider: {
    width: '85%',
    height: 48,
    flex: 0,
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 40,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 4,
  }
});
