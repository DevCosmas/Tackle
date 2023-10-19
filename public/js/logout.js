const logOutDoc = document.querySelector('.logout')


export const logOutFn = async () => {
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

logOutDoc.addEventListener('click', ()=>{
    logOutFn()
})