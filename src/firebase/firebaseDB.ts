import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { apiKey, appId, authDomain, measurementId, messagingSenderId, projectId, storageBucket } from './auth/data';

const firebaseConfig = {
    apiKey: apiKey || '', // Access environment variable
    authDomain: authDomain || '',
    projectId: projectId || '',
    storageBucket: storageBucket || '',
    messagingSenderId: messagingSenderId || '',
    appId: appId || '',
    measurementId: measurementId || ''
  };

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
