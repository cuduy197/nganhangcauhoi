export const state = {
    user: {
        email: 'Đang tải...',
        uid: 'Đang tải...',
        login: '',
        photoURL: '',
        isAdmin: ''
    },
    input: {
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
        create: '',
        val: [],
        numChildren: 0,
        show: false
    },
    subject: {
        path: '',
        subpath: '',
        tilte: ''
    },
    singin: false, //Check if was singin!
};
