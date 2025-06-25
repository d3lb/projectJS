'use strict';

const contacts = [
    {
        name: 'bob',
        age: 5,
        phone: '0552342354',
        email: 'bob@gmail.com',
        address: 'The Streets',
        pic: './images/profilePics/gentelman-cat.png'
    },
    {
        name: 'Jonathan',
        age: 21,
        phone: '0532598312',
        email: 'jonathan@gmail.com',
        address: 'Haifa',
        pic: ''
    },
    {
        name: 'The Undertaker',
        age: 60,
        phone: '2033521037',
        email: 'undertaker@gmail.com',
        address: 'Texas, America',
        pic: './images/profilePics/undertaker.jpg'
    }
];



// Displays the listed contacts array
displayContacts();

function displayContacts() {
  const container = document.getElementById('contactsList');
  container.innerHTML = ''; // Clear list first

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.id = `contact${index}`;
    li.innerHTML = `
      <div class="contacts">
        <div class="contacts-info">
          <img src="${contact.pic || './images/profilePics/default.jpg'}">
          <p>${contact.name}</p>
        </div>
        <div class="info-buttons">
          <button class="infoBtn"><img src="./images/icons/info.png" alt="info"></button>
          <button class="editBtn"><img src="./images/icons/edit.png" alt="edit"></button>
          <button class="deleteBtn"><img src="./images/icons/delete.png" alt="delete"></button>
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



// Close when clicking outside Modal or on the X button
document.querySelectorAll('.popUp').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('preContent') ||
            e.target.classList.contains('popUp') || 
            e.target.id === 'close') {
            closeModal();
        }
    });
});

// Info
document.getElementById('contactsList').addEventListener('click', function (e) {
    if (e.target.closest('.infoBtn')) {
        const clickedLI = e.target.closest('li');
        const id = clickedLI.id; 
        const index = parseInt(id.replace('contact', '')); // so it only gets the number

        const contact = contacts[index];
        if (contact) {
            openInfoModal(contact);
        }
    }
});


function openInfoModal(contact) {
    const infoModal = document.getElementById('info');
    const paragraphs = infoModal.querySelectorAll('p');

    paragraphs[0].textContent = `Name: ${contact.name || 'N/A'}`;
    paragraphs[1].textContent = `Age: ${contact.age || 'N/A'}`;
    paragraphs[2].textContent = `Telephone: ${contact.phone || 'N/A'}`;
    paragraphs[3].textContent = `Address: ${contact.address || 'N/A'}`;

    const img = infoModal.querySelector('.pic img');
    img.src = contact.pic || './images/profilePics/default.jpg';
    img.alt = `${contact.name}'s profile picture`;

    infoModal.style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.popUp').forEach(modal => {
        modal.style.display = 'none';
    });
}

