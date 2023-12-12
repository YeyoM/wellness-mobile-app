import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState, useContext } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';
import ErrorNotification from '../../components/ErrorNotification';

import { InitialScreensContext } from '../../context/InitialScreensContext';

export default function UserInputHeight({ navigation }) {

  const { setHeight, preferredSystem } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);
  const [height_, setHeight_] = useState('');

  const handleContinue = () => {
    if (height_ === '') {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu altura');
      return;
    }

    setHeight(height_);

    navigation.navigate('Acerca de ti (Objetivos)');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.456} back={true}/>
      { error && <ErrorNotification message={error} /> }
      <Text style={styles.title}>¿Cuál es tu altura?</Text>
      <View style={{ width: '85%', marginBottom: 60, backgroundColor: "#ECECEC", padding: 30, borderRadius: 55 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15}}>🤔️ Altura</Text>
        <Text style={{ fontWeight: "normal", fontSize: 14}}>Al saber tu edad podemos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <TextInput
        style={styles.input}
        textAlign={'center'}
        placeholder="00.0"
        placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
        keyboardType='numeric'
        returnKeyType='done'
        value={height_}
        onChangeText={setHeight_}
      />
      <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#2F2E36', marginBottom: 40 }}>{preferredSystem === 'Metrico' ? 'cm' : 'in'}</Text>
      </View>
      <Pressable
        style={styles.btn}
        onPress={handleContinue}
      >
        <Text style={styles.btnText}>Continuar</Text>
      </Pressable>
    </KeyboardAvoidingView>
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
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    width: '85%',
  },

  input: {
    width: 'auto',
    height: 48,
    fontSize: 22,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 40,
    marginRight: 10,
    paddingHorizontal: 30,
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
