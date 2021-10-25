## Para suportar AR

- Dispositivo precisa ter suporte ao AR Core 
  - Lista de dispositivos suportados: https://developers.google.com/ar/devices#google_play_devices

- App necessita declarar o uso do ARCore no AndroidManifest
```
  <meta-data android:name="com.google.ar.core" android:value="optional" />
```

- App necessita permissão da câmera no AndroidManifest
```
  <uses-permission android:name="android.permission.CAMERA"/>
```

  No React Native:
```
  import {PermissionsAndroid} from 'react-native'
  
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
```
