
const loginForm = document.querySelector('.login')


const loginFn = async (email, password) => {
    try {
        const loginDetails = {email,password};
        const res = await fetch('http://localhost:3000/api/v1/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails)
        });

        if (res.ok) {
            const data = await res.json();
            window.setTimeout(()=>{
                location.assign('/overview')
            },500)
        } else {
            alert('Login failed');
        }
    } catch (err) {
        console.error(err.message);
    }
};

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('.login-email').value;
    const password = document.querySelector('.login-password').value;
    loginFn(email, password)
})