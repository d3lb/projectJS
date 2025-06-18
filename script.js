'use strict';

const contacts = [
    {
        name: 'bob',
        phone: '0552342354',
        email: 'bob@gmail.com',
        pic: './images/profilePics/gentelman-cat.png'
    },
    {
        name: 'Jonathan',
        phone: '0532598312',
        email: 'jonathan@gmail.com',
        pic: ''
    },
    {
        name: 'The Undertaker',
        phone: '0566666666',
        email: 'undertaker@gmail.com',
        pic: './images/profilePics/undertaker.jpg'
    }
];



// Displays the listed contacts array
displayContacts();

function displayContacts() {
  const container = document.getElementById('contactsList');
  container.innerHTML = ''; // Clear list first

  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="contacts">
        <div class="contacts-info">
          <img src="${contact.pic || './images/profilePics/default.jpg'}">
          <p>${contact.name}</p>
        </div>
        <div class="info-buttons">
          <button><img src="./images/icons/info.png" alt="info"></button>
          <button><img src="./images/icons/edit.png" alt="edit"></button>
          <button><img src="./images/icons/delete.png" alt="delete"></button>
        </div>
      </div>
    `;
    container.append(li);
  });
}

// Delete All contacts
document.getElementById('deleteAllBtn').addEventListener('click', () => {
  const container = document.getElementById('contactsList');
  container.innerHTML = '';
});
