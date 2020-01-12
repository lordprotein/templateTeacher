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

            return { ...state, logIn: { status, login, password } };
        }
        case 'TOGGLE_EDIT_CONTENT': {
            let { components, components: { Content, Content: { modeAddPost } } } = state;
            
            modeAddPost = !modeAddPost;

            return { ...state, components: { ...components, Content: { ...Content, modeAddPost } } };
        }
        // case 'ADD_POST': {
        //     const newContent = action.value;
        //     const { ID_MENU } = newContent;
        //     const menu = state.api.menu;

        //     for (let menuItem in menu) {
        //         if (menu.ID === ID_MENU) {
        //             menuItem.postList = { ...menuItem.postList, }
        //         }
        //     }

        //     return {}
        // }

        default: return state;
    }
}

class Selectors {
    menuList = ({ api }) => {
        return api.menu;
    }
    statusAuthoriz = ({ logIn }) => {
        return logIn.status;
    }
    loginData = ({ logIn }) => {
        return { login: logIn.login, password: logIn.password }
    }
    toggleEditContent = ({ components }) => {
        return components.Content.modeAddPost;
    }
}

export const selectors = new Selectors();

export default reducer;