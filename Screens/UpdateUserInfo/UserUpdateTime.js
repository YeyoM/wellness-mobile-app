import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification'; 
import SuccessNotification from '../../components/PrimaryNotification';
import PrimaryNotification from '../../components/SuccessNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

import React, { useState, useContext } from 'react';

export default function UserInputTime({ route, navigation }) {

  const { exerciseTime } = route.params;

  const timeToValue = (time) => {
    console.log(time);
    const hours = parseInt(time.split('h')[0]);
    const minutes = parseInt(time.split('h')[1].split('min')[0]);
    return hours + (minutes / 60);
  }

  const valueToTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    setRealTime(`${hours}h ${minutes}min`);
  }

  const [value, onChangeText] = useState(timeToValue(exerciseTime));
  const [realTime, setRealTime] = useState(exerciseTime);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const progress = useSharedValue(value);
  const min = useSharedValue(0.25);
  const max = useSharedValue(5);

  const handleGuardar = async () => {
    setLoading(true);

    const userRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      await setDoc(userRef, {
        trainingDuration: realTime,
      }, { merge: true });

      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 3000);
      setSuccess('Tiempo de entrenamiento actualizado');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setError('Hubo un error al actualizar tu información');
    }
  }

  const handleCancelar = () => {
    navigation.goBack();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar tiempo de entrenamiento'} />
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
      <Text style={styles.title}>¿Cuánto tiempo te gustaría estar en el gym?</Text>
      <Text style={{ color: '#0496FF', fontSize: 80, fontWeight: 'normal', marginTop: 8, marginBottom: 8 }}>
        {realTime}
      </Text>
      <Text style={{ color: '#A0A0A3', fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 40 }}>
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
      <View style={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
        <Text>Menos</Text>
        <Text>Más</Text>
      </View>
      <Pressable
        style={ loading || success ? styles.btnDisabled : styles.btn }
        onPress={handleGuardar}
        disabled={loading || success}
      >
        <Text style={styles.btnText}>Guardar</Text>
      </Pressable>
      <Pressable
        style={ loading || success ? styles.btnDisabled : styles.btnCancelar }
        onPress={handleCancelar}
        disabled={loading || success}
      >
        <Text style={styles.btnText}>Cancelar</Text>
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
  },

  btnCancelar: {
    width: '85%',
    height: 48,
    backgroundColor: '#FF3333',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },

  btnDisabled: {
    width: '85%',
    height: 48,
    backgroundColor: '#ECECEC',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
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
