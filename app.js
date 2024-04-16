// dynamic import 
import ('inquirer').then(({ default: inquirer }) => {
    // Array to store tasks
    let tasks = [];

    // Main function to run the task manager
    function runTaskManager() {
        // Prompt the user for action selection
        inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Add Task', 'View Tasks', 'Delete Task', 'Exit']
            }])
            .then((answers) => {
                // Perform the selected action based on user input
                switch (answers.action) {
                    case 'Add Task':
                        addTask();
                        break;
                    case 'View Tasks':
                        viewTasks();
                        break;
                    case 'Delete Task':
                        deleteTask();
                        break;
                    case 'Exit':
                        console.log('Exiting Task Manager. Goodbye!');
                        break;
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    // Function to add a new task
    function addTask() {
        inquirer.prompt([{
                type: 'input',
                name: 'taskName',
                message: 'Enter the name of the task:'
            }])
            .then((answers) => {
                // Add the new task to the tasks array
                tasks.push(answers.taskName);
                console.log('Task added successfully!');
                // Prompt user for next action
                runTaskManager();
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    // Function to view tasks
    function viewTasks() {
        console.log('Current Tasks:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
        // Prompt user for next action
        runTaskManager();
    }

    // Function to delete a task
    function deleteTask() {
        inquirer.prompt([{
                type: 'list',
                name: 'taskIndex',
                message: 'Select the task to delete:',
                choices: tasks.map((task, index) => ({ name: `${index + 1}. ${task}`, value: index }))
            }])
            .then((answers) => {
                // Remove the selected task from the tasks array
                tasks.splice(answers.taskIndex, 1);
                console.log('Task deleted successfully!');
                // Prompt user for next action
                runTaskManager();
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    // Entry point: Start the task manager
    runTaskManager();
}).catch((error) => {
    console.error('An error occurred while importing inquirer:', error);
});