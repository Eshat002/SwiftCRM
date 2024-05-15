// Define global variables
let currentPage = 1;

// Function to load customers based on page number
async function loadCustomers(pageNumber) {
    try {
        const response = await fetch(`/customers/?page=${pageNumber}`);
        const data = await response.json();
        if (data.data == "Your customers appear here") {
            setTimeout(() => {
                document.querySelector(".customer-list-container .spinner-container").classList.add("d-none")
                const customerList = document.getElementById('customer-list');
                customerList.innerHTML = `<div><h5 class='text-center mt-5'>${data.data}</h5></div>`
            }, 100);

        }
        else {
            setTimeout(() => {
                document.querySelector(".customer-list-container .spinner-container").classList.add("d-none")
                displayCustomers(data.data);
            }, 100);

            console.log("nic", data.data)
            // Update current page number
            currentPage = pageNumber;

            // Enable/disable pagination buttons based on response metadata
            updatePaginationButtons(data.previous_page, data.next_page);
        }
        // Update customer list

    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

// Function to display customers on the frontend
function displayCustomers(customers) {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = ''; // Clear previous content

    customers.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add("row", "px-3")
        // customerDiv.classList.add("px-3")
        // // customerDiv.classList.add("text-end")
        customerDiv.innerHTML = `
            <div class='col-lg name'> <p>${customer.name}</p> </div>
            <div class='col-lg email'><p>${customer.email} </p> </div>
            <div class='col-lg phone'><p> ${customer.phone} </p></div>
            <div class='col-lg address'> <p>${customer.address} </p> </div>
            <div class='col-lg total_spent'><p> $${customer.total_spent} </p></div>
        `;
        customerList.appendChild(customerDiv);
    });
}

// Function to load the previous page
function loadPreviousPage() {
    document.querySelector(".customer-list-container .spinner-container").classList.remove("d-none")
    document.getElementById('customer-list').innerHTML = ''

    if (currentPage > 1) {
        setTimeout(() => {
            loadCustomers(currentPage - 1);
        }, 100);

    }
}

// Function to load the next page
function loadNextPage() {
    document.querySelector(".customer-list-container .spinner-container").classList.remove("d-none")
    document.getElementById('customer-list').innerHTML = ''

    setTimeout(() => {
        loadCustomers(currentPage + 1);
    }, 100);

}

// Function to update pagination buttons state
function updatePaginationButtons(hasPreviousPage, hasNextPage) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = !hasPreviousPage;
    nextBtn.disabled = !hasNextPage;
}

// Event listener for window.onload
window.onload = () => {
    // Bind event listeners to pagination buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', loadPreviousPage);
    nextBtn.addEventListener('click', loadNextPage);

    // Load the first page of customers
    loadCustomers(1);
};
