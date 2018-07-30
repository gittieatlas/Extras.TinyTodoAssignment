/*
Tasks:

1. When you click the 'Add Task' button, a <li> task is created.
  Hints:
    - Form elements can be 'submit'ted by giving a button the attribute `type="submit"`. (This is done for you)
    - Then we can add an event listener on the form, listening for the 'submit' event to be triggered.
    - When you click the button and your form submits, you'll notice that the entire page reloads, and you lose your data! We don't want that! The default form submission behavior is NOT what we want. So we will need to add `evt.preventDefault` (evt being whatever you named your event object passed to the callback when you created your event listener) to the top of our callback.
    - If you add the event listener to the form, the `this` object and the target is the form. To get to the value inside the input, we can use `evt.target.task.value` where 'task' is the name of the input element
    - Now you just need to create the li element, and append it to the ul.

2. When you click on a task (or a checkbox next to the task) the task is crossed out
  Hints:
    - If you add the event listener to the ul, then you don't need one for each li... remember, the 'evt.target' will show you what element you clicked
    - We can change styles of an element easily by adding or removing classes
    - Do a quick Google search on how to create a strike-through effect with CSS

3. Create a delete button for each task that will take that task off the DOM!
  - No hints for you ;)
*/

const taskInput = document.getElementById('input');
const listNode = document.getElementById('list');

let tasks = [];
class Task {
  constructor(value) {
    this.value = value;
    this.completed = false;
  }
  setItem(checked) {
    this.completed = checked;
  }
}

/* add item to list on dom */
function addListItem(task) {
  const nameOfNode = tasks.length - 1;
  let node = document.createElement('LI');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = 0;
  checkbox.name = nameOfNode;
  checkbox.classList.add('formCheckInput');

  node.appendChild(checkbox);

  let textnode = document.createTextNode(task.value);
  node.appendChild(textnode);
  node.name = nameOfNode;
  listNode.appendChild(node);
}

/**
 * Event Listeners
 */
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault();

  if (taskInput.value.length < 1) return;

  let task = new Task(taskInput.value);
  tasks.push(task);
  addListItem(task);
  taskInput.value = '';
});

listNode.addEventListener('change', event => {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  let checkbox = event.target;
  if (checkbox) {
    if (checkbox.checked) {
      checkbox.parentNode.classList.add('completed');
      checkbox.setAttribute('checked', 'checked');
    } else {
      checkbox.parentNode.classList.remove('completed');
      checkbox.removeAttribute('checked');
    }
    tasks[checkbox.name].setItem(checkbox.checked);
  }
});
