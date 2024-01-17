import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports
const firebaseConfig = {
 apiKey: "AIzaSyBsjlTTcrvCSgS0YhHxz9LLhyHTQ2lxtSg",
 authDomain: "wemis-dxa.firebaseapp.com",
 databaseURL: "https://wemis-dxa-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId: "wemis-dxa",
 storageBucket: "wemis-dxa.appspot.com",
 messagingSenderId: "1029877148537",
 appId: "1:1029877148537:web:3eb1a5155f639a08f1dda8",
 measurementId: "G-9YQJMTG53Q"
};

export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
// export const todosRef = collection(db, 'expense')