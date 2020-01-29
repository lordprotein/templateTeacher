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
            const { api } = state;
            const menuList = action.value;

            return {
                ...state,
                api: {
                    ...api,
                    menu: menuList
                }
            };
        }

        case 'UPDATE_POSTS': {
            const { api, api: { menu } } = state;
            const { ID_MENU, contentList } = action.value;

            const num = menu.findIndex(({ ID }) => ID === ID_MENU);

            menu[num].postList = contentList;

            return {
                ...state,
                api: {
                    ...api, menu
                }
            };
        }
        //END UPDATES
        default: return state;
    }
}


class Selectors {
    menuList = ({ api }) => {
        return api.menu;
    }
    isLogIn = ({ logIn }) => {
        return logIn.status;
    }
    loginData = ({ logIn }) => {
        return { login: logIn.login, password: logIn.password }
    }
}

export const selectors = new Selectors();

export default reducer;