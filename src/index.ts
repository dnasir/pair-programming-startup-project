import store from '@/store';
import { applyDataToTemplate } from './helpers';
import $ from 'jquery';
import { flatten, unflatten } from 'flat';

const userList = document.querySelector('[data-js=userList]');
const userCardTemplate = document.querySelector('#userCardTmpl') as HTMLTemplateElement;

const delimiter = '_';

function renderUserList() {
    const state = store.getState();

    // empty list
    userList.innerHTML = '';

    // iterate over users list
    for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i];
        const flattenedUser = flatten(user, { delimiter });
        const tmplClone = userCardTemplate.content.cloneNode(true) as HTMLElement;
        const userCard = applyDataToTemplate(tmplClone, 'data-js', 'textContent', flattenedUser);

        // so edit modal has something to use
        userCard.querySelector('[data-js=editButton]').setAttribute('data-id', user.id.toString());

        // add to list
        userList.appendChild(userCard);
    }
}

renderUserList();
store.subscribe(renderUserList);

const userForm = document.querySelector('[data-js=userForm]') as HTMLFormElement;

// attach user modal save button event handler
document.querySelector('[data-js="modalSaveBtn"]').addEventListener('click', function () {
    const formData = new FormData(userForm);

    // build object from FormData entries
    const rawUser = Array.from(formData.entries()).reduce<{ [key: string]: any }>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    const user = unflatten(rawUser, { delimiter });

    alert(JSON.stringify(user));
});

// init Bootstrap modal event listener
$('#userModal').on('show.bs.modal', function (event: any) {
    // reset form fields
    userForm.reset();

    const button = event.relatedTarget as HTMLButtonElement;
    const id = button.getAttribute('data-id');

    if (id) {
        const state = store.getState();
        const user = state.users.find(x => String(x.id) === id);

        // if there is data, pre-fill the form
        if (user) {
            const flattenedUser = flatten(user, { delimiter });
            applyDataToTemplate(this, 'name', 'value', flattenedUser);
        }
    }
});
