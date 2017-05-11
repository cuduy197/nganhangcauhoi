import firebase from 'firebase';
import {
    db,
    userRef,
    dataRef
} from "./firebase_init.js";
import {
    Message
} from 'element-ui';
import {
    Notification
} from 'element-ui';
import {
    Loading
} from 'element-ui';
import {
    MessageBox
} from 'element-ui';

export const mutations = {
    SYNC(state) {
        //[watch reload]
        watchReload();
        setPath(state);
        // Listening for auth state changes.
        // [START authstatelistener]
        let onDataChange;
        firebase.auth()
            .onAuthStateChanged(function(user) {
                if (user) {
                    // [GET USER DATA]
                    // User is signed in.
                    state.user.email = user.email;
                    state.user.photoURL = user.photoURL;
                    state.user.uid = user.uid;
                    // [START_EXCLUDE]
                    setTimeout(() => {
                        loadingInstance.close();
                    }, 777);
                    state.singin = true;
                    var UserUID = userRef.child(user.uid);
                    UserUID.update({
                        login: true,
                        email: user.email
                    });
                    getNum_MyNum_Subject(state);
                    onDataChange = function(snapshot) {
                        console.info('DataRef has Changed!');
                        getNum_MyNum_Subject(state);
                    };
                    dataRef.on('value', onDataChange);

                    // [END_EXCLUDE]
                } else {
                    dataRef.off('value', onDataChange);
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
        let loadingInstance = Loading.service({
            text: 'Đăng nhập ...',
            customClass: 'bg-green'
        });
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth()
            .signInWithRedirect(provider);
    }, //end
    LOGOUT() {
        MessageBox.confirm('Bạn có muốn đăng xuất?', 'Thông báo', {
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                type: 'warning'
            })
            .then(() => {
                let loadingInstance = Loading.service({
                    text: 'Đăng xuất ...',
                    customClass: 'bg-red-pink'
                });
                firebase.auth()
                    .signOut();
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
            })
            .catch(() => {});
    },
    VIEW_QUIZ(state, payload) {
        window.scrollTo(0, 0);
        console.log(state.quiz.custom);
        state.subject.path = location.hash.split('/')[1];
        state.subject.subpath = payload.subpath;
        const p = state.subject.path;
        const s = state.subject.subpath;
        const m = String((state.user.email)
            .split("@")[0]);

        console.info(payload.view + "||" + p + "/" + s);

        //[Get total numChildren]
        dataRef.child(`${p}/${s}`)
            .once('value', (snapshot) => {
                state.quiz.numChildren = Number(snapshot.numChildren());
            });

        //[View All]
        if (payload.view == 'all') {
            state.quiz.author = "";
            state.quiz.custom = 0;
            state.quiz.val = [];

            dataRef.child(`${p}/${s}`)
                .orderByKey()
                .startAt(String(payload.begin))
                .endAt(String(payload.end))
                .once('value', (snapshot) => {
                    let n = snapshot.numChildren();
                    if (Number(n) > 0 && n !== null) {
                        let loadingInstance = Loading.service({
                            text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...',
                            customClass: 'bg-green'
                        });
                        setTimeout(function() {
                            snapshot.forEach(function(item) {
                                var itemVal = item.val();
                                state.quiz.val.push(itemVal);
                            });
                            loadingInstance.close();
                        }, 777);
                    } else {
                        console.log('No data!');
                        let loading = Loading.service({
                            text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!',
                            customClass: 'bg-red-pink'
                        });
                        setTimeout(function() {
                            loading.close();
                        }, 1000);
                    }
                });
        }
        //[View custom]
        if (payload.view == 'custom') {
            if (Number(state.quiz.numChildren) > 0) {
                // statement
                MessageBox.prompt(`Nhập số trong khoảng từ [ 1 ] đến [ ${state.quiz.numChildren} ]`, 'Hiển thị theo số thứ tự', {
                        confirmButtonText: 'Hiển thị ',
                        cancelButtonText: 'Hủy',
                        inputPattern: /^[0-9]+$/,
                        inputErrorMessage: `Nhập số trong khoảng từ [ 1 ] đến [ ${state.quiz.numChildren} ]`
                    })
                    .then(input => {
                        const i = String(input.value);
                        let loadingInstance = Loading.service({
                            text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...',
                            customClass: 'bg-green'
                        });
                        dataRef.child(`${p}/${s}/${i}`)
                            .once('value', (snapshot) => {
                                let n = snapshot.numChildren();

                                if (snapshot.val() === null) {
                                    loadingInstance.close();
                                    loadingInstance = Loading.service({
                                        text: 'Câu hỏi không tồn tại',
                                        customClass: 'bg-red-pink'
                                    });
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
                    })
                    .catch(() => {});
            } else {
                let loadingInstance = Loading.service({
                    text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!',
                    customClass: 'bg-red-pink'
                });
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
                    MessageBox.prompt(`Nhập email của người soạn câu hỏi `, 'Hiển thị theo email', {
                            confirmButtonText: 'Hiển thị',
                            cancelButtonText: 'Hủy',
                            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                            inputErrorMessage: 'Vui lòng kiểm tra Email'
                        })
                        .then(input => {
                            console.log(String(input.value));
                            const i = String((input.value)
                                .split("@")[0]);
                            console.log(`users/${i}/${p}/${s}`);
                            let loadingInstance = Loading.service({
                                text: `Đang tải dữ liệu của [${input.value}]`,
                                customClass: 'bg-green'
                            });
                            dataRef.child(`users/${i}/${p}/${s}`)
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
                                        loadingInstance = Loading.service({
                                            text: `Không tồn tại dữ liệu của [${input.value}]`,
                                            customClass: 'bg-red-pink'
                                        });
                                        setTimeout(function() {
                                            loadingInstance.close();
                                        }, 3000);
                                    }
                                });
                        })
                        .catch(() => {});
                } else {
                    let loadingInstance = Loading.service({
                        text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!',
                        customClass: 'bg-red-pink'
                    });
                    setTimeout(function() {
                        loadingInstance.close();
                    }, 1000);
                }
            }

            if (payload.myquiz) {
                if (Number(state.quiz.numChildren) > 0) {

                    dataRef.child(`users/${m}/${p}/${s}`)
                        .orderByKey()
                        .startAt(String(payload.begin))
                        .endAt(String(payload.end))
                        .once('value', (snapshot) => {
                            let n = snapshot.numChildren();

                            if (n !== 0) {
                                let loadingInstance = Loading.service({
                                    text: `Đang tải dữ liệu của [${state.user.email}]`,
                                    customClass: 'bg-green'
                                });
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

                                let loadingInstance = Loading.service({
                                    text: `Bạn chưa tạo câu hỏi trong mục này !`,
                                    customClass: 'bg-red-pink'
                                });
                                setTimeout(function() {
                                    loadingInstance.close();
                                }, 2000);
                            }
                        });

                } else {
                    let loadingInstance = Loading.service({
                        text: 'Chưa có câu hỏi trong ngân hàng câu hỏi!',
                        customClass: 'bg-red-pink'
                    });
                    setTimeout(function() {
                        loadingInstance.close();
                    }, 1000);
                }
            }
        }
    },
    BEFORE_CREATE_QUIZ(state, subpath) {
        window.scrollTo(0, 0);
        resetInput(state);
        state.quiz.edit = false;
        state.subject.path = location.hash.split('/')[1];
        state.subject.subpath = subpath;
        const p = state.subject.path;
        const s = state.subject.subpath;
        console.info(`${p}/${s}`);
        let loadingInstance = Loading.service({
            text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...',
            customClass: 'bg-green'
        });
        setTimeout(function() {
            loadingInstance.close();
        }, 1234);
        let onValueChange = (snapshot) => {
            console.info(snapshot.numChildren());
            state.quiz.numChildren = Number(snapshot.numChildren() + 1);
            getNum_MyNum_Subject(state);
        };

        dataRef.child(`${p}/${s}`)
            .on('value', onValueChange);
    },
    BEFORE_EDIT_QUIZ(state, payload) {
        window.scrollTo(0, 0);
        const p = state.subject.path;
        const s = state.subject.subpath;
        const id = payload.id;
        console.info(`${p}/${s}/${id}`);
        let loadingInstance = Loading.service({
            text: 'Đang tải dữ liệu từ ngân hàng câu hỏi ...',
            customClass: 'bg-green'
        });
        dataRef.child(`${p}/${s}/${id}`)
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

        if (state.input.question.length > 1 && state.input.answer.length > 0 && state.input.answer2.length > 0 && state.input.answer3.length > 0 && state.input.answer4.length > 0) {
            MessageBox.confirm('Bạn đã hoàn thành soạn thảo ?', 'Thông báo', {
                    confirmButtonText: 'Đúng vậy',
                    cancelButtonText: 'Hủy',
                    type: 'warning'
                })
                .then(() => {
                    let options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    };
                    state.input.author = state.user.email;
                    state.input.create_time = new Date()
                        .toLocaleString('vi', options);
                    const p = state.subject.path;
                    const s = state.subject.subpath;
                    const m = String((state.user.email)
                        .split("@")[0]);
                    //[CREATE MODE]
                    if (!state.quiz.edit) {
                        //1 [GET DATABANK]
                        dataRef.child(`${p}/${s}`)
                            .once('value', (snapshot) => {
                                const n = snapshot.numChildren();

                                /*         //[DEV]
                            for (let i = 100; i < 200; i++) {
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
                                    .child(Number(i - 100))
                                    .set(state.input);
                            } //end DEV
*/

                                //[Call user data]

                                let loadingInstance = Loading.service({
                                    text: 'Đang tạo câu hỏi số [ ' + Number(snapshot.numChildren() + 1) + ' ]',
                                    customClass: 'bg-green'
                                });
                                dataRef.child(`users/${m}/${p}/${s}`)
                                    .once('value', (snapshot) => {
                                        const nChild = Number(snapshot.numChildren() + 1);
                                        state.input.id = Number(n + 1);
                                        state.input.id_in_user = Number(snapshot.numChildren() + 1);
                                        //[UPDATE id_in_user to User data]
                                        dataRef.child(`users/${m}/${p}/${s}/${nChild}`)
                                            .set(state.input);
                                        // [Set data to databank]
                                        dataRef.child(`${p}/${s}/${n + 1}`)
                                            .set(state.input);

                                    })
                                    .then(() => {
                                        console.info('$CREATED QUIZ!');
                                        setTimeout(function() {
                                            loadingInstance.close();
                                        }, 2000);
                                        resetInput(state);
                                    });

                            })
                            .then((snapshot) => {
                                setTimeout(function() {
                                    if (window.innerWidth > 800) {
                                        Message({
                                            message: `Đã tạo câu hỏi số [ ${Number(snapshot.numChildren() + 1)} ] !`,
                                            type: 'success'
                                        });
                                    } else {
                                        Notification({
                                            message: `Đã tạo câu hỏi số [ ${Number(snapshot.numChildren() + 1)} ] !`,
                                            type: 'success'
                                        });
                                    }
                                }, 1234);
                            })
                            .catch((error) => {
                                loadingInstance.close();
                                Notification({
                                    message: 'Đã  có lỗi khi tạo câu hỏi và ngân hàng câu hỏi. Kiểm tra kết nối của bạng, đảm bảo bạn có kết nối mạng !',
                                    type: 'error'
                                });
                            });
                    }
                    //[EDIT MODE]
                    if (state.quiz.edit) {
                        console.log('EDIT');
                        const e = state.quiz.edit_child;
                        const u = state.quiz.edit_user_child;
                        dataRef.child(`${p}/${s}/${e}`)
                            .update(state.input)
                            .then(() => {
                                //[Update userdata]
                                dataRef.child(`users/${m}/${p}/${s}/${u}`)
                                    .update(state.input);
                                console.log('Update done!');
                                let loadingInstance = Loading.service({
                                    text: 'Đang cập nhật... ',
                                    customClass: 'bg-green'
                                });
                                setTimeout(function() {
                                    loadingInstance.close();

                                    if (window.innerWidth > 800) {
                                        Message({
                                            message: 'Đã cập nhật thành công!',
                                            type: 'success'
                                        });
                                    } else {
                                        Notification({
                                            message: 'Đã cập nhật thành công!',
                                            type: 'success'
                                        });
                                    }

                                }, 1234);
                            })
                            .catch((error) => {
                                Notification({
                                    message: 'Đã  có lỗi khi tạo câu hỏi và ngân hàng câu hỏi. Kiểm tra kết nối của bạng, đảm bảo bạn có kết nối mạng !',
                                    type: 'error'
                                });
                            });
                    }
                    //Do
                })
                .catch(() => {});
        } else {
            if (window.innerWidth > 800) {
                Message({
                    message: 'Bạn chưa soạn thảo xong câu hỏi, hãy kiểm tra lại!',
                    type: 'warning'
                });
            } else {
                Notification({
                    message: 'Bạn chưa soạn thảo xong câu hỏi, hãy kiểm tra lại!',
                    type: 'warning'
                });
            }

        }
    },
    RESET_INPUT(state) {
        MessageBox.confirm('Bạn có muốn xóa hết các mục đã nhập?', 'Thông báo', {
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                type: 'warning'
            })
            .then(() => {
                Notification({
                    message: 'Đã xóa các mục đã nhập!',
                    type: 'success'
                });
                resetInput(state);
            })
            .catch(() => {});
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
    }
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
                    })
                    .then(() => {
                        setTimeout(function() {
                            location.href = "/";
                        }, 200);

                    })
                    .catch(() => {});
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
        state.subject.path = location.hash.split('/')[1];
        // console.log(state.subject.path);
    }
    // fix subpath when reload

    if (state.subject.subpath === "") {
        window.location.hash = '#/' + state.subject.path;
    }
    switch (state.subject.path) {
        case "toan":
            loadingInstance = Loading.service({
                text: 'Toán học',
                customClass: 'bg-indigo'
            });
            break;
        case "anh":
            loadingInstance = Loading.service({
                text: 'Tiếng Anh',
                customClass: 'bg-teal'
            });
            break;
        case "van":
            loadingInstance = Loading.service({
                text: 'Ngữ văn',
                customClass: 'bg-salmon'
            });
            break;
        case "":
            loadingInstance = Loading.service({
                text: 'Đang tải',
                customClass: 'bg-purple'
            });
            break;
        default:
            loadingInstance = Loading.service({
                text: 'Đang tải',
                customClass: 'bg-indigo'
            });
    }

}

