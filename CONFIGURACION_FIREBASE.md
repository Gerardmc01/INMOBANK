# Guía de Configuración de Firebase para INMOBANK

Sigue estos pasos para conectar tu base de datos y añadir pisos manualmente.

## 1. Crear el Proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Haz clic en **"Añadir proyecto"** y ponle el nombre `inmobank`.
3. (Opcional) Desactiva Google Analytics si no lo necesitas.
4. Crea el proyecto.

## 2. Crear la Base de Datos (Firestore)
1. En el menú de la izquierda, ve a **Build** > **Firestore Database**.
2. Haz clic en **"Crear base de datos"**.
3. Elige la ubicación más cercana (ej. `europe-west`).
4. Selecciona **"Empezar en modo de prueba"** (esto permite escribir/leer datos sin autenticación durante los primeros 30 días, luego deberás poner reglas de seguridad).
5. Crea una colección llamada `properties`.

## 3. Registrar la Web y Obtener las Credenciales
1. En la descripción general del proyecto, haz clic en el icono de **Web (`</>`)**.
2. Ponle un nombre (ej. `web-app`) y haz clic en "Registrar aplicación".
3. Te aparecerá un código llamado `firebaseConfig`. Copia esos valores.

## 4. Actualizar el código en `app.js`
Abre el archivo `/springfield-oracle/app.js` y busca la sección `// --- CONFIGURACIÓN DE FIREBASE ---`. Sustituye los valores por los tuyos:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_APP_ID"
};
```

## 5. Estructura de un Piso en Firestore
Cuando añadas una "Documento" en la colección `properties`, usa estos campos (respetando las mayúsculas/minúsculas):

- **id**: String (ej: `piso-usera-1`)
- **title**: String (ej: `Piso en Usera...`)
- **desc**: String (descripción corta)
- **location**: String (ej: `Madrid`)
- **bank**: String (ej: `Altamira`)
- **bankClass**: String (ej: `altamira` - esto pone el color correcto)
- **price**: Number (ej: `230000`)
- **oldPrice**: Number (ej: `285000`)
- **features**: Array (3 elementos: `["102", "4", "2"]` para metros, habs, baños)
- **tags**: Array (ej: `["Santander", "Ocasión"]`)
- **img**: String (URL de la imagen de Unsplash o similar)
- **link**: String (ej: `propiedad-amor-hermoso.html` si creas la ficha, o el link del banco)
- **type**: String (ej: `vivienda`)

---
**¡Listo!** En cuanto rellenes la configuración en `app.js`, la web dejará de usar el archivo estático y leerá directamente de tu Firebase.
