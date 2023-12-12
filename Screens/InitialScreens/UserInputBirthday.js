import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import TopNavigationBar from '../../components/TopNavigationBar';
import ErrorNotification from '../../components/ErrorNotification';

import { InitialScreensContext } from '../../context/InitialScreensContext';

export default function UserInputBirthday({ navigation }) {

  const { setBirthDate } = useContext(InitialScreensContext);

  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  }

  const confirmIOSDate = () => {
    setDateOfBirth(date.toLocaleDateString());
    setBirthDate(date.toLocaleDateString());
    togglePicker();
  }

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        togglePicker();
        setDateOfBirth(currentDate.toLocaleDateString());
        setBirthDate(currentDate.toLocaleDateString());
      }

    } else {
      togglePicker();
    }
  }

  const handleContinue = () => {
    if (dateOfBirth === '') {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu fecha de nacimiento');
      return;
    }
    navigation.navigate('Acerca de ti (Sistema de preferencia)');
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.228} back={true}/>
      { error && <ErrorNotification message={error} /> }
      <Text style={styles.title}>¿Cuándo es tu cumpleaños?</Text>
      <View style={{ width: '85%', marginBottom: 60, backgroundColor: "#ECECEC", padding: 30, borderRadius: 55 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15}}>🏋🏽‍♀️ Tu edad nos permite adaptar tu plan</Text>
        <Text style={{ fontWeight: "normal", fontSize: 14}}>Al saber tu edad podemos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
      </View>
      {
        !showPicker && (
          <Pressable
            onPress={togglePicker}
          >
            <TextInput
              style={styles.input}
              textAlign={'center'}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
              value={dateOfBirth}
              onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
              editable={false}
              onPressIn={togglePicker}
            />
          </Pressable>
        )
      }
      {
        showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            style={{ width: '120' }}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )
      }

      {
        showPicker && Platform.OS === 'ios' && (
          <View style={{ flexDirection: "row", justifyContent: "space-around"}}>

            <TouchableOpacity
              onPress={togglePicker}
              style={{ padding: 20 }}
            >
              <Text style={{ color: '#0496FF', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={confirmIOSDate}
              style={{ padding: 20 }}
            >
              <Text style={{ color: '#0496FF', fontWeight: 'bold' }}>Aceptar</Text>
            </TouchableOpacity>

          </View>
        )
      }

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
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 20,
    marginTop: 80,
    textAlign: 'center',
    width: '85%',
  },

  input: {
    width: '60%',
    height: 64,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 22,
    fontSize: 22,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    color: '#000',
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
