console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];
  
    // Fetch and display dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const imageContainer = document.getElementById('dog-image-container');
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          imageContainer.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  
    // Fetch and store dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        allBreeds = Object.keys(data.message);
        displayBreeds(allBreeds);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  
    // Display breeds in the DOM
    function displayBreeds(breeds) {
      const breedList = document.getElementById('dog-breeds');
      breedList.innerHTML = ''; // Clear existing list
      breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        breedList.appendChild(li);
  
        // Add event listener to change font color on click
        li.addEventListener('click', () => {
          li.style.color = 'blue'; // Change 'blue' to your desired color
        });
      });
    }
  
    // Filter breeds based on selected letter
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      if (selectedLetter === 'all') {
        displayBreeds(allBreeds);
      } else {
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
      }
    });
  });
  