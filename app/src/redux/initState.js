const initState = {
    api: {
        menu: [],
    },
    logIn: {
        status: true,
        login: 'admin',
        password: '1234',
    },
    components: {
        Content: {
            modeAddPost: false,
            modeEditPost: false,
        },
        Menu: {
            modeAddMenu: false,
            modeAddSubMenu: false,
            modeEditMenu: false,
            // title: '',
            // content: '',
        }
    }
}

export default initState;