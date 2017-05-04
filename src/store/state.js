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
        tilte: '',
        toan: {
            num_hamso: 'Đang tải...',
            my_num_hamso: 'Đang tải...',
            num_mu_logarit: 'Đang tải...',
            my_num_mu_logarit: 'Đang tải...',
            num_nguyenham_tichphan: 'Đang tải...',
            my_num_nguyenham_tichphan: 'Đang tải...',
            num_sophuc: 'Đang tải...',
            my_num_sophuc: 'Đang tải...',
            num_khoi_da_dien: 'Đang tải...',
            my_num_khoi_da_dien: 'Đang tải...',
            num_khoi_tron_xoay: 'Đang tải...',
            my_num_khoi_tron_xoay: 'Đang tải...',
            num_toado_khonggian: 'Đang tải...',
            mynum_toado_khonggian: 'Đang tải...'
        }
    },

    singin: false, //Check if was singin!
};
