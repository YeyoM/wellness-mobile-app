import React from "react"
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Image } from "react-native"

import { useEffect, useState, useContext } from "react"

export default function CreatingRoutineAI({ navigation }) {

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  // Here the AI will be called and the routine will be created
  // For now, we will just wait 2 seconds and then show to the user 
  // that the routine has been created
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {
          loading ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>Your routine is being created...</Text>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            success ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>Your workout routine is ready!</Text>
                <Image source={require('../../assets/routine_ready.png')} style={{ width: 300, height: 300, marginBottom: 20 }} />
                <View style={{ width: '100%', marginBottom: 40, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.btnText}>I’ll see it later</Text>
                </Pressable>
                <Pressable style={styles.btnContinue} onPress={() => navigation.navigate('Edit Routine', { routine: { name: 'My new routine', days: [] } })}>
                  <Text style={styles.btnContinueText}>View now!</Text>
                </Pressable>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Your routine is being created...</Text>
              </View>
            )
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0b0b',
    flex: 1,
    alignItems: 'center'
  },

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn: {
    backgroundColor: '#24262B',
    borderColor: '#24262B',
    borderWidth: 2,
    width: '45%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 30,
  },
  
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  btnContinue: {
    backgroundColor: '#157AFF',
    borderColor: '#157AFF',
    borderWidth: 2,
    width: '45%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 30,
  },

  btnContinueText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }

})
