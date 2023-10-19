const dotChild = document.querySelector('.fixed--dot-child ')
const dotContainer = document.querySelector('.dots--container')
const dts = document.querySelector('.dts')
const logoutLink = document.getElementById('logout')
const cancel = document.querySelector('.disappear')
const threeDot = document.querySelector('.three-dot')
const logOutDoc = document.querySelector('.logout')



const logOut = async () => {
    try {

        const res = await fetch('/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }

        });

        if (res.ok) {
            window.location.href = '/login';
        }

    } catch (err) {
        console.error(err.message);
    }
};


threeDot.addEventListener('click', e => {
    e.preventDefault()
    dotChild.style.display = 'block'
    cancel.style.display = 'block'
    threeDot.style.display = 'none'
})


cancel.addEventListener('click', e => {
    e.preventDefault()
    dotChild.style.display = 'none'
    cancel.style.display = 'none'
    threeDot.style.display = 'block'
})

logoutLink.addEventListener('click', () => {
    logOut()
})

logOutDoc.addEventListener('click', () => {
    logOutFn()
})

