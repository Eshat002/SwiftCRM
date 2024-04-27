const headlineContainer = document.querySelector('.base-headline-section .headline-container');


fetch('/get-headline-user/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        headlineContainer.innerHTML = `<div class='row'>
        <div class='col-lg-2 image-container rounded-circle'>
         <img class='base-headline-avatar img-fluid rounded-circle' src=${data.avatar} alt="avatar">
        </div>
        <div class='col-lg-10 text-container mt-2'>  
        <h3 class='base-headline-name'>Welcome Back, <span class='base-headline-span'>${data.displayed_name}</span></h3>
        <p class='base-headline-update-text'>Here are your monthly store updates.</p>
        
        </div>
        
        </div>`

    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

