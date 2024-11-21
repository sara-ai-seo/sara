"use client"
import { setCurrentState } from '@/redux/features/navSlice';
import { useDispatch } from 'react-redux'

export default function closeAllModals() {
    const dispatch = useDispatch();
  return (
    dispatch(setCurrentState(""))
  )
}
