import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_FETCH_MENU': {
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