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
            // Create a new post reference with an auto-generated id

            const testRef = dataRef.child('test');
            /* for (var i = 0; i < 100; i++) {
                 const newPostRef = testRef.push();
                 newPostRef.set({
                     test: i
                 });
            
            var ref = firebase.database().ref("cauhoi/test");
            ref.orderByKey().limitToFirst(5).once("value", function (snapshot) {
                snapshot.forEach((data) => {
                    console.log(data.val());
                    state.data.push(data.key);
                })

                ref.orderByKey().startAt(state.data[4]).limitToFirst(5).once("value", (snapshot) => {
                    snapshot.forEach((data) => {
                        console.log(data.val());
                    })
                });
                console.log(state.data[4]);

                console.log(state.data);
            });

 }*/
            console.log('Test!');
        }
    }
}

