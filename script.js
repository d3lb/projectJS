'use strict';

const contacts = [
    {
        id: 1,
        name: 'Bob',
        age: 5,
        phone: '0552342354',
        address: 'The Streets',
        pic: './images/profilePics/gentelman-cat.png'
    },
    {
        id: 2,
        name: 'Jonathan',
        age: 21,
        phone: '0532598312',
        address: 'Haifa',
        pic: ''
    },
    {
        id: 3,
        name: 'The Undertaker',
        age: 60,
        phone: '2033521037',
        address: 'Texas, America',
        pic: './images/profilePics/undertaker.jpg'
    }
];
let nextId = 4;


// Displays the listed contacts array
displayContacts();

function displayContacts(list = contacts) {
  const container = document.getElementById('contactsList');
  container.innerHTML = ''; // Clear list first

  list.forEach((contact) => {
    const li = document.createElement('li');
    li.id = `contact${contact.id}`;
    li.classList.add('contact-item');
    li.innerHTML = `
      <div class="contacts">
        <div class="contacts-info">
          <img src="${contact.pic || './images/profilePics/default.jpg'}" onerror="this.src='./images/profilePics/default.jpg';">
          <div class="contacts-text">
            <p>&#x1F464; ${contact.name}</p>
            <p>&#128222; ${contact.phone}</p> 
          </div>
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

  updatePeopleCount(list);
}

// People Counter
function updatePeopleCount(list = contacts) {
  const countElement = document.getElementById('peopleCount');
  countElement.textContent = `${list.length} ${list.length === 1 ? 'Person' : 'People'}`;
}

// Search Bar
document.getElementById('searchBar').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query)
  );
  displayContacts(filteredContacts);
});

// Delete All contacts
document.getElementById('deleteAllBtn').addEventListener('click', () => {
  const confirmed = confirm('Are you sure you want to delete all contacts?');

  if (confirmed) {
    document.getElementById('searchBar').value = '';
    contacts.length = 0;
    displayContacts();
  }
});

// Add Person
document.getElementById('addPersonBtn').addEventListener('click', () => {
  document.getElementById('add').style.display = 'block';
});

document.querySelector('#add .submit-button').addEventListener('click', function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('addName');
  const ageInput = document.getElementById('addAge');
  const phoneInput = document.getElementById('addPhone');
  const addressInput = document.getElementById('addAddress');
  const picInput = document.getElementById('addPic');
  const error = document.getElementById('addError');

  const name = nameInput.value.trim();
  const age = ageInput.value.trim() ? parseInt(ageInput.value.trim(), 10) : undefined;
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const pic = picInput.value.trim();

  error.textContent = '';

  if (!name || !phone) {
      error.textContent = 'Name and Phone number are required.';
      return;
  }

  if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      error.textContent = 'A contact with this name already exists.';
      return;
  }

  contacts.push({
    id: nextId++,
    name,
    age,
    phone,
    address,
    pic
  });

  nameInput.value = '';
  ageInput.value = '';
  phoneInput.value = '';
  addressInput.value = '';
  picInput.value = '';
  error.textContent = '';

  document.getElementById('searchBar').value = '';
  closeModal();
  displayContacts();
});

// Info
document.getElementById('contactsList').addEventListener('click', function (e) {
    if (e.target.closest('.infoBtn')) {
        const clickedLI = e.target.closest('li');
        if (!clickedLI) return;

        const idStr = clickedLI.id;
        const id = parseInt(idStr.replace('contact', ''));

        const contact = contacts.find(c => c.id === id);
        if (contact) {
            openInfoModal(contact);
        }
    }
});

function openInfoModal(contact) {
  const infoModal = document.getElementById('info');
  const textContainer = infoModal.querySelector('.text');
  textContainer.innerHTML = ''; // Clear previous content

  if (hasValue(contact.name)) {
      const p = document.createElement('p');
      p.textContent = `Name: ${contact.name}`;
      textContainer.appendChild(p);
  }

  if (hasValue(contact.phone)) {
      const p = document.createElement('p');
      p.textContent = `Telephone: ${contact.phone}`;
      textContainer.appendChild(p);
  }

  if (Number.isInteger(contact.age)) {
    const p = document.createElement('p');
    p.textContent = `Age: ${contact.age}`;
    textContainer.appendChild(p);
  }

  if (hasValue(contact.address)) {
      const p = document.createElement('p');
      p.textContent = `Address: ${contact.address}`;
      textContainer.appendChild(p);
  }

  const img = infoModal.querySelector('.picDiv img');
  img.src = contact.pic || './images/profilePics/default.jpg';
  img.alt = contact.name ? `${contact.name}'s profile picture` : 'Profile picture';

  infoModal.style.display = 'block';
}

// Edit
let editId = null;

document.getElementById('contactsList').addEventListener('click', function (e) {
    if (e.target.closest('.editBtn')) {
        const clickedLI = e.target.closest('li');
        if (!clickedLI) return;

        const idStr = clickedLI.id;
        const id = parseInt(idStr.replace('contact', ''));

        const contact = contacts.find(c => c.id === id);
        if (contact) {
            editId = id;
            const editModal = document.getElementById('edit');

            document.getElementById('editName').value = contact.name;
            document.getElementById('editAge').value = contact.age || '';
            document.getElementById('editPhone').value = contact.phone;
            document.getElementById('editAddress').value = contact.address;
            document.getElementById('editPic').value = contact.pic;

            editModal.style.display = 'block';
        }
    }
});

document.querySelector('#edit .submit-button').addEventListener('click', function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('editName');
  const ageInput = document.getElementById('editAge');
  const phoneInput = document.getElementById('editPhone');
  const addressInput = document.getElementById('editAddress');
  const picInput = document.getElementById('editPic');
  const error = document.getElementById('editError');

  const name = nameInput.value.trim();
  const age = ageInput.value.trim() ? parseInt(ageInput.value.trim(), 10) : undefined;
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const pic = picInput.value.trim();

  error.textContent = '';

  if (!name || !phone) {
      error.textContent = 'Name and Phone number are required.';
      return;
  }

  if (contacts.some((contact) => contact.id !== editId && contact.name.toLowerCase() === name.toLowerCase())) {
    error.textContent = 'A contact with this name already exists.';
    return;
  }

  const contactIndex = contacts.findIndex(c => c.id === editId);
  if (contactIndex === -1) {
    error.textContent = 'Contact not found.';
    return;
  }

  contacts[contactIndex] = {
    id: editId,
    name,
    age,
    phone,
    address,
    pic
  };

  nameInput.value = '';
  ageInput.value = '';
  phoneInput.value = '';
  addressInput.value = '';
  picInput.value = '';
  error.textContent = '';
  editId = null;

  document.getElementById('searchBar').value = '';
  closeModal();
  displayContacts();
});

// Delete contact
document.getElementById('contactsList').addEventListener('click', function (e) {
  if (e.target.closest('.deleteBtn')) {
    const clickedLI = e.target.closest('li');
    if (!clickedLI) return;

    const idStr = clickedLI.id;
    const id = parseInt(idStr.replace('contact', ''));

    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) return;

    const contact = contacts[contactIndex];
    const confirmed = confirm(`Are you sure you want to delete "${contact.name}"?`);

    if (confirmed) {
      contacts.splice(contactIndex, 1);
      document.getElementById('searchBar').value = '';
      displayContacts();
    }
  }
});

// Check if input has value function
function hasValue(val) {
  return val !== undefined && val !== null && String(val).trim() !== '';
}

// Close when clicking outside Modal or on the X button
document.querySelectorAll('.popUp').forEach(modal => {
  modal.addEventListener('click', function (e) {
      if (e.target.classList.contains('preContent') ||
          e.target.classList.contains('popUp') || 
          e.target.className === 'close') {
          closeModal();
      }
  });
});

// Close modal function
function closeModal() {
  document.querySelectorAll('.popUp').forEach(modal => {
      modal.style.display = 'none';
  });
}