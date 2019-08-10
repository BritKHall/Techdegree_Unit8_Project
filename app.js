// ============variables====================================
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// ============Fetch====================================

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

// ============Display data ====================================

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first.capitalize()} ${name.last.capitalize()}</h2>
        <p class="email">${email.capitalize()}</p>
        <p class="address">${city.capitalize()}</p>
        </div>
        </div>
        `
        });
        gridContainer.innerHTML = employeeHTML;
        }

// ============ Model ====================================

function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date= new Date(dob.date)

    // setting up the html
    const modalHTML = ` 
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first.capitalize()} ${name.last.capitalize()}</h2>
        <p class="email">${email.capitalize()}</p>
        <p class="address">${city.capitalize()}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state.capitalize()} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

    // unhide the modal
        overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
}

//adding the click events
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });
    
//moving from one mod to next







// ============ Search ====================================

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}