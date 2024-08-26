let rowData = document.querySelector(".rowData");
let showDetails=document.querySelector(".details");

// Loading section
$(async function () {
    await getFoods();
    $("#loading").fadeOut(500);
    
});

// SideBar section


function closeSide() {
    let sideBarWidth = $(".sideBarInner").outerWidth();
    $(".sideBar").animate({ left: -sideBarWidth });
    $(".closeSideBar").removeClass("fa-x");
    $(".closeSideBar").addClass("fa-align-justify");
    $(".navbar a").animate({ top: 300 }, 500);
}
closeSide();

function openSide() {
    $(".sideBar").animate({ left: 0 });
    $(".closeSideBar").addClass("fa-x");
    $(".closeSideBar").removeClass("fa-align-justify");
    for (let i = 0; i < 5; i++) {
        $(".navbar a").eq(i).animate({ top: 0 }, (i + 5) * 150);
    }
}

$(".closeSideBar").click(() => {
    if ($(".sideBar").css("left") == "0px") {
        closeSide();
    }
    else {
        openSide();
    }
})


// Home section


async function getFoods() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let apiData = await apiResponse.json();
    console.log(apiData);
    displayFoods(apiData.meals);

}
getFoods();
function displayFoods(data) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
        list += `<div id="home" onclick="getDetails(${data[i].idMeal})" class="col-md-3">
                    <div class="item rounded-2">
                        <img class="w-100" src="${data[i].strMealThumb}" alt="">
                        <div class="img-shadow px-2  d-flex  align-items-center">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.querySelector(".rowData").innerHTML = list
}



// Categories section


async function getCategories() {
    $("#loading").fadeIn(500);
    closeSide();
    closeDetails();
    closeSearch();
    let apiCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let categoriesData = await apiCategories.json();
    console.log(categoriesData);
    displayCategories(categoriesData.categories);
    $("#loading").fadeOut(500);
}

function displayCategories(data) {
    let list = ""
    for (let i = 0; i < data.length; i++) {
        list += `<div id="home" onclick="categoriesPlus('${data[i].strCategory}')" class="col-md-3">
                    <div class="item rounded-2">
                        <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
                        <div class="img-shadow text-center py-2">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>`
    }
    rowData.innerHTML = list;
}

async function categoriesPlus(categorie) {
    $("#loading").fadeIn(500);
    let apiCategoriesPlus = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    let categoriesPlusData = await apiCategoriesPlus.json();
    console.log(categoriesPlusData);
    displayFoods(categoriesPlusData.meals);
    $("#loading").fadeOut(500);
}



// Area section


async function getArea() {
    $("#loading").fadeIn(500);
    closeSide();
    closeDetails();
    closeSearch();
    let apiArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let areaData = await apiArea.json();
    console.log(areaData);
    displayArea(areaData.meals);
    $("#loading").fadeOut(500);
}


function displayArea(data) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
        list += `<div id="home" onclick="getAreaPlus('${data[i].strArea}')" class="col-md-3">
                        <div class="text-center py-2 rounded-2 text-white">
                            <i class="fa-solid fa-house-laptop"></i>
                            <h3>${data[i].strArea}</h3>
                        </div>
                </div>`
    }
    rowData.innerHTML = list;
}

async function getAreaPlus(code) {
    $("#loading").fadeIn(500);
    let apiAreaPlus = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${code}`);
    let areaPlusData = await apiAreaPlus.json();
    console.log(areaPlusData);
    displayFoods(areaPlusData.meals);
    $("#loading").fadeOut(500);
}




// Ingredients section


async function getIngredients() {
    $("#loading").fadeIn(500);
    closeSide();
    closeDetails();
    closeSearch();
    let apiIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingredientsData = await apiIngredients.json();
    console.log(ingredientsData);
    displayIngredients(ingredientsData.meals.slice(0, 24));
    $("#loading").fadeOut(500);
}

function displayIngredients(data) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
        list += `<div id="home" onclick="getIngredientsPlus('${data[i].strIngredient}')" class="col-md-3">
                        <div class="text-center py-2 rounded-2 text-white">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3 class="ingredientsTitle">${data[i].strIngredient}</h3>
                            <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                </div>`
    }
    rowData.innerHTML = list;
}

