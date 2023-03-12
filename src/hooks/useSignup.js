import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      //upload user thumbnail to firebase storage
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL() //ref geeft aan waar het is in storage

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      //create user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl
      })

      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}