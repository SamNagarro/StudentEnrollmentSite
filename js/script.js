var table = document.getElementById('studentTable');
var form = document.getElementById('detailForm');
var submit = document.getElementById('submit');
var clear = document.getElementById('clear');
var inpName = document.getElementById('inputName');
var email = document.getElementById('inputEmail');
var website = document.getElementById('inputWebsite');
var imgLink = document.getElementById('inputImgLink');
var male = document.getElementById('maleRadio');
var female = document.getElementById('femaleRadio');
var skill1 = document.getElementById('skill1');
var skill2 = document.getElementById('skill2');
var skill3 = document.getElementById('skill3');

let detailsAdded = false;
let areDetailsValid = false;
var gender = '';

console.log('script running');

form.addEventListener('submit', handleForm);

function handleForm(event) {
    event.preventDefault();
}

// Clearing Form Data
clear.onclick = () => {
    console.log('Clear button pressed');
    form.reset();
    inpName.className = 'form-control';
    email.className = 'form-control';
    website.className = 'form-control';
    imgLink.className = 'form-control';
    male.className = 'form-check-input';
    female.className = 'form-check-input';
    areDetailsValid = false;
    detailsAdded = false;
    opacity = 0;
    intervalID = 0;
}

inpName.addEventListener('change', updateValue);
email.addEventListener('change', updateValue);
website.addEventListener('change', updateValue);
imgLink.addEventListener('change', updateValue);
male.addEventListener('change', updateValue);
female.addEventListener('change', updateValue);

skill1.addEventListener('change', updateCheck);
skill2.addEventListener('change', updateCheck);
skill3.addEventListener('change', updateCheck);

function updateCheck(e) {
    if (this.checked) {
        console.log("Checkbox is checked..");
    } else {
        console.log("Checkbox is not checked..");
    }

}

function updateValue(e) {
    Validation();
}

submit.onclick = () => {
    var valid = Validation();
    if (valid && !detailsAdded) {
        console.log('All details are valid');
        addDetailsinTable();
        fadeIn();
    }
}

function Validation() {
    var nameValid = false;
    var emailValid = false;
    var websiteValid = false;
    var imgLinkValid = false;
    var genderValid = false;

    // Regular Expression for Email
    var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regUrl = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
    var regImgUrl = /\.(jpeg|jpg|gif|png|tiff|bmp)$/;

    // Checking Conditions

    // Full Name Validation
    if (inpName.value != '') {
        console.log('name field not empty')
        if (!regName.test(inpName.value)) {
            console.log('invalid name');
            inpName.className = 'form-control is-invalid';
        } else {
            console.log('valid name');
            inpName.className = 'form-control is-valid';
            nameValid = true;
        }
    } else { inpName.className = 'form-control'; }

    // Email address validation
    if (email.value != '') {
        console.log('email field not empty');
        if (!regEmail.test(email.value)) {
            console.log('invalid email');
            email.className = 'form-control is-invalid';
        } else {
            console.log('valid email');
            email.className = 'form-control is-valid';
            emailValid = true;
        }
    } else { email.className = 'form-control'; }

    // Website Url validation
    if (website.value != '') {
        console.log('website field not empty');
        if (!regUrl.test(website.value)) {
            console.log('invalid url');
            website.className = 'form-control is-invalid';
        } else {
            console.log('valid url');
            website.className = 'form-control is-valid';
            websiteValid = true;
        }
    } else { website.className = 'form-control'; }

    // Image Link validation
    if (imgLink.value != '') {
        console.log('image link field not empty');
        if (!regImgUrl.test(imgLink.value)) {
            console.log('invalid image link');
            imgLink.className = 'form-control is-invalid';
        } else {
            console.log('valid image link');
            imgLink.className = 'form-control is-valid';
            imgLinkValid = true;
        }
    } else { imgLink.className = 'form-control'; }

    // Gender Validation
    if (male.checked || female.checked) {
        console.log('gender selection is valid')
        genderValid = true;
        if (male.checked) {
            gender = 'Male';
        } else {
            gender = 'Female';
        }
    } else {
        male.className = 'form-check-input';
        female.className = 'form-check-input';
    }

    // Cheking if all details are valid
    if (nameValid === true && emailValid === true && websiteValid === true && imgLinkValid === true && genderValid === true) {
        console.log('checked all details are valid, ready to submit');
        areDetailsValid = true;
    }

    return areDetailsValid;

}

var row;

function addDetailsinTable() {
    console.log('adding details');

    // Adding a row in table
    row = table.insertRow(-1);
    row.style.visibility = 'hidden';
    // row.className = 'fade';

    // Adding cells in row
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Creating a list to add in first cell
    var list = document.createElement('ul');
    list.className = 'list-unstyled';

    // Add Name
    var li = document.createElement('li');
    li.innerHTML = '<h6>' + inpName.value + '</h6>';
    list.appendChild(li);

    // Add Gender
    var li = document.createElement('li');
    li.innerHTML = gender;
    list.appendChild(li);

    // Add Email
    var li = document.createElement('li');
    li.innerHTML = '<a href=\"mailto:' + email.value + '\">' + email.value + '</a>';
    list.appendChild(li);

    // Add Website
    var li = document.createElement('li');
    li.innerHTML = '<a href=\"' + website.value + '\" target="_blank">' + website.value + '</a>';
    list.appendChild(li);

    // Add Skills
    var li = document.createElement('li');
    if (skill1.checked) {
        console.log('skill 1 checked');
        li.innerHTML += skill1.value + ', ';
    }
    if (skill2.checked) {
        console.log('skill 2 checked');
        li.innerHTML += skill2.value + ', ';
    }
    if (skill3.checked) {
        console.log('skill 3 checked');
        li.innerHTML += skill3.value + ', ';
    }
    // Adding all skills in list
    list.appendChild(li);

    // Adding the list in cell1
    cell1.appendChild(list);

    // cell2.style = 'white-space: nowrap;';
    cell2.width = '1%';
    // Creating image tag
    var image = document.createElement('img');
    // image.className = 'responsive';
    image.src = imgLink.value;
    // image.style.maxWidth = '100%';
    // image.style.maxHeight = '100%';
    image.width = '150';
    image.height = '150';
    // image.style.width = '100%';
    // image.style.width = '150px';
    // image.style.height = '150px';
    cell2.appendChild(image);

    detailsAdded = true;
}

var opacity = 0;
var intervalID = 0;

function fadeIn() {
    row.style.opacity = 0;
    intervalID = setInterval(show, 200);
}

function show() {
    // opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"));
    row.style.visibility = 'visible';
    console.log(opacity);
    if (opacity < 1) {
        opacity = opacity + 0.1;
        row.style.opacity = opacity
    } else {
        console.log('stop fade in');
        clearInterval(intervalID);
    }
}