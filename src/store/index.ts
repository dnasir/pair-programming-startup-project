import { AnyAction, createStore } from 'redux';
import { User } from '@/models/User';

interface UserStore {
    users: User[];
}

const store = createStore((state: UserStore, action: AnyAction): UserStore => {
    if (typeof state === 'undefined') {
        return {
            users: []
        };
    }

    switch (action.type) {
        default:
            return state;
    }
});

export default store;
