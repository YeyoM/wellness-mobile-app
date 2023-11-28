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
    width: '100%',
    height: 56,
    backgroundColor: '#98ff8c',
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
