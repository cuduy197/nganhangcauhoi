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
        total_cur_quiz: 0,
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
        toan: [

            {
                title: 'Hàm số và các bài toán liên quan',
                subpath: 'hamso',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Mũ và logarit',
                subpath: 'mu_logarit',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Nguyên hàm - tích phân và ứng dụng',
                subpath: 'nguyenham_tichphan',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Số phức',
                subpath: 'sophuc',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Thể tích khối đa diện',
                subpath: 'khoi_da_dien',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Khối tròn xoay',
                subpath: 'khoi_tron_xoay',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }, {
                title: 'Phương pháp tọa độ không gian',
                subpath: 'toado_khonggian',
                num: 'Đang tải...',
                my_num: 'Đang tải...'
            }
        ],
        anh: [{
            title: 'Tiếng anh',
            subpath: '',
            num: 'Đang tải...',
            my_num: 'Đang tải...'
        }],
        van: [{
            title: 'Ngữ văn',
            subpath: '',
            num: 'Đang tải...',
            my_num: 'Đang tải...'
        }]
    },

    singin: false, //Check if was singin!
};
