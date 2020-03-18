const initState = {
    api: {
        menu: [],
        postList: []
    },
    isLogged: {
        status: false,
    },
    downloadFilesForm: {
        isActive: false,
        typeFiles: '',
        inputAttr: '',
        fileList: [],
    },
    settings: {
        siteName: 'default',
        color: 'red',
        mainImg: ''
    }
}

export default initState;