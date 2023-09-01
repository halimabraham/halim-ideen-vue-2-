import app from './fb'
import { getFirestore } from 'firebase/firestore'

export const db = getFirestore(app)