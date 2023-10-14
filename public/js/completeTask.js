const main = document.querySelector('.main-overview');
main.addEventListener('change', async (event) => {
    const target = event.target;

    if (target.classList.contains('checkbox')) {
        const taskContainer = target.closest('.task--container');
        if (taskContainer) {
            const taskId = taskContainer.id;
            console.log(taskId)
            const completed = target.checked;

            if (completed) {
                try {
                await updateTaskStatus(taskId);
                  
                   
                } catch (error) {
                    console.log('Error:', error);
                }
            }
        }
    }
});

async function updateTaskStatus(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/updateTask/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        // Handle the response data if needed
    } catch (error) {
        throw error; // Rethrow the error for the caller to handle
    }
}
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/delete/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        // Handle the response data if needed
    } catch (error) {
        throw error; // Rethrow the error for the caller to handle
    }
}
