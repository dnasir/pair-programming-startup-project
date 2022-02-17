import store from '@/store';
import { flattenObj, renderDataJs } from './helpers';
import $ from 'jquery';

const userList = document.querySelector('[data-js=userList]');
const userCardTemplate = document.querySelector('#userCardTmpl') as HTMLTemplateElement;

function renderUserList() {
    const state = store.getState();

    // empty list
    userList.innerHTML = '';

    // iterate over users list
    for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i];
        const flattenedUser = flattenObj(user);
        const tmplClone = userCardTemplate.content.cloneNode(true) as HTMLElement;
        const userCard = renderDataJs(tmplClone, 'textContent', flattenedUser);

        // so edit modal has something to use
        userCard.querySelector('[data-js=editButton]').setAttribute('data-id', user.id.toString());

        // add to list
        userList.appendChild(userCard);
    }
}

renderUserList();
store.subscribe(renderUserList);

// init modal event listener
$('#userModal').on('show.bs.modal', function (event: any) {
    // reset form fields
    (this.querySelector('[data-js=userForm]') as HTMLFormElement).reset();

    const button = event.relatedTarget as HTMLButtonElement;
    const id = button.getAttribute('data-id');

    if (id) {
        const state = store.getState();
        const user = state.users.find(x => String(x.id) === id);

        // if there is data, fill in the form
        if (user) {
            const flattenedUser = flattenObj(user);
            renderDataJs(this, 'value', flattenedUser);
        }
    }
});
