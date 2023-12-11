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
    backgroundColor: '#FF3333',
    width: '90%',
    paddingVertical: 16,
    borderRadius: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 110,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff',
  },
});
