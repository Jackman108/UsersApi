import { IUserListPage } from "../typings"
import * as consts from './consts';

const initState: IUserListPage = {
    total: 0,
    users: [],
    isLoading: false
};


export default (state: IUserListPage = initState, action): IUserListPage => {
    switch (action.type) {
        
        case consts.LOAD_DATA_LOADING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case consts.LOAD_DATA_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoading: false
            };
        }
        default: return state;
    }
};
