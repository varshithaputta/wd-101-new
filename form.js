document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', handleSubmit);
  
    // Load existing entries from localStorage
    loadUserEntries();
  });
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;
  
    // Validate date of birth within age range (18 to 55)
    if (!isDateOfBirthValid(dob)) {
      alert('Please enter a valid date of birth (age must be between 18 and 55).');
      return;
    }
  
    // Validate email
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Add the entry to the table and localStorage
    addUserEntry(name, email, password, dob, terms);
  
    // Clear the form
    registrationForm.reset();
  }
  
  function isDateOfBirthValid(dob) {
    const currentDate = new Date();
    const inputDate = new Date(dob);
    const age = currentDate.getFullYear() - inputDate.getFullYear();
  
    return age >= 18 && age <= 55;
  }
  
  function isValidEmail(email) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function addUserEntry(name, email, password, dob, terms) {
    const userTableBody = document.getElementById('userTableBody');
    const newRow = userTableBody.insertRow();
  
    const cellName = newRow.insertCell(0);
    const cellEmail = newRow.insertCell(1);
    const cellPassword = newRow.insertCell(2);
    const cellDob = newRow.insertCell(3);
    const cellTerms = newRow.insertCell(4);
  
    cellName.textContent = name;
    cellEmail.textContent = email;
    cellPassword.textContent = password;
    cellDob.textContent = dob;
    cellTerms.textContent = terms ? 'Yes' : 'No';
  
    // Save entry to localStorage
    saveUserEntry(name, email, password, dob, terms);
  }
  
  function loadUserEntries() {
    const storedEntries = JSON.parse(localStorage.getItem('userEntries')) || [];
  
    storedEntries.forEach(entry => {
      addUserEntry(entry.name, entry.email, entry.password, entry.dob, entry.terms);
    });
  }
  
  function saveUserEntry(name, email, password, dob, terms) {
    const userEntries = JSON.parse(localStorage.getItem('userEntries')) || [];
  
    const newEntry = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: terms
    };
  
    userEntries.push(newEntry);
    localStorage.setItem('userEntries', JSON.stringify(userEntries));
  }
  
