// Variables
var inputText = document.getElementById('input-text');
var AddBtn = document.getElementById('add');
var todoList = document.getElementById('todo');
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 390.1 482.4" enable-background="new 0 0 390.1 482.4" xml:space="preserve"><g><g><path class="fillRed" fill="#FFFFFF" d="M335,57.8h-75.1C256.2,25.3,228.5,0,195.1,0c-33.5,0-61.1,25.3-64.8,57.8H55.1C24.7,57.8,0,82.5,0,112.9v2.8c0,23.2,14.5,43.1,34.8,51.2v260.4c0,30.4,24.7,55.1,55.1,55.1h210.2c30.4,0,55.1-24.7,55.1-55.1V166.9c20.4-8.1,34.8-28,34.8-51.2v-2.8C390.1,82.5,365.4,57.8,335,57.8z M195.1,26.1c19,0,34.9,13.6,38.4,31.7h-76.9C160.1,39.8,176,26.1,195.1,26.1z M329.2,427.3c0,16-13,29-29,29H89.9c-16,0-29-13-29-29V170.9h268.2V427.3z M364,115.7c0,16-13,29-29,29H55.1c-16,0-29-13-29-29v-2.8c0-16,13-29,29-29H335c16,0,29,13,29,29L364,115.7L364,115.7z"/><path class="fillRed" fill="#FFFFFF" d="M125,422.9c7.2,0,13.1-5.9,13.1-13.1V262.6c0-7.2-5.9-13.1-13.1-13.1c-7.2,0-13.1,5.9-13.1,13.1v147.2C111.9,417,117.8,422.9,125,422.9z"/><path class="fillRed" fill="#FFFFFF" d="M195.1,422.9c7.2,0,13.1-5.9,13.1-13.1V262.6c0-7.2-5.9-13.1-13.1-13.1c-7.2,0-13.1,5.9-13.1,13.1v147.2C182,417,187.8,422.9,195.1,422.9z"/><path class="fillRed" fill="#FFFFFF" d="M265.1,422.9c7.2,0,13.1-5.9,13.1-13.1V262.6c0-7.2-5.9-13.1-13.1-13.1c-7.2,0-13.1,5.9-13.1,13.1v147.2C252.1,417,257.9,422.9,265.1,422.9z"/></g></g></svg>';
var memoryList = [];

// If there are elements inside memory, put them into the memoryList array
if (localStorage.getItem("list")) {
	memoryList = localStorage.getItem("list").split(',');
}

function todoPopulate(text) {

	// Creating a new list element
	var newListEl = document.createElement('li');
	newListEl.classList.add('list-item');
	newListEl.innerHTML = '<div class="text">'+text+'</div><button class="remove">'+removeSVG+'</button';

	// Prepending the list item into the <ul>
	todoList.insertBefore(newListEl, todoList.childNodes[0]);	

	// Clearing out the text input
	inputText.value = '';

	// Adding an event listener for the 'remove' button
	var removeBtn = newListEl.querySelector('.remove');
	removeBtn.addEventListener('click', function() {
		// Removing the item from memory
		removeFromMemory(text);
		// Removing the DOM element
		this.parentNode.remove();
	}, false);

}

function addToMemory(text) {
	memoryList.push(text);
	localStorage.setItem("list", memoryList);
}

function removeFromMemory(text) {
	memoryList = memoryList.filter(function(e) { return e !== text });
	localStorage.setItem("list", memoryList);
}

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// Loading list elements from existing memory
if (memoryList.length > 1) {
	for (var i = 1; i < memoryList.length; i++) {
		todoPopulate(memoryList[i]);
	}
}

// Clicking the '+' button or hitting the enter key runs the todoPopulate() function if there is any text inside the input

AddBtn.addEventListener('click', function() {
	var text = inputText.value;
	if (text) {
		todoPopulate(text, true);
		addToMemory(text);
	}
}, false);

document.addEventListener('keypress', function(e) {
	var text = inputText.value;
	if (e.keyCode == 13 && text) {
		todoPopulate(text, true);
		addToMemory(text);
	}
});