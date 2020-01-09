import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'GET_ALL_MENU_DATA': {
            //if
            const { api } = state;
            return { ...state, api: { ...api, menu: action.value } }

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