// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDNJG3kP1rw5iRZi6hXP5OfupFobv4qe-I",
    authDomain: "clinicaonline-utnfra.firebaseapp.com",
    databaseURL: "https://clinicaonline-utnfra.firebaseio.com",
    projectId: "clinicaonline-utnfra",
    storageBucket: "clinicaonline-utnfra.appspot.com",
    messagingSenderId: "111005502753",
    appId: "1:111005502753:web:fe34f0dd16a7c6f589c260",
    measurementId: "G-X1D5H2H96M"
  },

  seguridad: {
    minimoLargoPassword: 8
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
