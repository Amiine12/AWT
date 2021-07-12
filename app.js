const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-user-form');
const form1 = document.querySelector('#show-user-form');

// create element & render user
function renderUser(doc){
    let li = document.createElement('li');
    let username = document.createElement('span');
    let email = document.createElement('span');
    let id = document.createElement('span');
    let password = document.createElement('span');
    let roles = document.createElement('span');
    let _class = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);

    username.textContent = doc.data().username;
    email.textContent = doc.data().email;
    id.textContent = doc.data().id;
    password.textContent = doc.data().password;
    roles.textContent = doc.data().roles;
    _class.textContent = doc.data()._class;
    cross.textContent = 'x';
    
    li.appendChild(username);
    li.appendChild(email);
    li.appendChild(id);
    li.appendChild(password);
    li.appendChild(roles);
    li.appendChild(_class);
    li.appendChild(cross);

    userList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    });
}

// getting data

//db.collection('users').orderBy('id').get().then((snapshot) =>{
//    snapshot.docs.forEach(doc => {
//        //console.log(doc.data())
//        renderUser(doc);
//    });
//});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        username: form.username.value,
        email: form.email.value,
        id: form.id.value,
        password: form.password.value,
        roles: form.roles.value,
        _class: form._class.value
    });
    form.username.value = '';
    form.email.value = '';
    form.id.value = '';
    form.password.value = '';
    form.roles.value = '';
    form._class.value = '';
});

// real-time listener
db.collection('users').orderBy('id').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderUser(change.doc);
        } else if (change.type == 'removed'){
            let li = userList.querySelector('[data-id=' + change.doc.id + ']');
            userList.removeChild(li);
        }
    });
});

// update user information
//db.collection('users').doc('data-id').update({
//    username:''
//})

















