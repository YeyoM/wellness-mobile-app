import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function UserInputName({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => alert('Registro exitoso')}
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

  btn: {
    backgroundColor: '#0496FF',
    padding: 15,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
