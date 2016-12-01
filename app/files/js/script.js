var isModalOpen = false,
  modalObject = {},
  modalTemplate = '',
  fields = [],
  objectsAdded = 0;

window.addEventListener('load', onWindowLoad, false);

/**
 * registers event listeners on page load
 */
function onWindowLoad() {
  // add event listener to addNewCar button
  document.getElementById('addNewCarButton').addEventListener("click", addNewCar);
}

/**
 * starts the add new car functionality
 */
function addNewCar(event) {
  event.stopPropagation();
  modalObject = getObject();
  fields = modalObject.fields;
  modalTemplate = modalObject.template;
  openModal();
}

/**
 * obtains the object that will be used in the modal
 * in a real application, this will probably be a call made to the server
 */
function getObject() {
  return _modalObject;
};

/**
 * opens the modal
 */
function openModal() {
  isModalOpen = true;

  // build the modal template
  var modal = document.createElement("div");
  modal.id = "modal";
  modal.innerHTML = modalTemplate;

  // add the modal content to the DOM
  document.body.appendChild(modal);

  // make the modal backdrop visible
  document.getElementById('modalBackdrop').style.visibility = 'visible';
  document.getElementById('modalBackdrop').style.zIndex = '2';

  // remove event listener for the addNewCar button
  document.getElementById('addNewCarButton').removeEventListener("click", addNewCar);

  // add event listeners for the saveNewCar and cancelNewCar buttons
  document.getElementById('saveNewCarButton').addEventListener("click", saveNewCar);
  document.getElementById('cancelNewCarButton').addEventListener("click", cancelNewCar);

  watchersInit();
}

/**
 * updates dependencies and registers event listeners on all the inputs
 */
function watchersInit() {
  updateScreenDependencies();

  for (var i = 0; i < fields.length; i += 1) {
    var element = document.getElementById(fields[i]);
    element.addEventListener("change", onChange);
    element.addEventListener("keypress", onKeypress);
    element.addEventListener("keydown", onKeydown);
    element.addEventListener("click", onClick);
  }
}

/**
 * removes the event listeners added on watchersInit
 */
function watchersDestroy() {
  for (var i = 0; i < fields.length; i += 1) {
    var element = document.getElementById(fields[i]);
    element.removeEventListener("change", onChange);
    element.removeEventListener("keypress", onKeypress);
    element.removeEventListener("keydown", onKeydown);
    element.removeEventListener("click", onClick);
  }
}

/**
 * updates dependencies based on the values received in the getObject's response
 */
function updateScreenDependencies() {
  if (modalObject.screenDependencies) {
    var object = modalObject.screenDependencies;
    for (var key in object) {
      if (document.getElementById(object[key]).value === 'true') {
        document.getElementById(key).parentElement.style.visibility = 'visible';
      } else {
        document.getElementById(key).parentElement.style.visibility = 'hidden';
      }
    }
  }
}

/**
 * function used in the 'change' event
 * triggers validation with the necessary params
 */
function onChange(event) {
  event.stopPropagation();
  var field = event.target.id,
    element = document.getElementById(field),
    value = document.getElementById(field).value;

  hideTooltip(field);
  validateField(event, field, value, true);
}

/**
 * function used in the 'keypress' event
 * triggers validation with the necessary params
 */
function onKeypress(event) {
  event.stopPropagation();
  if (event.key === 'Backspace' || event.key === 'Tab') {
    return;
  }

  var field = event.target.id;

  hideTooltip(field);
  validateField(event, field, event.key);
}

/**
 * function used in the 'keydown' event
 * hides tooltip on 'backspace'
 */
function onKeydown(event) {
  event.stopPropagation();

  if (event.key === 'Backspace') {
    var field = event.target.id;
    hideTooltip(field);
  }
}

/**
 * function used in the 'click' event
 * hides tooltip when needed
 */
function onClick(event) {
  event.stopPropagation();
  var field = event.target.id,
    element = document.getElementById(field);

  if (element.className === 'invalid') {
    element.value = '';
    element.className = '';
    hideTooltip(field);
  }

  if (element.className === 'short') {
    element.className = '';
    hideTooltip(field);
  }
}


/**
 * used for input validation (client side)
 */
