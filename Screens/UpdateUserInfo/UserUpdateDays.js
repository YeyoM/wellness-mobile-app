import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native';
import React, { useState, useContext } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import PrimaryNotification from '../../components/PrimaryNotification';
import SuccessNotification from '../../components/SuccessNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function UserInputDays({ route, navigation }) {

  const { exerciseDays, reminder_ } = route.params;

  const [reminder, setReminder] = useState(reminder_);

  const [selectDom, setSelectDom] = useState(exerciseDays.includes('Domingo'));
  const [selectLun, setSelectLun] = useState(exerciseDays.includes('Lunes'));
  const [selectMar, setSelectMar] = useState(exerciseDays.includes('Martes'));
  const [selectMie, setSelectMie] = useState(exerciseDays.includes('Miércoles'));
  const [selectJue, setSelectJue] = useState(exerciseDays.includes('Jueves'));
  const [selectVie, setSelectVie] = useState(exerciseDays.includes('Viernes'));
  const [selectSab, setSelectSab] = useState(exerciseDays.includes('Sábado'));

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSwitch = () => {
    setReminder(!reminder);
  }

  const handleGuardar = async () => {
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

    setLoading("Guardando...");

    try {

      // get trainingFrequency and check if it's the same as the days selected
      const docRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setTimeout(() => {
          setError(false);
        }, 3000);
        setLoading(false);
        setError('No se encontró información del usuario');
        return;
      }

      const data = docSnap.data();

      if (data.trainingFrequency !== days.length) {
        setTimeout(() => {
          setError(false);
        }, 3000);
        setLoading(false);
        setError(`El número de días de entrenamiento no coincide con la frecuencia de entrenamiento, deben ser ${data.trainingFrequency} días`);
        return;
      }
    
      await setDoc(doc(FIRESTORE, "users", FIREBASE_AUTH.currentUser.uid), { trainingDays: days, reminder: reminder }, { merge: true });
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate("MyInformation");
      }, 3000);
      setSuccess('Días de entrenamiento actualizados correctamente');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setError('Error al actualizar los días de entrenamiento');
    }
  }

  const handleCancelar = async () => {
    // go back

    // check if the days and the frequency are the same in the database

    const docRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      setTimeout(() => {
        setError(false);
      }, 3000);
      setLoading(false);
      setError('No se encontró información del usuario');
      return;
    }

    const data = docSnap.data();

    if (data.trainingFrequency !== exerciseDays.length) {
      setTimeout(() => {
        setError(false);
      }, 3000);
      setLoading(false);
      setError(`El número de días de entrenamiento no coincide con la frecuencia de entrenamiento, deben ser ${data.trainingFrequency} días`);
      return;
    }

    navigation.navigate("MyInformation");
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar días de entrenamiento'} />
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
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
            onValueChange={handleSwitch}
            value={reminder}
          />
        </View>
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
