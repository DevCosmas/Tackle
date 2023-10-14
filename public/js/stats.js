// localhost:3000/api/v1/stats
const statElement= document.querySelector('.stats')
async function getStats() {
    try {
        const res = await fetch('https://localhost:3000/api/v1/stats');

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

statElement.addEventListener('click', e => {
    e.preventDefault();
    alert('your stats is loading');
    getStats()
});
