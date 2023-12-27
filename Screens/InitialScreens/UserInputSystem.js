import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';
import ErrorNotification from '../../components/ErrorNotification';

import { InitialScreensContext } from '../../context/InitialScreensContext';

export default function UserInputSystem({ navigation }) {

  const { setpreferredSystem } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);
  const [metricSystem, setMetricSystem] = useState(false);
  const [imperialSystem, setImperialSystem] = useState(false);

  const pressSelectMetricSystem = () => {
    setMetricSystem(true);
    setImperialSystem(false);
  }

  const pressSelectImperialSystem = () => {
    setMetricSystem(false);
    setImperialSystem(true);
  }

  const handleContinue = () => {
    if (!metricSystem && !imperialSystem) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu sistema de preferencia');
      return;
    }
    
    let preferredSystem = '';

    if (metricSystem) {
      preferredSystem = 'Metrico';
    }

    if (imperialSystem) {
      preferredSystem = 'Imperial';
    }

    setpreferredSystem(preferredSystem);

    navigation.navigate('Acerca de ti (Peso)');
  }

  return (
    <View style={styles.container}>
      { error && <ErrorNotification message={error} /> }
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.270} back={false}/>
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
        style={styles.btn}
        onPress={handleContinue}
      >
        <Text style={styles.btnText}>Continuar</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: 'white',
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
    color: 'white',
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0496FF',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  checkboxUnselected: {
    width: '85%',
    height: 100,
    backgroundColor: '#1F1F1F',
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 60,
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
