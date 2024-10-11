export default {
  async fetch(request, env) {
    const firebaseConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    }
    const VITE_MAPBOX_ACCESS_TOKEN = env.VITE_MAPBOX_ACCESS_TOKEN
    const GMAIL_USER = env.GMAIL_USER
    const GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD

    // You can use this firebaseConfSig object for API calls or other logic.
    return new Response(`API Key accessed securely, action completed.`)
  }
}
