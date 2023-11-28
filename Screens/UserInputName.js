import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

import ErrorNotification from '../components/ErrorNotification';

export default function UserInputName({ navigation }) {

  const [error, setError] = useState(false);
  const [name, setName] = useState('');

  const handleContinue = () => {
      
      if (name === '') {
        setTimeout(() => {
          setError(false);
        }, 5000);
        setError('Por favor ingresa tu nombre');
        return;
      }
  
      navigation.navigate('Acerca de ti (Género)');
  
    }

  return (
    <View style={styles.container}>
      { error && <ErrorNotification message={error} /> }
      <Text style={styles.title}>¿Cuál es tu nombre?</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
          textAlign={'center'}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Pressable
        style={styles.btn}
        onPress={handleContinue}
      >
        <Text style={styles.btnText}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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

  input: {
    width: '60%',
    height: 48,
    fontSize: 22,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    color: 'black',
    backgroundColor: '#fff',
    marginBottom: 60,
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

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 4,
  }
});
