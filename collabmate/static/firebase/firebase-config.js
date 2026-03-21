async function initFirebase() {
  try {
    const response = await fetch('/api/firebase-config', {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to load Firebase config');
    }

    const firebaseConfig = await response.json();

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
      throw new Error('Firebase config is incomplete');
    }

    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

initFirebase();