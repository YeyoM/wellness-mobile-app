import { StyleSheet, Text, View } from 'react-native';

export default function SuccessNotification({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ message }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    backgroundColor: '#0496FF',
    padding: 16,
    borderRadius: 24,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
