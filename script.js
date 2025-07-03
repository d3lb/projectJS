'use strict';

const contacts = [
    {
        name: 'Bob',
        age: 5,
        phone: '0552342354',
        address: 'The Streets',
        pic: './images/profilePics/gentelman-cat.png'
    },
    {
        name: 'Jonathan',
        age: 21,
        phone: '0532598312',
        address: 'Haifa',
        pic: ''
    },
    {
        name: 'The Undertaker',
        age: 60,
        phone: '2033521037',
        address: 'Texas, America',
        pic: './images/profilePics/undertaker.jpg'
    }
];



// Displays the listed contacts array
displayContacts();

function displayContacts(list = contacts) {
  const container = document.getElementById('contactsList');
  container.innerHTML = ''; // Clear list first

  list.forEach((contact, index) => {
    const li = document.createElement('li');
    li.id = `contact${index}`;
    li.classList.add('contact-item');
    li.innerHTML = `
      <div class="contacts">
        <div class="contacts-info">
          <img src="${contact.pic || './images/profilePics/default.jpg'}">
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
  const container = document.getElementById('contactsList');
  container.innerHTML = '';

  contacts.length = 0;
  displayContacts();
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
  const age = parseInt(ageInput.value.trim(), 10);
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

  closeModal();
  displayContacts();
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
  const textContainer = infoModal.querySelector('.text');
  textContainer.innerHTML = ''; // Clear previous content

  if (hasValue(contact.name)) {
      const p = document.createElement('p');
      p.textContent = `Name: ${contact.name}`;
      textContainer.appendChild(p);
  }

  if (hasValue(contact.age)) {
      const p = document.createElement('p');
      p.textContent = `Age: ${contact.age}`;
      textContainer.appendChild(p);
  }

  if (hasValue(contact.phone)) {
      const p = document.createElement('p');
      p.textContent = `Telephone: ${contact.phone}`;
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



// Check if input has value function
function hasValue(val) {
  return val !== undefined && val !== null && String(val).trim() !== '';
}

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

// Close modal function
function closeModal() {
  document.querySelectorAll('.popUp').forEach(modal => {
      modal.style.display = 'none';
  });
}