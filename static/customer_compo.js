// Define global variables
let currentPage = 1;

// Function to load customers based on page number
async function loadCustomers(pageNumber) {
    try {
        const response = await fetch(`/customers/?page=${pageNumber}`);
        const data = await response.json();

        // Update customer list
        displayCustomers(data.data);

        // Update current page number
        currentPage = pageNumber;

        // Enable/disable pagination buttons based on response metadata
        updatePaginationButtons(data.previous_page, data.next_page);
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
        customerDiv.innerHTML = `
            <p>Name: ${customer.name}</p>
            <p>Email: ${customer.email}</p>
            <p>Total Spent: ${customer.total_spent}</p>
        `;
        customerList.appendChild(customerDiv);
    });
}

// Function to load the previous page
function loadPreviousPage() {
    if (currentPage > 1) {
        loadCustomers(currentPage - 1);
    }
}

// Function to load the next page
function loadNextPage() {
    loadCustomers(currentPage + 1);
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
