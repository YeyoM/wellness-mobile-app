import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import TopNavigationBar from '../components/TopNavigationBar';
import { useContext } from 'react';

import { InitialScreensContext } from '../context/InitialScreensContext';

import React, { useState } from 'react';

export default function UserInputFrequency({ navigation }) {

  const { setExerciseFrequency } = useContext(InitialScreensContext);

  const [value, onChangeText] = useState('3');

  const progress = useSharedValue(3);
  const min = useSharedValue(1);
  const max = useSharedValue(7);

  const handleContinue = () => {
    setExerciseFrequency(value);
    navigation.navigate('Acerca de ti (Días)');
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.684} back={true}/>
      <Text style={styles.title}>¿Con qué frecuencia te gustaría hacer ejercicio?</Text>
      <Text style={{ color: '#0496FF', fontSize: 80, fontWeight: 'normal', marginTop: 8, marginBottom: 8 }}>
        {value}x
      </Text>
      <Text style={{ color: '#A0A0A3', fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 40 }}>
        {value} entrenamientos por semana
      </Text>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        style={styles.slider}
        step={6}
        onHapticFeedback={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onSlidingComplete={(e) => {
          console.log(e);
          onChangeText(e);
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
        <Text>Menos</Text>
        <Text>Más</Text>
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
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'black',
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
