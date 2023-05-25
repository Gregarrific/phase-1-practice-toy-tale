let addToy = false;
const inputForm = document.querySelector('.add-toy-form');
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  loadToys();
});
document.addEventListener('click', event => {
  let likeButton = event.target;
  if (likeButton.className === 'like-btn') {
    // get current number of likes and call function to update JSON file
    let numLikes = likeButton.parentNode.querySelector('p').innerText;
    numLikes = numLikes.substr(0, numLikes.indexOf(' '));
    updateLikes(numLikes, likeButton.id);
  }
});
inputForm.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelectorAll('.input-text');
  addNewToy(input[0].value, input[1].value);
} )
// functions
function loadToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      // create the HTML for each toy and it's elements
      let toy = document.createElement('div');
      toy.className = 'card';
      toy.id = element.name;
      const toyHeader = document.createElement('h2');
      toyHeader.innerHTML = element.name;
      const toyImg = document.createElement('img');
      toyImg.src = element.image;
      toyImg.className = 'toy-avatar'
      const toyLikes = document.createElement('p');
      toyLikes.innerHTML = `${element.likes} Likes`;
      const toyButton = document.createElement('button');
      toyButton.className = 'like-btn';
      toyButton.id = element.id;
      toyButton.innerText = 'Like ❤️';
      document.getElementById('toy-collection').appendChild(toy);
      toy.appendChild(toyHeader);
      toy.appendChild(toyImg);
      toy.appendChild(toyLikes);
      toy.appendChild(toyButton);
    });
  });
}
function updateLikes(numLikes, btnId) {
  let newLikes = parseInt(numLikes) + 1;
  const obj = {};
  obj.likes = newLikes;
  // adding new like to the JSON file
  fetch(`http://localhost:3000/toys/${btnId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({'likes': newLikes})
  })
  .then(response => response.json())
  .then(data => {
    //add the new likes to the p element
    document.getElementById(btnId).previousSibling.innerHTML = `${newLikes} Likes`;
  });
}
function addNewToy(toyName, toyImage) {
    fetch(`http://localhost:3000/toys/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'name': toyName,
      'image': toyImage,
      'likes': 0})
      })
      .then(response => response.json())
      .then(data => {
          // create the HTML for each toy and it's elements
          let toy = document.createElement('div');
          toy.className = 'card';
          toy.id = data.name;
          const toyHeader = document.createElement('h2');
          toyHeader.innerHTML = data.name;
          const toyImg = document.createElement('img');
          toyImg.src = data.image;
          toyImg.className = 'toy-avatar'
          const toyLikes = document.createElement('p');
          toyLikes.innerHTML = `0 Likes`;
          const toyButton = document.createElement('button');
          toyButton.className = 'like-btn';
          toyButton.id = data.id;
          toyButton.innerText = 'Like ❤️';
          document.getElementById('toy-collection').appendChild(toy);
          toy.appendChild(toyHeader);
          toy.appendChild(toyImg);
          toy.appendChild(toyLikes);
          toy.appendChild(toyButton);
        });
}