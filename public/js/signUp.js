
const signUpForm = document.querySelector('.login')


const signUpFn = async (fullname, email, password, confirmPassword) => {
    try {
        const signUpDetails = {
            fullname,
            email,
            password,
            confirmPassword
        };
        const res = await fetch('/api/v1/sign_Up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpDetails)
        });

        if (res.ok) {
            const data = await res.json();
            window.setTimeout(()=>{
                location.assign('/overview')
            },500)
        } else {
            console.log(new Error)
        }
    } catch (err) {
        console.error(err);
    }
};

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    signUpFn(fullname,email,password,confirmPassword)
})