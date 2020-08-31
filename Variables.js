export let tasksObj = [];
export const regex = new RegExp("^[a-zA-Z0-9 ]+$");
export const dateRegex = new RegExp("^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\\d{4}$");
export const taskInput = document.getElementById('taskInput');
export const INVALID_DATE = 'InvalidDate';