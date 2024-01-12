import React, { createContext, useState, useEffect } from "react"

export const CreateRoutineContext = createContext()

import { FIREBASE_AUTH } from '../firebaseConfig'

export const CreateRoutineProvider = ({ children }) => {

  const [ routineName, setRoutineName ] = useState("New Routine")
  const [ userId, setUserId ] = useState("")
  const [ image, setImage ] = useState("https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D")
  const [ generatedAI, setGeneratedAI ] = useState(false)
  const [ numberOfDays, setNumberOfDays ] = useState(3)
  const [ days, setDays ] = useState([])
  const [ createdAt, setCreatedAt ] = useState("")
  const [ updatedAt, setUpdatedAt ] = useState("")

  const [ day, setDay ] = useState({
    dayName: "Day",
    routineId: "",
    totalDuration: "0",
    totalCalories: "0",
    totalSets: "0",
    exercises: [],
  })

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      }
    })
  }, [])

  return (
    <CreateRoutineContext.Provider 
      value={{ 
        routineName,
        setRoutineName,
        userId,
        setUserId,
        image,
        setImage,
        generatedAI,
        setGeneratedAI,
        numberOfDays,
        setNumberOfDays,
        days,
        setDays,
        createdAt,
        setCreatedAt,
        updatedAt,
        setUpdatedAt,
        day,
        setDay
      }}
    >
      { children }
    </CreateRoutineContext.Provider>
  )
}
