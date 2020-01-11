import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_FETCH_MENU': {
            //if
            const { api } = state;
            return { ...state, api: { ...api, menu: action.value } };
        }
        case 'SET_LOGIN': {
            let { logIn: { status, login, password } } = state;

            status = true;
            login = action.value.login;
            password = action.value.password;
            
            return { ...state, logIn: {status, login, password} };
        }

        default: return state;
    }
}

class Selectors {
    menuList = (state) => {
        return state.api.menu;
    }
}

export const selectors = new Selectors();

export default reducer;