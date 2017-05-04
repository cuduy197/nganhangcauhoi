import firebase from 'firebase';
import { db, userRef, dataRef } from "./firebase_init.js";
import { Message } from 'element-ui';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';

export const mutations = {
    SYNC(state) {
        //[watch reload]
        watchReload();
        setPath(state);
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
                // [END_EXCLUDE]
            } else {
                // User is signloadingInstance.close();ed out.
                // [START_EXCLUDE]
                state.singin = false;
                loadingInstance.close();
                if (pathname != '/') {
                    window.location.href = '#/';
                }
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

    VIEW_QUIZ(state, payload) {
        window.scrollTo(0, 0);

        console.log(state.quiz.custom);
        state.subject.path = (location.hash).replace('create', '').match(/[^#/]/g).join('');
        state.subject.subpath = payload.subpath;
        let p = state.subject.path;
        let s = state.subject.subpath;
        console.info("View:" + payload.view + "||" + p + "/" + s);

        //[Get total numChildren]
        dataRef.child(p).child(s).once('value', (snapshot) => {
            state.quiz.numChildren = Number(snapshot.numChildren());
        });

        //[View All]
        if (payload.view == 'all') {
            state.quiz.author = "";
            state.quiz.custom = 0;
            state.quiz.val = [];
            let loadingInstance = Loading.service({ text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...', customClass: 'bg-green' });
            dataRef
                .child(p)
                .child(s)
                .orderByKey()
                .startAt(String(payload.begin))
                .endAt(String(payload.end))
                .once('value', (snapshot) => {
                    let n = snapshot.numChildren();
                    if (Number(n) > 0 && n !== null) {

                        setTimeout(function() {
                            console.info(`|${n}|`);
                            snapshot.forEach(function(item) {
                                var itemVal = item.val();
                                state.quiz.val.push(itemVal);
                            });
                            loadingInstance.close();
                        }, 777);
                    } else {
                        loadingInstance.close();
                        loadingInstance = Loading.service({ text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!', customClass: 'bg-red-pink' });
                        setTimeout(function() {
                            loadingInstance.close();
                        }, 4000);
                    }
                });
        }
        //[Custom]
        if (payload.view == 'custom') {
            if (Number(state.quiz.numChildren) > 0) {
                // statement
                MessageBox.prompt(`Nhập số thứ tự câu hỏi trong khoảng từ [ 1 ] đến [ ${state.quiz.numChildren} ]`, 'Thông báo', {
                    confirmButtonText: 'Hiển thị',
                    cancelButtonText: 'Hủy',
                    inputPattern: /^[0-9]+$/,
                    inputErrorMessage: `Vui lòng nhập số trong khoảng từ [ 1 ] đến [ ${state.quiz.numChildren} ]`
                }).then(input => {

                    console.log(String(input.value));
                    let loadingInstance = Loading.service({ text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...', customClass: 'bg-green' });
                    dataRef
                        .child(p)
                        .child(s)
                        .child(String(input.value))
                        .once('value', (snapshot) => {
                            let n = snapshot.numChildren();

                            if (snapshot.val() === null) {
                                loadingInstance.close();
                                loadingInstance = Loading.service({ text: 'Câu hỏi không tồn tại', customClass: 'bg-red-pink' });
                                setTimeout(function() {
                                    loadingInstance.close();
                                }, 1000);
                            } else {
                                state.quiz.custom = input.value;
                                state.quiz.val = [];
                                state.quiz.val.push(snapshot.val());
                                setTimeout(function() {
                                    loadingInstance.close();
                                }, 500);
                            }

                        });
                }).catch(() => {
                    state.quiz.custom = 0;
                });
            } else {
                let loadingInstance = Loading.service({ text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!', customClass: 'bg-red-pink' });
                setTimeout(function() {
                    loadingInstance.close();
                }, 1000);
            }
        }

        //[Author]
        if (payload.view == 'author') {
            if (!payload.myquiz) {
                // statement
                if (Number(state.quiz.numChildren) > 0) {
                    MessageBox.prompt(`Nhập email của người soạn câu hỏi `, 'Thông báo ', {
                        confirmButtonText: 'Hiển thị',
                        cancelButtonText: 'Hủy',
                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        inputErrorMessage: 'Vui lòng kiểm tra Email'
                    }).then(input => {
                        console.log(String(input.value));
                        let loadingInstance = Loading.service({ text: `Đang tải dữ liệu của [${input.value}]`, customClass: 'bg-green' });
                        dataRef
                            .child('users')
                            .child(String((input.value).split("@")[0]))
                            .child(p)
                            .child(s)
                            .orderByKey()
                            .startAt(String(payload.begin))
                            .endAt(String(payload.end))
                            .once('value', (snapshot) => {
                                let n = snapshot.numChildren();
                                console.log(n);
                                if (snapshot.numChildren() !== 0) {
                                    setTimeout(function() {
                                        console.info(`|${n}|`);
                                        state.quiz.val = [];
                                        snapshot.forEach(function(item) {
                                            var itemVal = item.val();
                                            state.quiz.val.push(itemVal);
                                        });
                                        loadingInstance.close();
                                    }, 777);
                                } else {
                                    loadingInstance.close();
                                    loadingInstance = Loading.service({ text: `Không tồn tại dữ liệu của [${input.value}]`, customClass: 'bg-red-pink' });
                                    setTimeout(function() {
                                        loadingInstance.close();
                                    }, 3000);
                                }
                            });
                    }).catch(() => {});
                } else {
                    let loadingInstance = Loading.service({ text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!', customClass: 'bg-red-pink' });
                    setTimeout(function() {
                        loadingInstance.close();
                    }, 1000);
                }
            }

            if (payload.myquiz) {
                if (Number(state.quiz.numChildren) > 0) {
                    let loadingInstance = Loading.service({ text: `Đang tải dữ liệu của [${state.user.email}]`, customClass: 'bg-green' });
                    dataRef
                        .child('users')
                        .child(String((state.user.email).split("@")[0]))
                        .child(p)
                        .child(s)
                        .orderByKey()
                        .startAt(String(payload.begin))
                        .endAt(String(payload.end))
                        .once('value', (snapshot) => {
                            let n = snapshot.numChildren();
                            console.log(snapshot.val());
                            console.log(n);
                            if (snapshot.numChildren() !== 0) {
                                setTimeout(function() {
                                    state.quiz.author = state.user.email;
                                    console.info(`${state.quiz.author} : |${n}| quizz`);
                                    state.quiz.val = [];
                                    snapshot.forEach(function(item) {
                                        var itemVal = item.val();
                                        state.quiz.val.push(itemVal);
                                    });
                                    loadingInstance.close();
                                }, 777);
                            } else {
                                loadingInstance.close();
                                loadingInstance = Loading.service({ text: `Bạn chưa tạo câu hỏi trong mục này !`, customClass: 'bg-red-pink' });
                                setTimeout(function() {
                                    loadingInstance.close();
                                }, 2000);
                            }
                        });

                } else {
                    let loadingInstance = Loading.service({ text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!', customClass: 'bg-red-pink' });
                    setTimeout(function() {
                        loadingInstance.close();
                    }, 1000);
                }
            }
        }
    },
    BEFORE_CREATE_QUIZ(state, subpath) {
        state.quiz.edit = false;
        resetInput(state);
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
                state.quiz.numChildren = Number(d.numChildren());
                setTimeout(function() {
                    loadingInstance.close();
                }, 777);
            });
    },
    BEFORE_EDIT_QUIZ(state, payload) {
        window.scrollTo(0, 0);
        console.info(state.subject.path + "/" + state.subject.subpath);
        let loadingInstance = Loading.service({ text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...', customClass: 'bg-green' });
        dataRef
            .child(state.subject.path)
            .child(state.subject.subpath)
            .child(String(payload.id))
            .once('value', (snapshot) => {
                state.input = snapshot.val();
                state.quiz.edit = true;
                state.quiz.edit_child = String(payload.id);
                state.quiz.edit_user_child = String(payload.id_in_user);

                setTimeout(function() {
                    loadingInstance.close();
                }, 777);
            });
    },
    CREATE_QUIZ(state) {

        if (state.input.question.length > 1 &&
            state.input.answer.length > 0 &&
            state.input.answer2.length > 0 &&
            state.input.answer3.length > 0 &&
            state.input.answer4.length > 0) {
            MessageBox.confirm('Bạn đã hoàn thành soạn thảo ?', 'Thông báo', {
                confirmButtonText: 'Đúng vậy',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                state.input.author = state.user.email;
                state.input.create_time = new Date().toLocaleString('vi', options);

                if (!state.quiz.edit) {
                    //1 [GET DATABANK]
                    dataRef
                        .child(state.subject.path)
                        .child(state.subject.subpath)
                        .once('value', (snapshot) => {
                            const n = snapshot.numChildren();
                            let p = state.subject.path;
                            let s = state.subject.subpath;
                            //console.info(p + "/" + s + "/" + Number(n + 1));
                            state.input.id = Number(n + 1);
                            //2 [Set data to databank]
                            dataRef
                                .child(p)
                                .child(s)
                                .child(n + 1)
                                .set(state.input);
                            //3 [Call user data]
                            dataRef
                                .child('users')
                                .child(String((state.user.email).split("@")[0]))
                                .child(p)
                                .child(s)
                                .once('value', (snapshot) => {
                                    console.log(n);
                                    state.input.id_in_user = Number(snapshot.numChildren() + 1);
                                    //4 [UPDATE id_in_user to User data]
                                    dataRef
                                        .child('users')
                                        .child(String((state.user.email).split("@")[0]))
                                        .child(p)
                                        .child(s)
                                        .child(Number(snapshot.numChildren() + 1))
                                        .set(state.input);
                                    //5 [UPDATE id_in_user to Databank]
                                    dataRef
                                        .child(p)
                                        .child(s)
                                        .child(n + 1)
                                        .update({ id_in_user: Number(snapshot.numChildren() + 1) });

                                }).then(() => {
                                    resetInput(state);
                                });


                            /* //[DEV]
                             for (let i = 1; i < 100; i++) {
                                 state.input.id = i;
                                 state.input.question = "CÂU HỎI: " + i;
                                 dataRef
                                     .child(p)
                                     .child(s)
                                     .child(i)
                                     .set(state.input);
                                 dataRef
                                     .child('users')
                                     .child(String((state.user.email).split("@")[0]))
                                     .child(p)
                                     .child(s)
                                     .child(i)
                                     .set(state.input);
                             } //end DEV*/


                        }).then((snapshot) => {
                            console.info('$CREATED QUIZ!');
                            //[Reset input]

                            let loadingInstance = Loading.service({
                                text: 'Đang tạo câu hỏi số [ ' + Number(snapshot.numChildren() + 1) + ' ]',
                                customClass: 'bg-green'
                            });
                            setTimeout(function() {
                                loadingInstance.close();

                                Notification({
                                    message: `Đã tạo câu hỏi số [ ${ Number(snapshot.numChildren() + 1)} ] thành công!`,
                                    type: 'success'
                                });

                            }, 1234);
                        }).catch((error) => {
                            Notification({
                                message: 'Đã  có lỗi khi tạo câu hỏi và ngân hàng câu hỏi. Kiểm tra kết nối của bạng, đảm bảo bạn có kết nối mạng !',
                                type: 'error'
                            });
                        });
                }


                if (state.quiz.edit) {
                    console.log('EDIT');
                    let p = state.subject.path;
                    let s = state.subject.subpath;
                    dataRef
                        .child(p)
                        .child(s)
                        .child(state.quiz.edit_child)
                        .update(state.input).then(() => {
                            //[Update userdata]
                            dataRef
                                .child('users')
                                .child(String((state.user.email).split("@")[0]))
                                .child(p)
                                .child(s)
                                .child(state.quiz.edit_user_child)
                                .update(state.input);

                            console.log('Update done!');
                            let loadingInstance = Loading.service({
                                text: 'Đang cập nhật... ',
                                customClass: 'bg-green'
                            });
                            setTimeout(function() {
                                loadingInstance.close();
                                Notification({
                                    message: 'Đã cập nhật thành công!',
                                    type: 'success'
                                });
                            }, 1234);
                        }).catch((error) => {
                            Notification({
                                message: 'Đã  có lỗi khi tạo câu hỏi và ngân hàng câu hỏi. Kiểm tra kết nối của bạng, đảm bảo bạn có kết nối mạng !',
                                type: 'error'
                            });
                        });
                }


                //Do
            }).catch(() => {});
        } else {
            Notification({ message: 'Bạn chưa soạn thảo xong câu hỏi, hãy kiểm tra lại!', type: 'warning' });
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
            resetInput(state);
        }).catch(() => {});
    },
    //[INPUT update] 
    updateQuestion(state, value) { state.input.question = value; },
    updateQuestion_image(state, value) { state.input.question_image = value; },
    updateAnswer(state, value) { state.input.answer = value; },
    updateAnswer2(state, value) { state.input.answer2 = value; },
    updateAnswer3(state, value) { state.input.answer3 = value; },
    updateAnswer4(state, value) { state.input.answer4 = value; },
    updateHint(state, value) { state.input.hint = value; },
    updateHint_image(state, value) { state.input.hint_image = value; },
    updateSlove(state, value) { state.input.slove = value; },
    updateSlove_image(state, value) { state.input.slove_image = value; },

};


function resetInput(state) {
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
}




function watchReload() {
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
}

let loadingInstance;

function setPath(state) {
    //Fix pathname like http://localhost:8080/toan#/toan --> http://localhost:8080/#/
    if (location.pathname != "/") {
        location.href = "/";
    }
    //[Get current location hash]
    if (location.hash !== '#/') {
        state.subject.path = (location.hash).replace('create', '').match(/[^#/]/g).join('');
        console.log(state.subject.path);
    }
    // fix subpath when reload
    if (state.subject.subpath === "") {
        window.location.hash = '#/' + state.subject.path;
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

}
