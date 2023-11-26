import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function UserInputObjectives({ navigation }) {

  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuales son tus objetivos?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Mejorar mi forma física </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Quemar grasa </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Desarrollar músculo </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Aumentar resistencia </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Fortalecer la mente </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Pérdida de peso</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Manejar el estés</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Flexibilidad </Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Optimizar mis entrenamientos</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Acerca de ti (Ejercicios)')}
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
    marginBottom: 30,
    marginTop: 40,
    textAlign: 'center',
    width: '85%',
  },

  objectives: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 2,
  },

  checkboxSelected: {
    width: 'auto',
    height: 42,
    backgroundColor: 'rgba(4, 150, 255, 0.5)',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0496FF',
    paddingHorizontal: 20,
    marginRight: 5,
  },

  checkboxUnselected: {
    width: 'auto',
    height: 42,
    backgroundColor: '#ECECEC',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    marginRight: 5,
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 20,
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
