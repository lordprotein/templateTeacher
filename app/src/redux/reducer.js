import initState from './initState';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'IS_LOGGED': {
            const { isLogged } = state;
            const status = action.value;
            return {
                ...state,
                isLogged: {
                    ...isLogged, status
                }
            };
        }

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

        case 'TO_SEQUENCE_POST_LIST': {
            const { api, api: { postList } } = state;
            const { numCurrentItem, numSwitchItem } = action.value;
            console.log(numCurrentItem, numSwitchItem);
            const newPostList = [...postList];

            newPostList[numCurrentItem] = {
                ...postList[numSwitchItem],
                sequence: postList[numCurrentItem].sequence
            };
            newPostList[numSwitchItem] = {
                ...postList[numCurrentItem],
                sequence: postList[numSwitchItem].sequence
            }

            return {
                ...state,
                api: {
                    ...api,
                    postList: newPostList
                }
            };
        }

        // case 'TO_SEQUENCE_MENU_LIST': {
        //     const { api, api: { menu } } = state;
        //     const { numCurrentItem, numSwitchItem } = action.value;

        //     const newMenuList = [...menu];

        //     newMenuList[numCurrentItem] = {
        //         ...menu[numSwitchItem],
        //         sequence: menu[numCurrentItem].sequence
        //     };
        //     newMenuList[numSwitchItem] = {
        //         ...menu[numCurrentItem],
        //         sequence: menu[numSwitchItem].sequence
        //     }

        //     return {
        //         ...state,
        //         api: {
        //             ...api,
        //             menu: newMenuList
        //         }
        //     };
        // }

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


        case 'SET_SETTINGS_SITE_NAME': {
            const { settings } = state;
            const siteName = action.value;

            return {
                ...state,
                settings: {
                    ...settings,
                    siteName
                }
            }
        }

        case 'SET_SETTINGS_COLOR': {
            const { settings } = state;
            const color = action.value;

            return {
                ...state,
                settings: {
                    ...settings,
                    color
                }
            }
        }

        case 'SET_SETTINGS_MAIN_IMG': {
            const { settings } = state;
            const mainImg = action.value;

            return {
                ...state,
                settings: {
                    ...settings,
                    mainImg
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
    isLogged = ({ isLogged }) => {
        return isLogged.status;
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
    getSettingsList = ({ settings }) => {
        return settings;
    }
    getSettingsSiteName = ({ settings }) => {
        return settings.siteName;
    }
    getSettingsColor = ({ settings }) => {
        return settings.color;
    }
    getSettingsMainImg = ({ settings }) => {
        return settings.mainImg;
    }
}

export const selectors = new Selectors();

export default reducer;