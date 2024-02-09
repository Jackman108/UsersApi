import { PassesApiService } from 'src/api/users';
import * as consts from './consts';
import { Action, Store } from 'redux';
import { ThunkAction } from 'redux-thunk';

//Реализация Пагинации на Фронтенде actions (с пагинацией):
const loadList = (page: number, limit: number): ThunkAction<void, Store, null, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: consts.LOAD_DATA_LOADING });
    const response = await new PassesApiService().list(page, limit);
    dispatch({ type: consts.LOAD_DATA_SUCCESS, payload: response });
};


export default {
    loadList
};
