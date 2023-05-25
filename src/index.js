let addToy = false;
let likeButtons;

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
    let numLikes = likeButton.parentNode.querySelector('p').innerText;
    numLikes = numLikes.substr(0, numLikes.indexOf(' '));
    updateLikes(numLikes, likeButton.id);
  }
});

function loadToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(element => {
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
    likeButtons = document.querySelectorAll('.like-btn');
  });
  }

  function updateLikes(numLikes, btnId) {
  let newLikes = parseInt(numLikes) + 1;
  const obj = {};
  obj.likes = newLikes;
  console.log(obj);
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
    console.log(data);
    console.log(document.get(btnId))
    // let newLikeP = document.querySelector(`p#${btnId}`);
    // newLikeP.textContent.replace(parseInt(numLikes), newLikes);
  });
  }