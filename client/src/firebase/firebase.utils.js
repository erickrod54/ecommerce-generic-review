import firebase from "firebase/app";

import "firebase/firestore";

import "firebase/auth";

const config = {
    apiKey: "AIzaSyCDNrrmmdEPn3rxaFpj_NT2jE6qwdPfF_I",
    authDomain: "crwn-db-f747a.firebaseapp.com",
    databaseURL: "https://crwn-db-f747a.firebaseio.com",
    projectId: "crwn-db-f747a",
    storageBucket: "crwn-db-f747a.appspot.com",
    messagingSenderId: "577193791093",
    appId: "1:577193791093:web:d78f1078673cb8a37ff23c"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData  
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

   return transformedCollection.reduce((acumulator, collection) => {
       acumulator[collection.title.toLowerCase()] = collection;
       return acumulator;
   }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;