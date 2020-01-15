import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_LOGIN': {
            let { logIn: { status, login, password } } = state;

            status = true;
            login = action.value.login;
            password = action.value.password;

            return { ...state, logIn: { status, login, password } };
        }

//TOGGLE
        
        case 'TOGGLE_ADD_POST': { //ADD POST
            let { components, components: { Content, Content: { modeAddPost } } } = state;
            let status = action.value;

            if (status === undefined) status = !modeAddPost;

            return { ...state, components: { ...components, Content: { ...Content, modeAddPost: status } } };
        }

        case 'TOGGLE_EDIT_POST': { //EDIT POST
            const { components, components: { Content, Content: { modeEditPost } } } = state;
            let status = action.value;

            if (status === undefined) status = !modeEditPost;

            return { ...state, components: { ...components, Content: { ...Content, modeEditPost: status } } };
        }

        case 'TOGGLE_ADD_MENU': { //ADD MENU
            const { components, components: { Menu, Menu: { modeAddMenu } } } = state;
            let status = action.value;

            if (status === undefined) status = !modeAddMenu

            return { ...state, components: { ...components, Menu: { ...Menu, modeAddMenu: status } } };
        }

//END TOGGLE


//UPDATES
        case 'UPDATE_MENU': {
            const { api } = state;
            const menuList = action.value;

            return { ...state, api: { ...api, menu: menuList } }
        }

        case 'UPDATE_POSTS': {
            const { api, api: { menu } } = state
            const { ID_MENU, contentList } = action.value;

            const num = menu.findIndex(({ ID }) => ID === ID_MENU);

            menu[num].postList = contentList;

            return { ...state, api: { ...api, menu } }
        }
//END UPDATES

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
    s_toggleAddPost = ({ components }) => {
        return components.Content.modeAddPost;
    }
    s_statusEditPost = ({ components }) => {
        return components.Content.modeEditPost;
    }
    s_toggleAddMenu = ({ components }) => {
        return components.Menu.modeAddMenu;
    }
    
}

export const selectors = new Selectors();

export default reducer;