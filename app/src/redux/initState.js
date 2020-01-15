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
            // title: '',
            // content: '',
        }
    }
}

export default initState;