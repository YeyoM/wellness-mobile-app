import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function UserInputGender({ navigation }) {

  const [selectHombre, setSelectHombre] = useState(false);
  const [selectMujer, setSelectMujer] = useState(false);
  const [selectOtro, setSelectOtro] = useState(false);

  const pressSelectHombre = () => {
    setSelectHombre(true);
    setSelectMujer(false);
    setSelectOtro(false);
  }

  const pressSelectMujer = () => {
    setSelectHombre(false);
    setSelectMujer(true);
    setSelectOtro(false);
  }

  const pressSelectOtro = () => {
    setSelectHombre(false);
    setSelectMujer(false);
    setSelectOtro(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuál es tu género?</Text>
      <Pressable
        style={selectHombre ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectHombre}
      >
        <Text style={styles.label}>Hombre</Text>
      </Pressable>
      <Pressable
        style={selectMujer ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectMujer}
      >
        <Text style={styles.label}>Mujer</Text>
      </Pressable>
      <Pressable
        style={selectOtro ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectOtro}
      >
        <Text style={styles.label}>Otro</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Acerca de ti (Cumpleaños)')}
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

  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 4,
  },

  checkboxSelected: {
    width: '85%',
    height: 48,
    backgroundColor: 'rgba(4, 150, 255, 0.5)',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0496FF',
  },

  checkboxUnselected: {
    width: '85%',
    height: 48,
    backgroundColor: '#ECECEC',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
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
