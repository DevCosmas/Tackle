const main = document.querySelector('.main-overview')
const taskList = document.querySelector('.list--wrapper')
function createTemplate(task) {
    const taskContainerHTML = `
   
  <div class="task--wrapper"  id="${task._id}">
  <div class="task_name--contain">
  <span class="task--name ">${task.name}</span>
  </div>
    <div class="icon--contain">
    <input class="checkbox" type="checkbox">
    <span class="delete--icon">
      <svg class="delete--icon_icon not" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
        </path>
      </svg>
    </span>
    </div>
  </div>
`;
    const taskContainer = document.createElement('div');

    taskContainer.innerHTML = taskContainerHTML;

    main.appendChild(taskContainer)
}

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.querySelector('.task--entry');

    const taskFn = async (name) => {
        try {
            const res = await fetch('http://localhost:3000/api/v1/createTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),

            });

            if (res.ok) {
                const data = await res.json();
                createTemplate(data.newTask);

            } else {
                console.log(res.data.error)
            }
        } catch (error) {
            console.log(error);
        }

    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskInput = document.querySelector('.task-input');
        await taskFn(taskInput.value); 
        taskInput.value = "";
    });
})



