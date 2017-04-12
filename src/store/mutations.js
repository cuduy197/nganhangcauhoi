/*jshint esversion: 6 */
/*jshint -W030 */
import firebase from 'firebase';
import { db, userRef } from "./firebase_init.js";
import { Message } from 'element-ui';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';

export const mutations = {
    SYNC(state) {
        /*Loading.service();
                Message({
                    showClose: true,
                    message: 'Xin chào mừng bạn'
                });
                Notification({
                    title: 'Success',
                    message: 'This is a success message',
                    type: 'success'
                });
        */
        console.log(window.location.pathname);
        var pathname = window.location.pathname;
        var loadingInstance;

        switch (pathname) {
            case "/toan/":
                loadingInstance = Loading.service({ text: 'Toán học', customClass: 'bg-indigo' });
                break;
            case "/anh/":
                loadingInstance = Loading.service({ text: 'Tiếng Anh', customClass: 'bg-teal' });
                break;
            case "/van/":
                loadingInstance = Loading.service({ text: 'Ngữ văn', customClass: 'bg-salmon' });
                break;
            case "/":
                loadingInstance = Loading.service({ text: 'Đang tải', customClass: 'bg-purple' });
                break;
            default:
                loadingInstance = Loading.service({ text: 'Trang không tồn tại' });
        }





        // Result from Redirect auth flow.
        // [START getidptoken]
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // [START_EXCLUDE]
            } else {
                // [END_EXCLUDE]
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
            // [END_EXCLUDE]
        });
        // [END getidptoken]
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setTimeout(() => { loadingInstance.close(); }, 1000);

                state.singin = true;
                // User is signed in.
                state.user.email = user.email;
                state.user.photoURL = user.photoURL;
                state.user.uid = user.uid;
                // [START_EXCLUDE]
                /* Message({
                     message: 'Bạn đã đăng nhập!',
                     type: 'success'
                 });*/
                // [END_EXCLUDE]
            } else {
                loadingInstance.close();

                // User is signed out.
                // [START_EXCLUDE]
                state.singin = false;

                Message({
                    message: 'Bạn chưa đăng nhập!',
                    type: 'info'
                });
                // [END_EXCLUDE]
            }

        });

    },
    LOGIN(state) {
        var loadingInstance = Loading.service({ text: 'Đăng nhập ...', customClass: 'bg-green' });
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);

    }, //end
    LOGOUT() {

        var loadingInstance = Loading.service({ text: 'Đăng xuất ...', customClass: 'bg-red-pink' });
        setTimeout(() => {
            loadingInstance.close();
        }, 1234);
        Message({
            message: 'Bạn đã đăng xuất thành công!',
            type: 'success'
        });
        firebase.auth().signOut();
    }
};
