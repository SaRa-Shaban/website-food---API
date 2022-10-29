


let userName, userEmail, userPhone, userAge, userPassword, userRePassword, userNameAlert, userEmailAlert, userPhoneAlert, userAgeAlert, userpasswordAlert,  userRepasswordAlert;


let nameEntry = false , email = false,  phone = false, age = false, password = false,  repassword = false;

let row = document.getElementById('rowData');

let dataContainer = [];

// search by word
async function search(word) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    let myData = await response.json();
    // dataContainer = myData;
    // console.log(myData);
    let meals = myData;
    displayMeals(meals.meals)
    return meals;

}

search(' ');


// search first letter
async function getByLetter(letter) {

    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    meals = await meals.json();
    displayMeals(meals.meals);
}


// default
function displayMeals(dataContainer) {
    let divs = '';
    for (let i = 0; i < dataContainer.length; i++) {
        divs +=
            `   <div class="col-sm-6 col-md-3">
        <div class="content position-relative"  onclick="getMeal('${dataContainer[i].idMeal}')">
                <img src=${dataContainer[i].strMealThumb} class="w-100" alt="">
                <div class=" position-absolute d-flex align-items-center layer-div">                            
                        <h3 class=" ps-3 fw-light ">${dataContainer[i].strMeal}</h3>                         
                </div>                
        </div>
    </div>
        `
    }

    row.innerHTML = divs;
}



// category
async function getCategories() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    x = await x.json()
    return x;

}

function displayCategories() {

    let divs = '';
    for (let i = 0; i < dataContainer.length; i++) {
        divs +=
            `   <div class="col-sm-6 col-md-3">
        <div class="content position-relative "  onclick="filterByCategory('${dataContainer[i].strCategory}')" >
                <img src=${dataContainer[i].strCategoryThumb} class="w-100" alt="">
                <div class=" position-absolute d-flex flex-column justify-content-center align-items-center layer-div">                            
                        <h3 class=" ps-3 fw-light ">${dataContainer[i].strCategory}</h3> 
                        <p class="fw-light px-2">${dataContainer[i].strCategoryDescription.split(" ").slice(0, 5).join(" ")}</p>                                      
                </div>                
        </div>
    </div>
        `
    }

    row.innerHTML = divs;


    // let data = await getCategories()
    // dataContainer = data.categories.splice(0, 5);

    // return dataContainer;
}

async function filterByCategory(category) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)

}



// area
async function getArea() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    x = await x.json()
    return x;

}

function displayArea() {

    let divs = '';
    for (let i = 0; i < dataContainer.length; i++) {
        divs +=
            `   <div class="col-sm-6 col-md-3">
        <div class="contentArea text-center" onclick=(filterByArea('${dataContainer[i].strArea}')) >
        <i class="fa-solid fa-city fa-3x"></i>
        <h3 class="text-white pt-3">${dataContainer[i].strArea}</h3>
        </div>
    </div>
        `
    }

    row.innerHTML = divs;

}

async function filterByArea(area) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))

}


// Ingredients
async function getIngredients() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    x = await x.json()
    return x;

}

function displayIngredients() {

    let divs = '';
    for (let i = 0; i < dataContainer.length; i++) {
        divs +=
            `   <div class="col-sm-6 col-md-3">
        <div class="contentArea text-center "  onclick=(filterByIngredient('${dataContainer[i].strIngredient}'))>
        <i class="fa-solid fa-bowl-food fa-3x"></i>
        <h3 class="text-white">${dataContainer[i].strIngredient}</h3>
        <p class="text-white fw-light px-2">${dataContainer[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>                                      
        </div>
    </div>
        `
    }

    row.innerHTML = divs;

}

async function filterByIngredient(mealName) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)

}


// meal and recipes

async function getMeal(mealID) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])

}


function displayMeal(meal) {

    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 bg-color rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }


    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 bg-color rounded">${tags[i]}</li>`
    }


    let str = `
    <div class="row">

    <div class="col-md-4 text-white">
    <img class="w-100" src="${meal.strMealThumb}" alt=""
        srcset=""> 
    <h1 class="text-center pt-2">${meal.strMeal}</h1>
    </div>

    <div class="col-md-8 text-white text-left">

    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>

    <p><span class=" fs-3 fw-semibold">Area :</span> ${meal.strArea}</p>
    <p><span class=" fs-3 fw-semibold">Category :</span> ${meal.strCategory}</p>

    <h3>Recipes :</h3>
    <ul class="d-flex flex-wrap" id="recipes">

    </ul>

    <h3 class="my-2 mx-1 p-1">Tags :</h3>
    <ul class="d-flex flex-wrap " id="tags">

    </ul>

    
    <a class="btn btn-success text-white mx-3" target="_blank" href="${meal.strSource}">Source</a>
    <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
</div>
</div>
`

    row.innerHTML = str

    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr

}



