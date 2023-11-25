import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function UserInputExercises({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿En que ejercicios estás interesado?</Text>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Acerca de ti (Frecuencia)')}
      >
        <Text style={styles.btnText}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: 'semi-bold',
    color: 'black',
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
    width: '85%',
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    padding: 20,
    paddingTop: 22,
    paddingBottom: 22,
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
