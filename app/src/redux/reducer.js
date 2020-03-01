import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_LOGIN': {
            let { logIn: { status, login, password } } = state;

            status = true;
            login = action.value.login;
            password = action.value.password;

            return {
                ...state,
                logIn: {
                    status, login, password
                }
            };
        }
        //UPDATES
        case 'UPDATE_MENU': {
            const { api, api: { menu } } = state;
            const { isOldMenu } = action.value;
            let { menuList } = action.value;

            if (isOldMenu) menuList = [...menu, ...menuList];

            return {
                ...state,
                api: {
                    ...api,
                    menu: menuList
                }
            };
        }

        case 'UPDATE_POSTS': {
            const { api } = state;
            const postList = action.value;

            return {
                ...state,
                api: {
                    ...api,
                    postList
                }
            };
        }
        //END UPDATES
        case 'TOGGLE_IS_DOWNLOAD_FILES_FORM': {
            let { downloadFilesForm, downloadFilesForm: { isActive } } = state;
            let isToggle = action.value;

            if (isToggle === undefined) {
                isToggle = !isActive;
            }

            return {
                ...state,
                downloadFilesForm: {
                    ...downloadFilesForm,
                    isActive: isToggle
                }
            };
        }

        case 'SET_TYPE_FILES': {
            const { downloadFilesForm } = state;
            const newType = action.value;


            return {
                ...state,
                downloadFilesForm: {
                    ...downloadFilesForm,
                    typeFiles: newType
                }
            }
        }

        case 'SET_FILE_LIST': {
            const { downloadFilesForm } = state;
            const fileList = action.value;

            return {
                ...state,
                downloadFilesForm: {
                    ...downloadFilesForm,
                    fileList
                }
            }
        }

        case 'SET_ACCEPT_ATTR': {
            const { downloadFilesForm } = state;
            const inputAttr = action.value;

            return {
                ...state,
                downloadFilesForm: {
                    ...downloadFilesForm,
                    inputAttr
                }
            }
        }

        default: return state;
    }
}


class Selectors {
    getMenuList = ({ api }) => {
        return api.menu;
    }
    getPostList = ({ api }) => {
        return api.postList;
    }
    isLogIn = ({ logIn }) => {
        return logIn.status;
    }
    loginData = ({ logIn }) => {
        return { login: logIn.login, password: logIn.password }
    }
    isActiveDFF = ({ downloadFilesForm }) => {
        return downloadFilesForm.isActive;
    }
    getTypeFiles = ({ downloadFilesForm }) => {
        return downloadFilesForm.typeFiles;
    }
    getFileList = ({ downloadFilesForm }) => {
        return downloadFilesForm.fileList;
    }
    getAcceptAttr = ({ downloadFilesForm }) => {
        return downloadFilesForm.inputAttr;
    }
}

export const selectors = new Selectors();

export default reducer;