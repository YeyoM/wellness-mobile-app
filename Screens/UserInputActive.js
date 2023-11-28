import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function UserInputActive({ navigation }) {

  const [selectSedentario, setSelectSedentario] = useState(false);
  const [selectModeradamenteActivo, setSelectModeradamenteActivo] = useState(false);
  const [selectMuyActivo, setSelectMuyActivo] = useState(false);

  const pressSelectSedentario = () => {
    setSelectSedentario(true);
    setSelectModeradamenteActivo(false);
    setSelectMuyActivo(false);
  }

  const pressSelectModeradamenteActivo = () => {
    setSelectSedentario(false);
    setSelectModeradamenteActivo(true);
    setSelectMuyActivo(false);
  }

  const pressSelectMuyActivo = () => {
    setSelectSedentario(false);
    setSelectModeradamenteActivo(false);
    setSelectMuyActivo(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué tan activo eres?</Text>
      <Pressable
        style={selectSedentario ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectSedentario}
      >
        <Text style={styles.labelTitle}>Sedentario</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectModeradamenteActivo ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectModeradamenteActivo}
      >
        <Text style={styles.labelTitle}>Moderadamente activo</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectMuyActivo ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectMuyActivo}
      >
        <Text style={styles.labelTitle}>Muy activo</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Acerca de ti (Resumen)')}
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
    marginTop: 60,
    textAlign: 'center',
    width: '85%',
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
    marginBottom: 16,
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
    marginBottom: 16,
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
