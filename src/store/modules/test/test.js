import firebase from 'firebase';
import { Message, Notification, Loading, MessageBox } from 'element-ui';

import { userRef, dataRef } from "../../firebase_init.js";

export const test = {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        TEST(state) {
            //dataRef.child('test')
            const testRef = dataRef.child('test');
            // Create a new post reference with an auto-generated id
            const newPostRef = testRef.push();
            newPostRef.set({
                test: 'ok'
            });
            testRef.once('value', (snapshot) => {
                console.log(snapshot.key);
                state.data.push(snapshot.key);
                console.info(state.data);

                snapshot.forEach(function (childSnapshot) {
                    let childKey = childSnapshot.key;
                    state.data.push(childKey);
                    let childData = childSnapshot.val();
                    // ...
                });
            })
            console.log('Test!');
        }
    }
}

