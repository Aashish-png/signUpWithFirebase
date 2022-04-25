// angular.module('myApp.serviceWorker', [])
// .service('serviceWorkerService', ['$q', '$http', '$location', '$timeout',
//   function($q, $http, $location, $timeout) {
//     var noTokenError = new Error('No Instance ID token available');
//     var noPermissionError = new Error('Unable to get permission to notify');
//     this.messaging = firebase.messaging();

//     this.unsubscribe = null;
//     this.unsubscribeTokenRefresh = null;
//     this.registerWorkerPromise = null;
//     this.tokenPermissionPromise = null;

//     this.registerWorker = function () {
//       return this.getRegistration();
//     };

//     this.setUpHandlers = function (onTokenRefresh, onMessage) {
//       // Callback fired if Instance ID token is updated.
//       var self = this;

//       this.unsubscribeTokenRefresh = this.messaging.onTokenRefresh(function() {
//         // token just refreshed, lets delete our saved Promise
//         delete self.tokenPermissionPromise;
//         self.getSubscription()
//           .then(function(refreshedToken) {
//             console.log('Token refreshed.');
//             onTokenRefresh(refreshedToken);
//           })
//           .catch(function(err) {
//             console.log('Unable to retrieve refreshed token ', err);
//           });
//       });

//       this.unsubscribeMessages = this.messaging.onMessage(function(payload) {
//         console.log("Message received. ", payload);
//         onMessage(payload);
//       });
//     }

//     this.subscribe = function (onUI, onLog, onToken, onMessage) {
//       var deferred = $q.defer();
//       var self = this;

//       onUI = onUI || function() {};
//       onLog = onLog || console.log;
//       onToken = onToken || function() {};
//       onMessage = onMessage || function() {};

//       // we dont want to cache this promise, because user may have changed the permission anytime
//       this.messaging.requestPermission()
//         .then(function() {
//           onLog('Notification permission granted.');
//           self.getSubscription()
//             .then(function(currentToken) {
//               if (currentToken) {
//                 deferred.resolve(currentToken);
//                 onLog('Notification token retrieved.');
//                 onToken(currentToken);
//               } else {
//                 // Show permission UI.
//                 //updateUIForPushPermissionRequired();
//                 deferred.reject(noTokenError);
//                 onUI({action: 'showPermissionUI'});
//               }
//             })
//             .catch(function(err) {
//               deferred.reject(noTokenError);
//               onLog('An error occurred while retrieving token. ', err);
//             });
//         })
//         .catch(function(err) {
//           deferred.reject(noPermissionError);
//           onLog('An error occurred while retrieving token. ', err);
//         });

//       this.setUpHandlers(onToken, onMessage);
//       return deferred.promise;
//     };

//     this.unsubscribe = function() {
//       this.unsubscribeTokenRefresh();
//       this.unsubscribeMessages();
//       delete this.registerWorkerPromise;
//       delete this.tokenPermissionPromise;
//       var deferred = $q.defer();
//       deferred.resolve();
//       return deferred.promise;
//     };

//     this.getRegistration = function () {
//       if (this.registerWorkerPromise) return this.registerWorkerPromise;

//       var self = this;
//       var deferred = $q.defer();

//       if ('serviceWorker' in navigator) {
//         console.log('Service Worker is supported');
//         navigator.serviceWorker.register('firebase-messaging-sw.js')
//           .then(function (reg) {
//             self.messaging.useServiceWorker(reg);
//             deferred.resolve();
//             console.log('Registration successful', reg);
//           }).catch(function (e) {
//             deferred.reject(e);
//             console.error('Registration unsuccessful', e);
//           });
//       } else {
//           deferred.resolve();
//       }

//       this.registerWorkerPromise = deferred.promise;
//       return this.registerWorkerPromise;
//     }

//     this.getSubscription = function () {
//       if (this.tokenPermissionPromise) return this.tokenPermissionPromise;
//       this.tokenPermissionPromise = this.messaging.getToken();
//       return this.tokenPermissionPromise;
//     };

//   }
// ]);