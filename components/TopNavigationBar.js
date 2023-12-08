import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function TopNavigationBar({ navigation, actualScreen, progress }) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/back.svg')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{actualScreen}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
})