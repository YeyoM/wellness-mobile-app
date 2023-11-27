import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function UserInputSummary({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Tu plan de entrenamiento está listo!</Text>
      <Text style={styles.labelTitle}>Nombre</Text>
      <Text style={styles.labelSubtitle}>Nombre</Text>
      <Text style={styles.labelTitle}>Género</Text>
      <Text style={styles.labelSubtitle}>Género</Text>
      <Text style={styles.labelTitle}>Cumpleaños</Text>
      <Text style={styles.labelSubtitle}>Cumpleaños</Text>
      <Text style={styles.labelTitle}>Peso</Text>
      <Text style={styles.labelSubtitle}>Peso</Text>
      <Text style={styles.labelTitle}>Peso ideal</Text>
      <Text style={styles.labelSubtitle}>Peso ideal</Text>
      <Text style={styles.labelTitle}>Altura</Text>
      <Text style={styles.labelSubtitle}>Altura</Text>
      <Text style={styles.labelTitle}>Objetivos</Text>
      <Text style={styles.labelSubtitle}>Objetivos</Text>
      <Text style={styles.labelTitle}>Ejercicios</Text>
      <Text style={styles.labelSubtitle}>Ejercicios</Text>
      <Text style={styles.labelTitle}>Frecuencia</Text>
      <Text style={styles.labelSubtitle}>Frecuencia</Text>
      <Text style={styles.labelTitle}>Días</Text>
      <Text style={styles.labelSubtitle}>Días</Text>
      <Text style={styles.labelTitle}>Hora</Text>
      <Text style={styles.labelSubtitle}>Hora</Text>
      <Text style={styles.labelTitle}>Nivel de fitness</Text>
      <Text style={styles.labelSubtitle}>Nivel de fitness</Text>
      <Text style={styles.labelTitle}>Activo</Text>
      <Text style={styles.labelSubtitle}>Activo</Text>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Signup')}
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
    fontSize: 28,
    fontWeight: 'semibold',
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
