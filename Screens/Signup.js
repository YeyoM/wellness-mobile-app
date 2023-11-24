import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>wellness</Text>
      <Text style={styles.subtitle}>Registrate para crear tu rutina</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Matricula</Text>
        <TextInput
          style={styles.input}
          placeholder="Matricula"
          placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
        />
      </View>
      <Text style={styles.label}> ¿Olvidaste tu <Text style={{color: '#0496FF', fontWeight: 'bold'}}>contraseña</Text>?</Text>
      <View style={styles.formGroupBtn}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate('Acerca de ti (Nombre)')}
        >
          <Text style={styles.btnText}>Empezar</Text>
        </Pressable>
        <Text style={styles.label}>¿Ya tienes una cuenta? <Text style={{color: '#0496FF', fontWeight: 'bold'}}>Inicia sesión</Text></Text>
      </View>
      <StatusBar style="auto" />
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
    fontSize: 65,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 0,
    marginTop: 120,
  },

  subtitle: {
    fontSize: 19,
    color: '#59585E',
    marginBottom: 40,
  },

  formGroup: {
    width: '85%',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: 'rgba(47, 46, 54, 0.8)',
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderWidth: 0,
    borderRadius: 90,
    padding: 20,
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: "#ECECEC"
  },

  // send to bottom
  formGroupBtn: {
    width: '85%',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  btn: {
    width: '100%',
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
