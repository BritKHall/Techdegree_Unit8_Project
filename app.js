// ============variables====================================
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");

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
        let name = toTitleCase(employee.name.first);
        let surname= toTitleCase(employee.name.last);
        let email = employee.email;
        let city = toTitleCase (employee.location.city);
        let picture = employee.picture;



    employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name } ${surname}</h2>
        <p class="email">${email }</p>
        <p class="address">${city}</p>
        </div>
        </div>
        `
        });
        gridContainer.innerHTML = employeeHTML;
        }


    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
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
        <h2 class="name">${name.first.capitalize() } ${name.last.capitalize()  }</h2>
        <p class="email">${email }</p>
        <p class="address">${city.capitalize()  }</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state } ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

    // unhide the modal
        overlay.classList.remove("hidden");
        overlay.setAttribute("data-index",`${index}`)
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

rightArrow.addEventListener("click", (e)=>{
    let currentIndex = e.target.parentNode.parentNode.getAttribute("data-index")
    currentIndex=parseInt(currentIndex)
    var cards= document.querySelectorAll(".card")
     if(currentIndex < cards.length-1){
        var newIndex= currentIndex+1;
        displayModal(newIndex);
     }else if (newIndex >cards.length){
     	newIndex=0
     	displayModal(newIndex)}
   
  });

leftArrow.addEventListener("click", (e)=>{
    let dataIndex = e.target.parentNode.parentNode.getAttribute("data-index")
    let currentIndex=parseInt(dataIndex)
    var cards= document.querySelectorAll(".card")
     if(currentIndex >=1){
        var newIndex= currentIndex-1;
        displayModal(newIndex);
        console.log("new",newIndex); console.log("ddd"); console.log("current",currentIndex)
     }
   else if(dataIndex=="0" ){
   	console.log("done")
   }
  });




// ============ Search ====================================


function hideEmployee(){

    let inputField = document.getElementById('search').value.toLowerCase();
    var cards= document.querySelectorAll(".card")
    cards.forEach( card=> card.classList.add("hidecard"))
    
    cards.forEach( card=> card.innerText.indexOf(inputField)>-1 ? card.classList.remove("hidecard"):"")

}

const searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", hideEmployee);