$(".nav-item a").click(async (e) => {

    let list = e.target.getAttribute("data-list");
    document.getElementById("contactAndSearch").innerHTML = "";
    row.innerHTML = "";


    // search
    if (list == "search") {
        row.innerHTML = ""
        document.getElementById("contactAndSearch").innerHTML = `
        <div class="row g-2 mb-5">
        <div class="col-md-6">
            <div class="contant-search ">
                <input type="text" id="searchWord" placeholder="Search by name" class=" form-control ">
            </div>
        </div>

        <div class="col-md-6">
            <div class="contant-search">
                <input type="text" id="searchLetter" placeholder="Search by first letter" class=" form-control">
            </div>
        </div>

    </div>
            `

        $("#searchWord").keyup((e) => {
            search(e.target.value)
        })

        $("#searchLetter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#searchLetter').on("input", function (e) {
            if (e.target.value.length > 1)
                e.target.value = e.target.value.slice(0, 1);
        });

    }

    // contact
    if (list == "Contact Us") {

        row.innerHTML = `
        
    <section id="contact" class="container w-75 mx-auto mb-5 ">
    <div class="p-2 mt-5 d-flex justify-content-center flex-column align-items-center">
        <h2 class="text-light mb-5">ContacUs...</h2>
        <div class="row g-4">

            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control shadow " onkeyup="validation()" id="name"
                        placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                        Enter valid Age
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="password"
                        placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="rePassword"
                        placeholder="Enter RePassword">
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>

        </div>

        <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-5">Submit</button>
        </div>

        </section>
        
        `

        userName = document.getElementById("name"),
        userEmail = document.getElementById("email"),
        userPhone = document.getElementById("phone"),
        userAge = document.getElementById("age"),
        userPassword = document.getElementById("password"),
        userRePassword = document.getElementById("rePassword"),
        userNameAlert = document.getElementById("namealert"),
        userEmailAlert = document.getElementById("emailalert"),
        userPhoneAlert = document.getElementById("phonealert"),
        userAgeAlert = document.getElementById("agealert"),
        userpasswordAlert = document.getElementById("passwordalert"),
        userRepasswordAlert = document.getElementById("repasswordalert");

    userName.addEventListener("focus", () => {
        nameEntry = true
    })
    userEmail.addEventListener("focus", () => {
        email = true
    })
    userPhone.addEventListener("focus", () => {
        phone = true
    })
    userAge.addEventListener("focus", () => {
        age = true
    })
    userPassword.addEventListener("focus", () => {
        password = true
    })
    userRePassword.addEventListener("focus", () => {
        repassword = true
    })

    }


    if (list == "categories") {
        let data = await getCategories()
        dataContainer = data.categories.splice(0, 5);
        // console.log(dataContainer)
        displayCategories();
    }


    if (list == "Areas") {
        let data = await getArea()
        dataContainer = data.meals;
        // console.log(dataContainer)
        displayArea();
    }


    if (list == "Ingredients") {
        let data = await getIngredients()
        dataContainer = data.meals.splice(0, 20);
        console.log(dataContainer)
        displayIngredients();
    }


})



function validation() {

if (nameEntry) {
    if (userNameValid()) {
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        userNameAlert.classList.replace("d-block", "d-none")
        userNameAlert.classList.replace("d-block", "d-none")

    } else {
        userName.classList.replace("is-valid", "is-invalid")
        userNameAlert.classList.replace("d-none", "d-block")
    }
}

if (email) {
    if (userEmailValid()) {
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        userEmailAlert.classList.replace("d-block", "d-none")
        userEmailAlert.classList.replace("d-block", "d-none")
    } else {
        userEmail.classList.replace("is-valid", "is-invalid")
        userEmailAlert.classList.replace("d-none", "d-block")
    }
}

if (phone) {
    if (userPhoneValid()) {
        userPhone.classList.remove("is-invalid")
        userPhone.classList.add("is-valid")
        userPhoneAlert.classList.replace("d-block", "d-none")
        userPhoneAlert.classList.replace("d-block", "d-none")
    } else {
        userPhone.classList.replace("is-valid", "is-invalid")
        userPhoneAlert.classList.replace("d-none", "d-block")
    }
}

if (age) {
    if (userAgeValid()) {
        userAge.classList.remove("is-invalid")
        userAge.classList.add("is-valid")
        userAgeAlert.classList.replace("d-block", "d-none")
        userAgeAlert.classList.replace("d-block", "d-none")
    } else {
        userAge.classList.replace("is-valid", "is-invalid")
        userAgeAlert.classList.replace("d-none", "d-block")
    }
}

if (password) {
    if (userPasswordValid()) {
        userPassword.classList.remove("is-invalid")
        userPassword.classList.add("is-valid")
        userpasswordAlert.classList.replace("d-block", "d-none")
        userpasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userPassword.classList.replace("is-valid", "is-invalid")
        userpasswordAlert.classList.replace("d-none", "d-block")
    }
}

if (repassword) {
    if (userRePasswordValid()) {
        userRePassword.classList.remove("is-invalid")
        userRePassword.classList.add("is-valid")
        userRepasswordAlert.classList.replace("d-block", "d-none")
        userRepasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userRePassword.classList.replace("is-valid", "is-invalid")
        userRepasswordAlert.classList.replace("d-none", "d-block")
    }
}

if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
    document.getElementById("submitBtn").removeAttribute("disabled")
}else{
    document.getElementById("submitBtn").setAttribute("disabled","true")
}

}

function userNameValid() {
return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
return userPassword.value == userRePassword.value
}



