const main = document.querySelector('.main-overview');
main.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete--icon_icon')) {
        let taskContainer = event.target.parentElement;
        while (taskContainer && !taskContainer.classList.contains('task--wrapper')) {
            taskContainer = taskContainer.parentElement;
        }
        if (taskContainer) {
            const taskId = taskContainer.getAttribute('id');
            try {
                await deleteTask(taskId);
                taskContainer.remove();

            } catch (error) {
                console.log('Error:', error);
            }
        }
    }



});


async function deleteTask(taskId) {
    try {
        const response = await fetch(`/api/v1/delete/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.log(error);
        }
        const data = await response.json();

    } catch (error) {
        console.log(error);
    }
}
