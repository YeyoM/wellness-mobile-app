import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native';
import React, { useState, useContext } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';
import ErrorNotification from '../../components/ErrorNotification';

import { InitialScreensContext } from '../../context/InitialScreensContext';

export default function UserInputDays({ navigation }) {

  const { setExerciseDays } = useContext(InitialScreensContext);

  const [reminder, setReminder] = useState(false);

  const [selectDom, setSelectDom] = useState(false);
  const [selectLun, setSelectLun] = useState(false);
  const [selectMar, setSelectMar] = useState(false);
  const [selectMie, setSelectMie] = useState(false);
  const [selectJue, setSelectJue] = useState(false);
  const [selectVie, setSelectVie] = useState(false);
  const [selectSab, setSelectSab] = useState(false);

  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (!selectDom && !selectLun && !selectMar && !selectMie && !selectJue && !selectVie && !selectSab) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona al menos un día');
      return;
    }

    let days = [];

    if (selectDom) {
      days.push('Domingo');
    }

    if (selectLun) {
      days.push('Lunes');
    }

    if (selectMar) {
      days.push('Martes');
    }

    if (selectMie) {
      days.push('Miércoles');
    }

    if (selectJue) {
      days.push('Jueves');
    }

    if (selectVie) {
      days.push('Viernes');
    }

    if (selectSab) {
      days.push('Sábado');
    }

    setExerciseDays(days);

    navigation.navigate('Acerca de ti (Hora)');
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.76} back={true}/>
      { error && <ErrorNotification message={error} /> }
      <Text style={styles.title}>¿Qué días quieres entrenar?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={selectDom ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectDom(!selectDom)}
        >
          <Text style={styles.label}>Dom</Text>
        </Pressable>
        <Pressable
          style={selectLun ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectLun(!selectLun)}
        >
          <Text style={styles.label}>Lun</Text>
        </Pressable>
        <Pressable
          style={selectMar ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectMar(!selectMar)}
        >
          <Text style={styles.label}>Mar</Text>
        </Pressable>
        <Pressable
          style={selectMie ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectMie(!selectMie)}
        >
          <Text style={styles.label}>Mie</Text>
        </Pressable>
        <Pressable
          style={selectJue ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectJue(!selectJue)}
        >
          <Text style={styles.label}>Jue</Text>
        </Pressable>
        <Pressable
          style={selectVie ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectVie(!selectVie)}
        >
          <Text style={styles.label}>Vie</Text>
        </Pressable>
        <Pressable
          style={selectSab ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectSab(!selectSab)}
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
            ios_backgroundColor="#3e3e3e"
            onValueChange={setReminder}
            value={reminder}
          />
        </View>
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
    justifyContent:'center'
  },

  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 30,
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
    borderWidth: 1,
    borderColor: '#ECECEC',
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
