const main = document.querySelector('.main-overview');
main.addEventListener('change', async (event) => {
    const target = event.target;

    if (target.classList.contains('checkbox')) {
        const taskContainer = target.closest('.task--wrapper');
        
        if (taskContainer) {
            const taskId = taskContainer.id;
            
            const completed = target.checked;
            if (completed) {
                try {
                    
                    await updateTaskStatus(taskId);
                    setTimeout(() => {
                        taskContainer.remove()

                    }, 1500);
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
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

    } catch (error) {
        throw error;
    }
}
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/delete/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        throw error;
    }
}
