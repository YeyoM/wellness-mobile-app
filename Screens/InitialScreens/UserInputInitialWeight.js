import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import TopNavigationBar from '../../components/TopNavigationBar';
import ErrorNotification from '../../components/ErrorNotification';

import { InitialScreensContext } from '../../context/InitialScreensContext';

export default function UserInputInitialWeight({ navigation }) {

  const { setInitialWeight, preferredSystem } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);
  const [weight, setWeight] = useState('');

  const handleContinue = () => {
    if (weight === '') {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu peso');
      return;
    }

    setInitialWeight(weight);
    
    navigation.navigate('Acerca de ti (Peso ideal)');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.304} back={true}/>
      { error && <ErrorNotification message={error} /> }
      <Text style={styles.title}>¿Cuál es tu peso actual?</Text>
      <View style={{ width: '85%', marginBottom: 60, backgroundColor: "#1F1F1F", padding: 30, borderRadius: 55 }}>
        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 15}}>🤔️ Tu IMC. O tu peso podemos saber blah</Text>
        <Text style={{ color: 'white', fontWeight: "normal", fontSize: 14}}>Al saber tu edad podemos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <TextInput
        style={styles.input}
        textAlign={'center'}
        placeholder="00.0"
        placeholderTextColor={'rgba(147, 146, 154, 0.8)'}
        keyboardType='numeric'
        returnKeyType='done'
        value={weight}
        onChangeText={setWeight}
      />
      <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#fff', marginBottom: 40 }}>{preferredSystem === 'Metrico' ? 'kg' : 'lb'}</Text>
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
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent:'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'white',
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
    borderTopColor: '#0B0B0B',
    borderRightColor: '#0B0B0B',
    borderLeftColor: '#0B0B0B',
    color: '#fff',
    backgroundColor: '#0B0B0B',
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
