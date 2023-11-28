import { StyleSheet, Text, View } from 'react-native';

export default function ErrorNotification({ message }) {
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
    backgroundColor: '#FF3333',
    padding: 16,
    borderRadius: 24,
    fontSize: 16,
    marginTop: 10,
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
