import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { AppState } from 'src/store/typings';
import selectors from './store/selectors';
import actions from './store/actions';
import { IUserListPage } from './typings';
import styles from './userListPage.less';
import classNames from 'classnames';

interface Props {
    list: IUserListPage;
    loadList: (page: number, limit: number) => Promise<void>;
}

const UserListPage = ({
    list,
    loadList
}: Props) => {
//Реализация Пагинации на Фронтенде UserListPage (с использованием пагинации):
    useEffect(() => {
        loadList(1, 50);
    }, [loadList]);

    return <div className={styles.userListPage}>
        {list.isLoading && <div>Загрузка...</div>}
        {!list.isLoading && <>
            <div className={styles.total}>{`Всего: ${list.total}`}</div>
            <div className={styles.title}>{`Подразделения`}</div>
            <div className={styles.table}>
                <div className={styles.itemWrapper}>
                    <div className={classNames(styles.item, styles.headerItem)}>Идентификатор</div>
                    <div className={classNames(styles.item, styles.headerItem)}>Имя</div>
                    <div className={classNames(styles.item, styles.headerItem)}>Логин</div>
                    <div className={classNames(styles.item, styles.headerItem)}>Должность</div>
                    <div className={classNames(styles.item, styles.headerItem)}>Оклад</div>
                </div>
                {list.users.map((u) => {
                    return <div className={styles.itemWrapper} key={u.id}>
                        <div className={styles.item}>{u.id}</div>
                        <div className={styles.item}>{u.name}</div>
                        <div className={styles.item}>{u.login}</div>
                        <div className={styles.item}>{u.position}</div>
                        <div className={styles.item}>{u.defaultSalary}</div>
                    </div>;
                })}
            </div>
        </>}

    </div>;
};

const mapStateToProps = (state: AppState) => ({
    list: selectors.getList(state)
});

const mapDispatchToProps = {
    loadList: actions.loadList
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(UserListPage));