async function getIngredientsPlus(code) {
    $("#loading").fadeIn(500);
    let apiIngredientsPlus = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${code}`);
    let ingredientsPlusData = await apiIngredientsPlus.json();
    console.log(ingredientsPlusData);
    displayFoods(ingredientsPlusData.meals);
    $("#loading").fadeOut(500);
}



// Details section



async function getDetails(id) {
    $("#loading").fadeIn(500);
    closeSide();
    document.querySelector("#search").classList.add("invisible");
    rowData.classList.add("d-none");
    let apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let detailsData = await apiDetails.json();
    console.log(detailsData);
    displayDetails(detailsData.meals[0]);
    $("#loading").fadeOut(500);
}

function displayDetails(data) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info p-1 m-2">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }


    let strTags = "";
    let tags = data.strTags;
    if (tags) {
        let arrTags = tags.split(",")
        for (let i = 0; i < arrTags.length; i++) {
            strTags += `<li class="alert alert-danger m-2 p-1">${arrTags[i]}</li>`
        }
    }




    let list = "";
    list += ` <div class="col-md-4">
                    <img class="w-100 pb-2 rounded-2" src="${data.strMealThumb}" alt="">
                    <h3>${data.strMeal}</h3>
                </div>
                <div class="col-md-8 d-flex">
                    <div class="detailsContent">
                        <h3 class="fs-2">Instructions</h3>
                        <p>${data.strInstructions}</p>
                        <h3 class="fs-3 fw-bold">Area : <span class="fs-4">${data.strArea}</span></h3>
                        <h3 class="fs-3  fw-bold">Category : <span class="fs-4">${data.strCategory}</span></h3>
                        <h3 class="fs-3  fw-bold">Recipes :</h3>
                        <ul class="d-flex flex-wrap g-3 list-unstyled">${ingredients}</ul>
                        <h3 class="fs-3  fw-bold">Tags :</h3>
                        <ul class="d-flex flex-wrap g-3 list-unstyled">${strTags}</ul>
                        <a target="_blank" href="${data.strSource}" class="btn btn-success mb-3 me-2">Source</a>
                        <a target="_blank" href="${data.strYoutube}" class="btn btn-danger mb-3 ">Youtube</a>
                    </div>
                    <div class="closeDetails">
                        <i onclick="closeDetails()" class="fa-solid fa-x justify-content-between"></i>
                    </div>
                </div>
                `

    showDetails.innerHTML = list;
}

function closeDetails(){
    showDetails.innerHTML = "";
    rowData.classList.remove("d-none");
    document.querySelector("#search").classList.remove("invisible");
}




// Search section



function showSearch() {
    closeSide();
    closeDetails();
    document.querySelector("#search").innerHTML = `
        <div class="container text-white">
            <div class="row">
                <div class="col-md-6">
                    <input onkeyup="getSearchName(this.value)" type="text" placeholder="Search By Name" class="form-control inputSearch text-white bg-transparent">
                </div>
                <div class="col-md-6">
                    <input onkeyup="getSearchFLetter(this.value)" type="text" maxlength="1" placeholder="Search By First Letter" class="form-control inputSearch text-white bg-transparent">
                </div>
            </div>
        </div>
    </section>`
    rowData.innerHTML = "";
}

async function getSearchName(term) {
    if (term == "") {
        displayFoods({});
        $("#loading").fadeOut(500);
    }
    else {
        let apiSearchN = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        let searchNData = await apiSearchN.json();
        searchNData.meals ? displayFoods(searchNData.meals) : displayFoods({});
    }

}
async function getSearchFLetter(term) {
    if (term == "") {
        displayFoods({});
    }
    else {
        let apiSearchL = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        let searchLData = await apiSearchL.json();
        searchLData.meals ? displayFoods(searchLData.meals) : "";
    }

}

function closeSearch(){
    document.querySelector("#search").innerHTML=""
}



// Contact section

function showContact(){
    closeSide();
    document.querySelector("#search").innerHTML=""
    let list=`<div id="contact" class="d-flex justify-content-center align-items-center min-vh-100 text-center">
        <div class="container w-75">
            <div class="row g-4">
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Name" class="form-control inputName">
                    <p class="text-danger m-0 d-none wrongName">include at least 3 letters starting with capital</p>
                </div>
                <div class="col-md-6">
                    <input type="email" placeholder="Enter Your Email" class="form-control inputEmail">
                    <p class="text-danger m-0 d-none wrongEmail">name@example.com</p>
                </div>
                <div class="col-md-6">
                    <input type="number" placeholder="Enter Your Phone" class="form-control inputPhone">
                    <p class="text-danger m-0 d-none wrongPhone">wrong phone number</p>
                </div>
                <div class="col-md-6">
                    <input type="number" placeholder="Enter Your Age" class="form-control inputAge">
                    <p class="text-danger m-0 d-none wrongAge">wrong age</p>
                </div>
                <div class="col-md-6">
                    <input type="password" placeholder="Enter Your password" class="form-control inputPass">
                    <p class="text-danger m-0 d-none wrongPass">you must strenth your password, from 8 to 20 characters</p>
                </div>
                <div class="col-md-6">
                    <input type="password" placeholder="Repassword" class="form-control inputRePass">
                    <p class="text-danger m-0 d-none wrongRePass">wrong password</p>
                </div>
            </div>
            <p class="text-danger mt-3 mb-0 d-none empty">Fill in all fields first</p>
            <button onclick="validated()" class="btn btn-outline-warning btnSubmit mt-4">Submit</button>
        </div>
    </div> `

    rowData.innerHTML=list;
}

function validateName() {
    let regexName = /^[A-Z][a-z ]{2,20}$/
    if (regexName.test($(".inputName").val()) == true) {
        $(".inputName").addClass("is-valid");
        $(".inputName").removeClass("is-invalid");
        $(".wrongName").addClass("d-none");
        return true;
    }
    else {
        $(".inputName").removeClass("is-valid");
        $(".inputName").addClass("is-invalid");
        $(".wrongName").removeClass("d-none")
        return false;
    }
}


function validateEmail() {
    let regexEmail = /^\w+@\w{3,8}(\.com|\.net)$/
    if (regexEmail.test($(".inputEmail").val()) == true) {
        $(".inputEmail").addClass("is-valid");
        $(".inputEmail").removeClass("is-invalid");
        $(".wrongEmail").addClass("d-none");
        return true;
    }
    else {
        $(".inputEmail").removeClass("is-valid");
        $(".inputEmail").addClass("is-invalid");
        $(".wrongEmail").removeClass("d-none");
        return false;
    }
}


function validatePhone() {
    let regexPhone = /^(010|011|012|015)\d{8}$/
    if (regexPhone.test($(".inputPhone").val()) == true) {
        $(".inputPhone").addClass("is-valid");
        $(".inputPhone").removeClass("is-invalid");
        $(".wrongPhone").addClass("d-none");
        return true;
    }
    else {
        $(".inputPhone").removeClass("is-valid");
        $(".inputPhone").addClass("is-invalid");
        $(".wrongPhone").removeClass("d-none");
        return false;
    }
}

function validateAge() {
    let regexAge = /^([6-9]{1}|\d{2}|100)$/
    if (regexAge.test($(".inputAge").val()) == true) {
        $(".inputAge").addClass("is-valid");
        $(".inputAge").removeClass("is-invalid");
        $(".wrongAge").addClass("d-none");
        return true;
    }
    else {
        $(".inputAge").removeClass("is-valid");
        $(".inputAge").addClass("is-invalid");
        $(".wrongAge").removeClass("d-none");
        return false;
    }
}


function validatePass() {
    let regexPass = /^[a-zA-Z0-9!@#$%]{8,20}$/
    if (regexPass.test($(".inputPass").val()) == true) {
        $(".inputPass").addClass("is-valid");
        $(".inputPass").removeClass("is-invalid");
        $(".wrongPass").addClass("d-none");
        return true;
    }
    else {
        $(".inputPass").removeClass("is-valid");
        $(".inputPass").addClass("is-invalid");
        $(".wrongPass").removeClass("d-none");
        return false;
    }
}



function validateRePass() {
    if ($(".inputPass").val() != "" && $(".inputPass").val() == $(".inputRePass").val()) {
        $(".inputRePass").addClass("is-valid");
        $(".inputRePass").removeClass("is-invalid");
        $(".wrongRePass").addClass("d-none");
        return true;
    }
    else {
        $(".inputRePass").removeClass("is-valid");
        $(".inputRePass").addClass("is-invalid");
        $(".wrongRePass").removeClass("d-none");
        return false;
    }

}

function UserInformation() {
    validateName();
    validateEmail();
    validatePhone();
    validateAge();
    validatePass();
    validateRePass();
    if (validateName() && validateEmail() && validatePhone() && validatePass() && validateRePass() && validateAge() == true) {
        return true;
    }
    else {
        return false;
    }
}

function validated(){
   
        if($(".inputName").val()==""||$(".inputEmail").val()==""||$(".inputPhone").val()==""||$(".inputAge").val()==""||$(".inputPass").val()==""||$(".inputRePass").val()=="") {
            $(".empty").removeClass("d-none")
           }
           else{
            if (UserInformation() == true) {
                $(".userName").removeClass("d-none");
                localStorage.setItem("newUser", $(".inputName").val());
                let welcomeUser = localStorage.getItem("newUser");
                document.querySelector('.userName').innerHTML = `Welcome ${welcomeUser}`;
                $(".empty").addClass("d-none");
            }
            else {
                $(".userName").addClass("d-none");
                $(".empty").addClass("d-none");
            }
           }
}


// The End //
   




