import firebase from 'firebase';
import { db, userRef, dataRef } from "./firebase_init.js";
import { Message } from 'element-ui';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';


export const mutations = {
    SYNC(state) {
        //[Disable reload]
        document.onkeydown = function() {
            switch (event.keyCode) {
                case 116: //F5 button
                    window.scrollTo(0, 0);
                    event.returnValue = false;
                    MessageBox.confirm('Bạn có muốn tải lại trang?', 'Thông báo', {
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Hủy',
                        type: 'warning'
                    }).then(() => {
                        setTimeout(function() {
                            history.go(0);
                        }, 200);

                    }).catch(() => {});
                    return false;
                case 82: //R button
                    if (event.ctrlKey) {
                        event.returnValue = false;
                        return false;
                    }
            }
        };
        //Fix pathname like http://localhost:8080/toan#/toan --> http://localhost:8080/#/
        if (location.pathname != "/") {
            location.href = "/";
        }
        //[Get current location hash]
        if (location.hash !== '#/') {
            state.subject.path = (location.hash).replace('create', '').match(/[^#/]/g).join('');
            console.log(state.subject.path);
        }
        let loadingInstance;
        var pathname = location.hash;
        if (state.subject.subpath === "") {
            window.location.href = '#/' + state.subject.path;
        }
        switch (state.subject.path) {
            case "toan":
                loadingInstance = Loading.service({ text: 'Toán học', customClass: 'bg-indigo' });
                break;
            case "anh":
                loadingInstance = Loading.service({ text: 'Tiếng Anh', customClass: 'bg-teal' });
                break;
            case "van":
                loadingInstance = Loading.service({ text: 'Ngữ văn', customClass: 'bg-salmon' });
                break;
            case "":
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
                setTimeout(() => { loadingInstance.close(); }, 777);
                state.singin = true;

                var UserUID = userRef.child(user.uid);
                UserUID.update({ login: true, email: user.email });
                /*
                                dataRef.on('value', (snapshot) => {
                                    let numChild = snapshot.numChildren();
                                    console.log(numChild);
                                });
                */
                // [END_EXCLUDE]
            } else {
                // User is signloadingInstance.close();ed out.
                // [START_EXCLUDE]
                state.singin = false;
                loadingInstance.close();
                if (pathname != '/') {
                    window.location.href = '#/';
                }
                /*setTimeout(() => {
                    Notification({
                        message: 'Bạn chưa đăng nhập!',
                        type: 'info'
                    });
                }, 2000);*/
                // [END_EXCLUDE]
            }

        });
    },
    LOGIN(state) {
        let loadingInstance = Loading.service({ text: 'Đăng nhập ...', customClass: 'bg-green' });
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
            let loadingInstance = Loading.service({ text: 'Đăng xuất ...', customClass: 'bg-red-pink' });
            firebase.auth().signOut();
            setTimeout(() => {
                loadingInstance.close();
                setTimeout(function() {
                    Notification({
                        message: 'Bạn đã đăng xuất thành công!',
                        type: 'success'
                    });
                }, 200);
            }, 1234);

            //Do
        }).catch(() => {});
    },
    BEFORE_CREATE_QUIZ(state, subpath) {
        window.scrollTo(0, 0);
        state.subject.path = (location.hash).replace('create', '').match(/[^#/]/g).join('');
        state.subject.subpath = subpath;
        console.info(state.subject.path + "/" + state.subject.subpath);
        let loadingInstance = Loading.service({ text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...', customClass: 'bg-green' });
        dataRef
            .child(state.subject.path)
            .child(state.subject.subpath)
            .once('value', (d) => {
                console.info(d.numChildren());
                state.quiz.numChildren = Number(d.numChildren() + 1);
                if (Number(d.numChildren()) >= 0 && d.numChildren() !== null) {
                    setTimeout(function() {
                        loadingInstance.close();
                    }, 777);
                } else {
                    loadingInstance.close();
                    loadingInstance = Loading.service({ text: 'Có lỗi, tải lại , tự động tải lại trang sau 3 giây ...', customClass: 'bg-red-pink' });
                    setTimeout(function() {
                        loadingInstance.close();
                        setTimeout(function() {
                            location.href = "/";
                        }, 300);
                    }, 3000);

                }

            });
    },
    VIEW_QUIZ(state, subpath) {
        window.scrollTo(0, 0);
        state.quiz.val = [];
        state.subject.path = (location.hash).replace('create', '').match(/[^#/]/g).join('');
        state.subject.subpath = subpath;
        console.info(state.subject.path + "/" + state.subject.subpath);
        let loadingInstance = Loading.service({ text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...', customClass: 'bg-green' });
        dataRef
            .child(state.subject.path)
            .child(state.subject.subpath)
            .limitToFirst(10)
            .once('value', (d) => {

                if (Number(d.numChildren()) >= 0 && d.numChildren() !== null) {
                    setTimeout(function() {
                        state.quiz.numChildren = Number(d.numChildren());
                        console.info(state.quiz.numChildren);

                        d.forEach(function(item) {
                            var itemVal = item.val();
                            state.quiz.val.push(itemVal);
                        });


                        loadingInstance.close();
                    }, 777);
                } else {
                    loadingInstance.close();
                    loadingInstance = Loading.service({ text: 'Có lỗi, tải lại , tự động tải lại trang sau 3 giây ...', customClass: 'bg-red-pink' });
                    setTimeout(function() {
                        loadingInstance.close();
                        setTimeout(function() {
                            location.href = "/";
                        }, 300);
                    }, 3000);
                }

            });

    },
    CREATE_QUIZ(state) {

        if (state.input.question.length > 1 &&
            state.input.answer.length > 1 &&
            state.input.answer2.length > 1 &&
            state.input.answer3.length > 1 &&
            state.input.answer4.length > 1) {
            MessageBox.confirm('Bạn đã hoàn thành soạn thảo và muốn tạo câu hỏi ?', 'Thông báo', {
                confirmButtonText: 'Đúng vậy',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                state.input.author = state.user.email;
                state.input.create_time = new Date().toLocaleString('vi', options);

                dataRef
                    .child(state.subject.path)
                    .child(state.subject.subpath)
                    .once('value', (snapshot) => {
                        let nChild = snapshot.numChildren();
                        let path = state.subject.path;
                        let subpath = state.subject.subpath;
                        console.info(path + "/" + subpath + "/" + Number(nChild + 1));
                        //Set quiz
                        dataRef
                            .child(path)
                            .child(subpath)
                            .child(nChild + 1)
                            .set(state.input);

                        userRef
                            .child(state.user.uid)
                            .child('cauhoi').child(path)
                            .child(subpath)
                            .child(nChild + 1)
                            .set(state.input);

                        state.input.question = "";
                        state.input.question_image = "";
                        state.input.answer = "";
                        state.input.answer2 = "";
                        state.input.answer3 = "";
                        state.input.answer4 = "";
                        state.input.hint = "";
                        state.input.hint_image = "";
                        state.input.slove = "";
                        state.input.slove_image = "";



                    }).then((snapshot) => {

                        let loadingInstance = Loading.service({
                            text: 'Đang tạo câu hỏi số ' + Number(snapshot.numChildren() + 1),
                            customClass: 'bg-green'
                        });
                        setTimeout(function() {
                            loadingInstance.close();

                            Notification({
                                message: 'Đã tạo câu hỏi thành công!',
                                type: 'success'
                            });

                        }, 1234);
                    }).catch((error) => {
                        console.log(error);
                        let loadingInstance = Loading.service({ text: 'Có lỗi ...', customClass: 'bg-red-pink' });
                        setTimeout(function() {
                            loadingInstance.close();

                            Notification({
                                message: 'Đã  có lỗi khi tạo câu hỏi và ngân hàng câu hỏi. Kiểm tra kết nối của bạng, đảm bảo bạn có kết nối mạng !',
                                type: 'error'
                            });
                        }, 1000);
                    });
                //Do
            }).catch(() => {});
        } else {

            console.log(state.subject.path + "/" + state.subject.subpath);
            Notification({
                message: 'Bạn chưa soạn thảo xong câu hỏi, hãy kiểm tra lại!',
                type: 'warning'
            });
        }

    },
    RESET_INPUT(state) {
        MessageBox.confirm('Bạn có muốn xóa hết các mục đã nhập?', 'Thông báo', {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
            type: 'warning'
        }).then(() => {
            Notification({
                message: 'Đã xóa các mục đã nhập!',
                type: 'success'
            });
            //Do
            let value = '';
            state.input.question = value;
            state.input.question_image = value;
            state.input.answer = value;
            state.input.answer2 = value;
            state.input.answer3 = value;
            state.input.answer4 = value;
            state.input.hint = value;
            state.input.hint_image = value;
            state.input.slove = value;
            state.input.slove_image = value;
        }).catch(() => {});
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
