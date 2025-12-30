# Guía de Configuración para tu Proyecto inmobank-86668

Sigue estos pasos para que la web empiece a leer tus pisos de Firebase.

## 1. Obtener tu API Key
1. Abre tu consola: [https://console.firebase.google.com/project/inmobank-86668/overview](https://console.firebase.google.com/project/inmobank-86668/overview)
2. Haz clic en el icono de **Web (`</>`)** que verás en el centro o en el menú de configuración (la rueda dentada ⚙️ > Configuración del proyecto).
3. Si ya creaste una app web, verás un objeto llamado `firebaseConfig`.
4. Copia el valor de **`apiKey`**, **`messagingSenderId`** y **`appId`**.

## 2. Poner los datos en la Web
Abre el archivo `app.js` en tu editor y rellena estos 3 campos con los datos que acabas de copiar:

```javascript
const firebaseConfig = {
    apiKey: "AQUÍ_TU_API_KEY_REAL", 
    authDomain: "inmobank-86668.firebaseapp.com",
    projectId: "inmobank-86668",
    storageBucket: "inmobank-86668.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

## 3. Preparar Firebase (Muy importante)
Para que los datos se vean, tienes que hacer esto en la consola:
1. Ir a **Firestore Database** > **Reglas**.
2. Cambia las reglas para que permitan leer sin errores (esto es para desarrollo, luego se puede proteger):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Ir a **Firestore Database** > **Datos** y crea la colección `properties`.

---
**¡Y ya está!** En cuanto guardes `app.js` con tu API Key real y crees la colección en Firebase, la web estará conectada.⚡️
