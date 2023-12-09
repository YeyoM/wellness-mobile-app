import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function Home ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Pressable onPress={() => navigation.navigate('ManageAccount')} style={styles.button}>
        <Text style={{ color: 'white' }}>Manage Account</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 20,
  },

  button: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
