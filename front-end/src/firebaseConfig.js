import { initializeApp } from "firebase/app";
import 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyCvdnWL49PKqVM7oYNW-Cd7wYypx0XT5t8",
  authDomain: "open-banking-project-d547b.firebaseapp.com",
  projectId: "open-banking-project-d547b",
  storageBucket: "open-banking-project-d547b.appspot.com",
  messagingSenderId: "903109634632",
  appId: "1:903109634632:web:f4b83197114bc59da0867d"
};

const app = initializeApp(firebaseConfig)

export default app;