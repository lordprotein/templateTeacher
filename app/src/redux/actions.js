// export const a_setFetchMenu = value => ({ type: 'SET_FETCH_MENU', value });
export const a_setLogIn = value => ({ type: 'SET_LOGIN', value });

export const a_updateMenu = value => ({ type: 'UPDATE_MENU', value });
export const a_updateContent = value => ({ type: 'UPDATE_POSTS', value });

//Menu
export const a_toToggleAddMenu = value => ({ type: 'TOGGLE_ADD_MENU', value });
export const a_toToggleAddSubMenu = value => ({ type: 'TOGGLE_ADD_SUB_MENU', value });
export const a_toToggleEditMenu = value => ({ type: 'TOGGLE_EDIT_MENU', value });
//Menu end


//Post
export const a_toToggleAddPost = value => ({ type: 'TOGGLE_ADD_POST', value });
export const a_toToggleEditPost = value => ({ type: 'TOGGLE_EDIT_POST', value });
//Post end

export const a_removeAllModes = () => ({ type: 'REMOVE_ALL_MODES' });