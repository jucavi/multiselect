const emailsInput = document.querySelector('#maillist');
const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('#email-input');
const hiddenElemetsDiv = document.querySelector('#emails_hidden');
// { elements: [list of hidden elements] }
let tags = [];

const elements = (window.onload = function (hiddenElementsDiv) {
  try {
    const elements = JSON.parse(hiddenElementsDiv.innerHTML).elements;

    hiddenElemetsDiv.innerHTML = '';
    return elements;
  } catch (e) {
    return [];
  }
})(hiddenElemetsDiv);

function bestMatch(elements, input) {
  if (!input) return [];

  return elements.filter((element) => {
    return element.startsWith(input);
  });
}

function createTags(label) {
  const div = document.createElement('div');
  div.setAttribute(
    'class',
    'tag border border-danger py-1 px-2 me-1 rounded bg-secondary'
  );
  const span = document.createElement('span');
  span.setAttribute('class', 'list__value');
  span.innerHTML = label;
  const closeBtn = document.createElement('i');
  closeBtn.setAttribute('class', 'fa-solid fa-xmark ps-1');
  closeBtn.setAttribute('tag-data', label);

  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

function reset() {
  document.querySelectorAll('.tag').forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  reset();
  for (let tag of [...tags].reverse()) {
    const input = createTags(tag);
    tagContainer.prepend(input);
  }
  input.value = '';
  input.focus();
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') e.preventDefault();
});

let find = false;
input.addEventListener('keyup', function (e) {
  const completeDiv = document.querySelector('#complete');
  match = bestMatch(elements, input.value);

  completeDiv.innerText = match[0] ? match[0] : '';

  if (e.key === 'Enter') {
    if (find === false) {
      e.preventDefault();
      this.value = match[0];
      find = true;
    } else {
      tags.push(this.value);
      addTags();
      completeDiv.innerText = '';
      find = false;
    }
  }
});

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    const label = event.target.getAttribute('tag-data');
    const index = tags.indexOf(label);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
    addTags();
  }
});
