import { Action, createStore } from 'redux';
import { User } from '@/models/User';

interface UserStore {
    users: User[];
}

type StoreActions = 'getUsers' | 'updateUser';

const store = createStore((state: UserStore, action: Action<StoreActions>) => {
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

const userList = document.querySelector('[data-js=userList]');
const userCardTemplate = document.querySelector('#userCardTmpl') as HTMLTemplateElement;

function renderUserList() {
    const state = store.getState();

    userList.innerHTML = '';

    for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i];
        const clone = userCardTemplate.content.cloneNode(true) as HTMLElement;

        for (const key in user) {
            if (Object.prototype.hasOwnProperty.call(user, key)) {
                const fieldValue = user[key];

                if (typeof fieldValue === 'object') {
                    // flatten
                    // TODO: add generic helper
                    for (const _key in fieldValue) {
                        if (Object.prototype.hasOwnProperty.call(fieldValue, _key)) {
                            const _field = clone.querySelector(`[data-js="${key}.${_key}"]`);
                            if (!_field) continue;

                            _field.textContent = fieldValue[_key];
                        }
                    }
                } else {
                    const field = clone.querySelector(`[data-js=${key}]`);
                    if (!field) continue;

                    clone.querySelector(`[data-js=${key}]`).textContent = user[key];
                }
            }
        }

        clone.querySelector('[data-js=editButton]').setAttribute('data-uid', user.id.toString());

        userList.appendChild(clone);
    }
}

renderUserList();
store.subscribe(renderUserList);
