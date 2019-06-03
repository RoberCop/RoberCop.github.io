//VALIDATE SIGNUP
var signinName = document.getElementById('signin-name');
var signinPass = document.getElementById('signin-password');
var signinBtn = document.getElementById('signin-btn')
var signupSubmit = document.getElementById('submit-signup');
var signupName = document.getElementById('signup-username');
var password1 = document.getElementById('signup-password');
var password2 = document.getElementById('signup-repeat');

signinBtn.addEventListener('click', checkValues);
signupSubmit.addEventListener('click', checkInput);
signinName.addEventListener('keyup', enterSignin);
signinPass.addEventListener('keyup', enterSignin);
signupName.addEventListener('keyup', enterSignup);
password1.addEventListener('keyup', enterSignup);
password2.addEventListener('keyup', enterSignup);

function checkInput() 
{

    removeMessage();

    if (signupName.value.length == 0) 
    {
        signupName.focus();
        signupName.className = 'wrong-input';
        signupName.nextElementSibling.innerHTML = 'Username is required'
        return false;
    }

    if (password1.value.length == 0) 
    {
        password1.focus();
        password1.className = 'wrong-input';
        password1.nextElementSibling.innerHTML = 'Password is required'
        return false;
    }

    if (password2.value.length == 0) 
    {
        password2.focus();
        password2.className = 'wrong-input';
        password2.nextElementSibling.innerHTML = 'Password is required'
        return false;
    }
    if (password2.value !== password1.value) 
    {
        password2.focus();
        password1.className = 'wrong-input';
        password2.className = 'wrong-input';
        password2.nextElementSibling.innerHTML = 'The passwords does not match'
        return false;
    }
    storeUser();
    signupModal.style.display = 'none';
    signedUp.style.display = 'flex';
    return true;


}

//CHECK LOGIN CREDENTIALS
function checkValues() 
{
    if(signinPass.value.length > 0 && signinPass.value.length >0) 
    {
        checkLogIn();
    }
    else 
    {
        signinPass.nextElementSibling.innerHTML = "Username and password is required";
    }
}

function checkLogIn() 
{
    let username = document.getElementById("signin-name").value;
    let password = document.getElementById("signin-password").value;

    for(let i = 0; i < usersArr.length; i++) 
    {

        if(username == usersArr[i].username)
        {
            if(password == usersArr[i].password)
            {
                console.log("success");
                window.location.assign('Overview.html');
                return;
            }
        } 
    }
    
    loginErr();
    return;
}

function loginErr()
{
    removeMessage();
    signinPass.nextElementSibling.innerHTML = "Wrong username or password"
    signinName.className = 'wrong-input';
    signinPass.className = 'wrong-input';
    }

function storeUser() 
{
    usersArr.push(
        {
        username: signupName.value,
        password: password2.value
    });
    console.log(usersArr);
};




function removeMessage() 
{
    var errorInput = document.querySelectorAll('.wrong-input');
    [].forEach.call(errorInput, function (el) 
                    {
        el.className = 'text-input';
    });

    var errorPara = document.querySelectorAll('.error');
    [].forEach.call(errorPara, function (el) 
                    {
        el.innerHTML = ""
    });
}

function enterSignin(event) 
{
    if(signinName.value.length > 0 && signinPass.value.length > 0 && event.key === 'Enter') {
        checkLogIn();
    }
}

function enterSignup(event) 
{
    if(event.key === 'Enter') {
        checkInput();
    }
}


