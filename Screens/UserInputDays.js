import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';

export default function UserInputDays({ navigation }) {

  const [isSelected, setSelection] = useState(false);
  const [reminder, setReminder] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué días quieres entrenar?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Dom</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Lun</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Mar</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Mie</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Jue</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Vie</Text>
        </Pressable>
        <Pressable
          style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={styles.label}>Sab</Text>
        </Pressable>
      </View>
      <View style={styles.recordatorios}>
        <View styles={styles.recordatoriosLeft}>
          <Text style={styles.recordatoriosTitle}>Recordatorios</Text>
          <Text style={styles.recordatoriosSubtitle}>Actívalos para cumplir tus objetivos</Text>
        </View>
        <View styles={styles.recordatoriosRight}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isSelected ? "#0496FF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setReminder}
            value={reminder}
          />
        </View>
      </View>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Acerca de ti (Hora)')}
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
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
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

  recordatorios: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  recordatoriosLeft: {
    width: '70%',
  },

  recordatoriosRight: {
    width: '30%',
  },

  recordatoriosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
    textAlign: 'left',
  },

  recordatoriosSubtitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 4,
    textAlign: 'left',
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
