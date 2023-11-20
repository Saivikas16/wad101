let newUsers = [];

function displayNewUsers() {
  let tableHTML = "";

  newUsers.forEach((user) => {
    if (user.newName && user.newEmail && user.newPassword && user.newDob && user.newTerms) {
      tableHTML += "<tr>";
      tableHTML += `<td>${user.newName}</td>`;
      tableHTML += `<td>${user.newEmail}</td>`;
      tableHTML += `<td>${user.newPassword}</td>`;
      tableHTML += `<td>${user.newDob}</td>`;
      tableHTML += `<td>${user.newTerms}</td>`;
      tableHTML += "</tr>";
    }
  });

  document.getElementById("newUserTableBody").innerHTML = tableHTML;
}

function calculateNewAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const ageDifference = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifference);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}

function handleNewSubmit(event) {
  event.preventDefault();

  const newName = document.getElementById("newName").value;
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;
  const newDob = document.getElementById("newDob").value;
  const newTerms = document.getElementById("newTerms").checked;

  const age = calculateNewAge(newDob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    alert("Invalid email address format.");
    return;
  }

  const newUser = {
    newName,
    newEmail,
    newPassword,
    newDob,
    newTerms: newTerms ? "true" : "false",
  };

  newUsers.push(newUser);
  localStorage.setItem("newUsers", JSON.stringify(newUsers));
  document.getElementById("newRegistrationForm").reset();
  displayNewUsers();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedNewUsers = localStorage.getItem("newUsers");
  if (storedNewUsers) {
    newUsers = JSON.parse(storedNewUsers);
    displayNewUsers();
  }
});

document.getElementById("newRegistrationForm").addEventListener("submit", handleNewSubmit);

document.getElementById("clearNewTableBtn").addEventListener("click", () => {
  newUsers = [];
  localStorage.removeItem("newUsers");
  displayNewUsers();
});
