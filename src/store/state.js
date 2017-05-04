export const state = {
    user: {
        email: 'Đang tải...',
        uid: 'Đang tải...',
        login: '',
        photoURL: '',
        isAdmin: ''
    },
    input: {
        id: 0,
        id_in_user: 0,
        question: '',
        question_image: '',
        answer: '',
        answer2: '',
        answer3: '',
        answer4: '',
        hint: '',
        hint_image: '',
        slove: '',
        slove_image: '',
        author: '',
        create_time: ''
    },
    quiz: {
        edit: false,
        edit_child: '',
        edit_user_child: '',
        create: '',
        val: [],
        numChildren: 0,
        show: false,
        custom: 0,
        author: ''
    },
    subject: {
        path: '',
        subpath: '',
        tilte: ''
    },
    singin: false, //Check if was singin!
};