function validateField(event, field, value, change) {
  var element = document.getElementById(field);

  switch (modalObject.types[field]) {
    case 'string':
      if (value.search(/^[a-zA-Z !]*$/) === -1) {
        event.preventDefault();
        showTooltip(field, 'only letters are allowed');
        if (change) {
          showTooltip(field, 'only letters are allowed');
        }
      }
      break;
    case 'number':
      if (value.search(/^\d+$/) === -1) {
        event.preventDefault();
        showTooltip(field, 'only digits are allowed here');
        if (change) {
          showTooltip(field, 'only digits are allowed here');
        }
      }
      break;
    case 'select':
      if (change) {
        updateScreenDependencies();

        if (field === 'brand') {
          // build the tooltip template
          var logo = document.createElement("div");
          logo.id = field + '-logo';
          logo.className = "logo";
          logo.style.cssText = 'background-image: url(' + carLogos[element.value] + ')';

          document.getElementById(field).parentElement.appendChild(logo);
        }
      }
      break;
    case 'color':
      if (value.search(/^[a-zA-Z]*$/) === -1) {
        event.preventDefault();
        showTooltip(field, 'only letters are allowed');
        if (change) {
          showTooltip(field, 'only letters are allowed');
          document.getElementById('color-view').style.cssText = 'visibility:hidden';
        }
      } else if (change) {
        if (cssColors.indexOf(value) !== -1) {
          document.getElementById('color-view').style.cssText = 'visibility:visible;background-color:' + value + ";";
        } else {
          document.getElementById('color-view').style.cssText = 'visibility:hidden';
          if (element.value.length > 15) {
            element.value = element.value.substr(0, 15) + '...';
          }
          showTooltip(field, '"' + element.value + '"' + ' is not a color');
        }
      }
      break;
  }
}

/**
 * displays the tooltip
 */
function showTooltip(field, message) {
  var element = document.getElementById(field),
    tooltip = document.createElement("div");

  tooltip.id = field + '-tooltip';
  tooltip.className = "tooltip";
  tooltip.innerHTML = message;

  element.parentElement.appendChild(tooltip);

  if (element.className !== 'short') {
    element.className = 'invalid';
  }

  element.style.color = 'red';
}

/**
 * hides the tooltip
 */
function hideTooltip(field) {
  if (document.getElementById(field + '-tooltip')) {
    document.getElementById(field + '-tooltip').remove();
    document.getElementById(field).style.color = 'black';
    document.getElementById(field).className = '';
  }
}

/**
 * saves the newly added anouncement
 */
function saveNewCar(event) {
  event.stopPropagation();
  var ready = true,
    savedObject = {};

  for (var i = 0; i < fields.length; i += 1) {
    var element = document.getElementById(fields[i]);
    if (element.parentElement.style.visibility !== 'hidden' && (!element.value || element.value === '')) {
      ready = false;

      var message = 'please enter a value';

      if (modalObject.types[fields[i]] === 'select') {
        message = 'please select a value';
      }

      hideTooltip(fields[i]);
      showTooltip(fields[i], message);
    } else if (element.parentElement.style.visibility !== 'hidden' && modalObject.types[fields[i]] === 'string' && element.value.length < 3) {
      ready = false;

      element.className = 'short';
      message = 'value entered is too short';
      hideTooltip(fields[i]);
      showTooltip(fields[i], message);
    } else {
      savedObject[fields[i]] = element.value;
    }
  }

  // selects the first invalid field in form
  focusFirstInvalidField();

  if (ready) {
    //build object template
    var object = document.createElement('div');
    object.id = 'addedCar-' + objectsAdded;
    object.className = 'addedCar';

    for (var key in savedObject) {
      object.innerHTML += '<div>' + key + ': ' + savedObject[key] + '</div>';
    }

    objectsAdded += 1;

    document.getElementById('addedObjects').appendChild(object);
    hideModal();
  }
}

function focusFirstInvalidField() {
  var found = false,
    count = 0;

  while (!found && count < fields.length) {
    var element = document.getElementById(fields[count]);

    if (element.className === 'invalid') {
      element.focus();
      found = true;
    } else {
      count += 1;
    }
  }
}

/**
 * cancels the add, closing the modal
 */
function cancelNewCar(event) {
  event.stopPropagation();
  hideModal();
}

/**
 * hides the modal and backdrop
 */
function hideModal() {
  isModalOpen = false;
  watchersDestroy();

  // remove event listeners in modal
  document.getElementById('saveNewCarButton').removeEventListener("click", saveNewCar);
  document.getElementById('cancelNewCarButton').removeEventListener("click", cancelNewCar);

  // add event listener to addNewCar button
  document.getElementById('addNewCarButton').addEventListener("click", addNewCar);

  // remove the modal content
  var element = document.getElementById("modal");
  element.parentNode.removeChild(element);

  // hide the modal backdrop
  document.getElementById('modalBackdrop').style.cssText = 'visibility:hidden;z-index:0';
}