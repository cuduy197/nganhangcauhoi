import firebase from 'firebase';
import { db, userRef } from "./firebase_init.js";
import { Message } from 'element-ui';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';

export const mutations = {
    SYNC(state) {
        var pathname = window.location.pathname;
        var loadingInstance;

        switch (pathname) {
            case "/toan":
            case "/toan/create":
            case "/toan/":
            case "/toan/create/":
                loadingInstance = Loading.service({ text: 'Toán học', customClass: 'bg-indigo' });
                break;
            case "/anh":
            case "/anh/":
            case "/anh/create":
            case "/anh/create/":
                loadingInstance = Loading.service({ text: 'Tiếng Anh', customClass: 'bg-teal' });
                break;
            case "/van":
            case "/van/":
            case "/van/create":
            case "/van/create/":
                loadingInstance = Loading.service({ text: 'Ngữ văn', customClass: 'bg-salmon' });
                break;
            case "/":
                loadingInstance = Loading.service({ text: 'Đang tải', customClass: 'bg-purple' });
                break;
            default:
                loadingInstance = Loading.service({
                    text: 'Trang không tồn tại',
                    customClass: 'bg-orange'
                });
        }
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // [GET USER DATA]
                // User is signed in.
                state.user.email = user.email;
                state.user.photoURL = user.photoURL;
                state.user.uid = user.uid;
                // [START_EXCLUDE]
                state.singin = true;
                setTimeout(() => { loadingInstance.close(); }, 777);
                // [END_EXCLUDE]
            } else {
                // User is signloadingInstance.close();ed out.
                // [START_EXCLUDE]
                state.singin = false;
                loadingInstance.close();
                if (pathname != '/') {
                    window.location.href = '/';
                }
                setTimeout(() => {
                    Message({
                        message: 'Bạn chưa đăng nhập!',
                        type: 'info'
                    });
                }, 2000);
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

        MessageBox.confirm('Bạn có muốn đăng xuất?', 'Thông báo', {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
            type: 'warning'
        }).then(() => {
            var loadingInstance = Loading.service({ text: 'Đăng xuất ...', customClass: 'bg-red-pink' });
            setTimeout(() => {
                loadingInstance.close();
            }, 1234);
            Message({
                message: 'Bạn đã đăng xuất thành công!',
                type: 'success'
            });
            firebase.auth().signOut();
        }).catch(() => {

        });
    },


    //[INPUT update] 
    updateQuestion(state, value) {
        state.input.question = value;
    },
    updateQuestion_image(state, value) {
        state.input.question_image = value;
    },
    updateAnswer(state, value) {
        state.input.answer = value;
    },
    updateAnswer2(state, value) {
        state.input.answer2 = value;
    },
    updateAnswer3(state, value) {
        state.input.answer3 = value;
    },
    updateAnswer4(state, value) {
        state.input.answer4 = value;
    },
    updateHint(state, value) {
        state.input.hint = value;
    },
    updateHint_image(state, value) {
        state.input.hint_image = value;
    },
    updateSlove(state, value) {
        state.input.slove = value;
    },
    updateSlove_image(state, value) {
        state.input.slove_image = value;
    },

};
