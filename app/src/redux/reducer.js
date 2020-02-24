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
            // const { api, api: { menu } } = state;
            // const { ID_MENU, postList } = action.value;

            // const num = menu.findIndex(({ ID }) => ID === ID_MENU);

            // menu[num].postList = postList;

            // return {
            //     ...state,
            //     api: {
            //         ...api,
            //         postList: menu
            //     }
            // };
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
}

export const selectors = new Selectors();

export default reducer;