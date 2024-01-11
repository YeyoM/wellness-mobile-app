import { FIRESTORE } from './firebaseConfig'

import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export const getRoutines = async (userId, setRoutines, setError, setLoading) => {

  setLoading(true)
  console.log('getting routines')

  // get the user's routines' ids, they are stored in the user's document
  // it is an array of strings
  try {
    const userDocRef = doc(FIRESTORE, 'users', userId)
    const userDocSnap = await getDoc(userDocRef)
    const userDocData = userDocSnap.data()
    const userRoutinesIds = userDocData.routines

    if (userRoutinesIds.length === 0) {
      setRoutines([])
      return
    }

    // after getting the ids, get the routines from the routines collection
    // and store them in the state
    const routines = []

    for (const id of userRoutinesIds) {
      const routineDocRef = doc(FIRESTORE, 'routines', id)
      const routineDocSnap = await getDoc(routineDocRef)
      const routineDocData = routineDocSnap.data()
      routines.push(routineDocData)
    }

    // after getting the routines, we need to get all the day's ids
    // and then get the days from the days collection
    
    for (const routine of routines) {
      const days = []

      for (const id of routine.days) {
        const dayDocRef = doc(FIRESTORE, 'days', id)
        const dayDocSnap = await getDoc(dayDocRef)
        const dayDocData = dayDocSnap.data()
        days.push(dayDocData)
      }

      routine.days = days
    }

    // after getting the days, we need to get all the exercise's ids
    // and then get the exercises from the exercises collection
    // and then add them to the days
    
    for (const routine of routines) {
      for (const day of routine.days) {
        const exercises = []

        for (const id of day.exercises) {
          const exerciseDocRef = doc(FIRESTORE, 'exercises', id)
          const exerciseDocSnap = await getDoc(exerciseDocRef)
          const exerciseDocData = exerciseDocSnap.data()
          exercises.push(exerciseDocData)
        }

        day.exercises = exercises
      }
    }

    setRoutines(routines)
    setLoading(false)
    return
  } catch (err) {
    setError(err)
    setLoading(false)
    return
  }
}

