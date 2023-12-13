import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function UserUpdateSystem({ route, navigation }) {

  const { system } = route.params;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [metricSystem, setMetricSystem] = useState(false);
  const [imperialSystem, setImperialSystem] = useState(false);

  useEffect(() => {
    if (system === 'Metrico') {
      setMetricSystem(true);
      setImperialSystem(false);
    }

    if (system === 'Imperial') {
      setMetricSystem(false);
      setImperialSystem(true);
    }
  }, []);

  const pressSelectMetricSystem = () => {
    setMetricSystem(true);
    setImperialSystem(false);
  }

  const pressSelectImperialSystem = () => {
    setMetricSystem(false);
    setImperialSystem(true);
  }

  const handleGuardar = async () => {
    if (!metricSystem && !imperialSystem) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu sistema de preferencia');
      return;
    }
    
    setLoading("Guardando...");
    let preferredSystem = '';

    if (metricSystem) {
      preferredSystem = 'Metrico';
    }

    if (imperialSystem) {
      preferredSystem = 'Imperial';
    }

    const userId = FIREBASE_AUTH.currentUser.uid;

    const docRef = doc(FIRESTORE, 'users', userId);

    try {

      // get the goalWeight, initialWeight and height and make the conversion
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setTimeout(() => {
          setError(false);
        }, 2000);
        setError('No se encontró información del usuario');
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      let goalWeight = userData.goalWeight;
      let initialWeight = userData.initialWeight;
      let height = userData.height;

      if (preferredSystem === 'Imperial' && userData.preferredSystem === 'Metrico') {
        goalWeight = Math.round(goalWeight * 2.20462);
        initialWeight = Math.round(initialWeight * 2.20462);
        height = Math.round(height * 0.393701);
      }

      if (preferredSystem === 'Metrico' && userData.preferredSystem === 'Imperial') {
        goalWeight = Math.round(goalWeight * 0.453592);
        initialWeight = Math.round(initialWeight * 0.453592);
        height = Math.round(height * 2.54);
      }

      await setDoc(docRef, {
        preferredSystem: preferredSystem,
        goalWeight: goalWeight,
        initialWeight: initialWeight,
        height: height,
      }, { merge: true });

      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('MyInformation'); 
      }, 2000);
      setSuccess('Tu información se ha actualizado!');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setError(false);
      }, 2000);
      setError('Hubo un error');
      setLoading(false);
      return;
    }

  }

  const handleCancelar = () => {
    // go back
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar sistema de medida'} back={false}/>
      <View style={{width: '100%', alignItems: 'center'}}>
      <Text style={styles.title}>¿Cuál es tu sistema de medida preferido?</Text>
      <Pressable
        style={metricSystem ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectMetricSystem}
      >
        <Text style={styles.labelTitle}>Métrico</Text>
        <Text style={styles.labelSubtitle}>Kilogramos, centímetros, etc.</Text>
      </Pressable>
      <Pressable
        style={imperialSystem ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectImperialSystem}
      >
        <Text style={styles.labelTitle}>Imperial</Text>
        <Text style={styles.labelSubtitle}>Libras, pulgadas, etc.</Text>
      </Pressable>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 60,
    marginTop: 70,
    textAlign: 'center',
    width: '85%',
  },

  formGroup: {
    width: '85%',
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  labelTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 4,
  },

  labelSubtitle: {
    color: '#A0A0A3',
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 4,
  },

  checkboxSelected: {
    width: '85%',
    height: 100,
    backgroundColor: 'rgba(4, 150, 255, 0.5)',
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0496FF',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  checkboxUnselected: {
    width: '85%',
    height: 100,
    backgroundColor: '#ECECEC',
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
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
