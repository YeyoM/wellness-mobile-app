import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import * as Progress from 'react-native-progress'

export default function TopNavigationBar({ navigation, actualScreen, previousScreen, progress, back }) {
  return (
    <View style={styles.topBar}>
      {
        back && (
          <Pressable onPress={() => navigation.goBack()} style={{position: 'absolute', left: 0, height: 25, width: 25, top: 35, left: 25, zIndex: 999}}>
            <Image style={styles.backIcon} source={require('../assets/back.png')} />
          </Pressable>
        )
      }
      {
        previousScreen && (
          <Pressable onPress={() => navigation.navigate(previousScreen)} style={{position: 'absolute', left: 0, height: 25, width: 25, top: 35, left: 25, zIndex: 999}}>
            <Image style={styles.backIcon} source={require('../assets/back.png')} />
          </Pressable>
        )
      }
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.title}>{actualScreen}</Text>
        {
          progress && (
            <Progress.Bar 
              progress={progress} 
              width={100} 
              height={4} 
              color={'#0496FF'} 
              unfilledColor={'#F9F9F9'}
              borderWidth={0}
              borderRadius={8}
              style={styles.progressBar}
            />
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 0,
    marginTop: 20,
    paddingVertical: 10,   
    zIndex: 900,
    backgroundColor: '#0B0B0B', 
  },

  backIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 15,
  },

  progressBar: {
    alignSelf: 'center',
    marginBottom: 5,
  }
})