import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDFRT0Grf_K0UO59AY-jMQ3x0mjY488DbM",
    authDomain: "fir-react-app-94309.firebaseapp.com",
    projectId: "fir-react-app-94309",
    storageBucket: "fir-react-app-94309.appspot.com",
    messagingSenderId: "675900730566",
    appId: "1:675900730566:web:88e74c01fa9c22c738bbc7"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); //entrega estructura de documento si existe o no

    if (!snapShot.exists){ //sino existe crea una nueva instancia y setea los campos
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('errro creating user', error.message);
        }
    }
    return userRef;
};

//variables exportables para servicios de autentificacion
export const auth = firebase.auth();
export const firestore= firebase.firestore(); //funciones de firestore

//definir proveedores de autentificacion
const provider = new firebase.auth.GoogleAuthProvider(); //autentificacion con google
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
