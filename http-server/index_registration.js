document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;

    let age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Only users between 18 and 55 years old are allowed.");
        return;
    }

    const userData = { name, email, password, dob, terms };

    let storedData = JSON.parse(localStorage.getItem("userList")) || [];
    storedData.push(userData);
    localStorage.setItem("userList", JSON.stringify(storedData));

    updateEntriesList();
     
});

window.onload = function () {
    updateEntriesList(); 
};

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function updateEntriesList() {
    let storedData = JSON.parse(localStorage.getItem("userList")) || [];
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    storedData.forEach((data) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.password}</td>
            <td>${data.dob}</td>
            <td>${data.terms ? "true" : "false"}</td>
        `;
        tableBody.appendChild(tableRow);
    });
}