//[GET NUMBER STATTIC]
function getNum_MyNum_Subject(state) {
    const userEmail = String((state.user.email)
        .split("@")[0]);

    let Toan = [
        'toan/hamso',
        'toan/mu_logarit',
        'toan/nguyenham_tichphan',
        'toan/sophuc',
        'toan/khoi_da_dien',
        'toan/toado_khonggian',
        'toan/khoi_tron_xoay'
    ];
    //[TOAN]
    dataRef.child(Toan[0])
        .once('value', (snapshot) => {
            state.subject.toan[0].num = snapshot.numChildren();
            dataRef.child('users/' + userEmail + '/' + Toan[0])
                .once('value', (snapshot) => {
                    state.subject.toan[0].my_num = snapshot.numChildren();
                });
        });

    dataRef.child(Toan[1])
        .once('value', (snapshot) => {
            state.subject.toan[1].num = snapshot.numChildren();

            dataRef.child('users/' + userEmail + '/' + Toan[1])
                .once('value', (snapshot) => {
                    state.subject.toan[1].my_num = snapshot.numChildren();

                });
        });

    dataRef.child(Toan[2])
        .once('value', (snapshot) => {
            state.subject.toan[2].num = snapshot.numChildren();

            dataRef.child('users/' + userEmail + '/' + Toan[2])
                .once('value', (snapshot) => {
                    state.subject.toan[2].my_num = snapshot.numChildren();
                });
        });

    dataRef.child(Toan[3])
        .once('value', (snapshot) => {
            state.subject.toan[3].num = snapshot.numChildren();
            dataRef.child('users/' + userEmail + '/' + Toan[3])
                .once('value', (snapshot) => {
                    state.subject.toan[3].my_num = snapshot.numChildren();
                });
        });


    dataRef.child(Toan[4])
        .once('value', (snapshot) => {
            state.subject.toan[4].num = snapshot.numChildren();
            dataRef.child('users/' + userEmail + '/' + Toan[4])
                .once('value', (snapshot) => {
                    state.subject.toan[4].my_num = snapshot.numChildren();
                });
        });

    dataRef.child(Toan[5])
        .once('value', (snapshot) => {
            state.subject.toan[5].num = snapshot.numChildren();
            dataRef.child('users/' + userEmail + '/' + Toan[5])
                .once('value', (snapshot) => {
                    state.subject.toan[5].my_num = snapshot.numChildren();
                });
        });

    dataRef.child(Toan[6])
        .once('value', (snapshot) => {
            state.subject.toan[6].num = snapshot.numChildren();
            dataRef.child('users/' + userEmail + '/' + Toan[6])
                .once('value', (snapshot) => {
                    state.subject.toan[6].my_num = snapshot.numChildren();
                });
        });

}
