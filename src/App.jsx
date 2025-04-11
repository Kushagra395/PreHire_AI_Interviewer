// src/App.jsx
import { useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import LayoutRoutes from './Layouts(routes)/LayoutRoutes';

function App() {
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "connection", "status"), 
      (doc) => {
        console.log("Connection state:", doc.exists() ? "Active" : "Error");
      },
      (error) => {
        console.error("Firestore error:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <LayoutRoutes/>
  );
}

export default App;