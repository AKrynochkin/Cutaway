import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDDUVvDNzSm4437Ih1FHDhqyMEQvJvMGrg',
  authDomain: 'react-sketch-1.firebaseapp.com',
  databaseURL: 'https://react-sketch-1.firebaseio.com',
  projectId: 'react-sketch-1',
  storageBucket: 'react-sketch-1.appspot.com',
  messagingSenderId: '595978703489'
};

const fire = firebase.initializeApp(config);

export default fire;
