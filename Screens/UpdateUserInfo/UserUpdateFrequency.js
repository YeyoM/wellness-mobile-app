import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import TopNavigationBar from '../../components/TopNavigationBar';

import React, { useState } from 'react';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserUpdateFrequency({ route, navigation }) {

  const { exerciseFrequency } = route.params;

  const [value, onChangeText] = useState(exerciseFrequency);

  const progress = useSharedValue(exerciseFrequency);
  const min = useSharedValue(1);
  const max = useSharedValue(7);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGuardar = async () => {
    setLoading("Guardando...");
    let exerciseFrequency_ = value;

    try {
      await setDoc(doc(FIRESTORE, "users", FIREBASE_AUTH.currentUser.uid), { trainingFrequency: exerciseFrequency_ }, { merge: true });
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 2000);
      setSuccess('Frecuencia de ejercicio actualizada correctamente');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Error al actualizar la frecuencia de ejercicio');
    }
  }

  const handleCancelar = () => {
    // go back
    navigation.goBack();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar frecuencia de entrenamientos'} />
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
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
