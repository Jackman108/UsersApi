import { AppState } from 'src/store/typings';

const getList = (state: AppState) => {
    return state.users.list;
};

export default {
    getList
};
