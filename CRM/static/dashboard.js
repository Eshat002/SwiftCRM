const dashboardAnalyticsIncomeNumberContainer = document.getElementById("dashboard-analytics-section-income-number-container")

function ChartPlugIn() {

    const centerTextPlugin = {
        id: 'centerTextPlugin',
        beforeDraw: function (chart) {

            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const centerX = width / 2;
            const centerY = height / 1.8;  // Adjusted to center vertically as well
            const innerRadius = chart.options.cutout || 0;

            // Custom text to display (adjust as needed)
            // const text = 'ss';
            const text = chart.options.plugins.centerTextPlugin.text || '';

            // Styling for the centered text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '500 24px Roboto';
            ctx.fillStyle = 'white';

            // Draw the text in the center of the doughnut chart
            ctx.fillText(text, centerX, centerY);
        }
    };

    // Register the plugin
    Chart.register(centerTextPlugin);
}

ChartPlugIn()








// fetch('/monthly-target-order/')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         return response.json();
//     })
//     .then(data => {
//         console.log("data",)

//     })
//     .catch(error => {
//         console.error('Error fetching JSON:', error);
//     });


//Income section
const Income = () => {

    fetch('/income-view/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("dos", data)
            // grahp section
            const ctx = document.getElementById('dashboard-analytics-section-income-chart-canvas').getContext('2d');
            const barColors = [
                '#9A55FF',
                '#41A5FF',
                '#ED4D5C',

            ]

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.data.months_y_axis,
                    datasets: [{
                        label: "monthly income",
                        data: data.data.income_x_axis,
                        backgroundColor: barColors
                    }],
                },


                options: {
                    indexAxis: 'y', // <-- here
                    responsive: true,
                    showTextInsideDoughnut: true
                }
            });


            // number section
            const sign = data.data2.increased !== null ? (data.data2.increased ? `
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 7.50001C4.57495 7.50001 4.64648 7.47038 4.69923 7.41764C4.75197 7.36489 4.78161 7.29336 4.78161 7.21876V3.9602L5.98873 5.16789C6.01488 5.19404 6.04592 5.21478 6.08009 5.22893C6.11426 5.24309 6.15087 5.25037 6.18786 5.25037C6.22484 5.25037 6.26145 5.24309 6.29562 5.22893C6.32979 5.21478 6.36083 5.19404 6.38698 5.16789C6.41313 5.14174 6.43387 5.1107 6.44802 5.07653C6.46218 5.04236 6.46946 5.00575 6.46946 4.96876C6.46946 4.93178 6.46218 4.89516 6.44802 4.861C6.43387 4.82683 6.41313 4.79579 6.38698 4.76964L4.69948 3.08214C4.67335 3.05595 4.64232 3.03517 4.60815 3.02099C4.57398 3.00681 4.53735 2.99951 4.50036 2.99951C4.46336 2.99951 4.42673 3.00681 4.39256 3.02099C4.35839 3.03517 4.32736 3.05595 4.30123 3.08214L2.61373 4.76964C2.56092 4.82245 2.53125 4.89408 2.53125 4.96876C2.53125 5.04345 2.56092 5.11508 2.61373 5.16789C2.66654 5.2207 2.73817 5.25037 2.81286 5.25037C2.88754 5.25037 2.95917 5.2207 3.01198 5.16789L4.21911 3.9602V7.21876C4.21911 7.29336 4.24874 7.36489 4.30148 7.41764C4.35423 7.47038 4.42576 7.50001 4.50036 7.50001Z" fill="#62912C"/>
            </svg>` : `
          
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2529_12229)">
            <rect width="9" height="9" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 2.25C4.57495 2.25 4.64648 2.27963 4.69923 2.33238C4.75197 2.38512 4.78161 2.45666 4.78161 2.53125V5.78981L5.98873 4.58212C6.01488 4.55598 6.04592 4.53523 6.08009 4.52108C6.11426 4.50693 6.15087 4.49964 6.18786 4.49964C6.22484 4.49964 6.26145 4.50693 6.29562 4.52108C6.32979 4.53523 6.36083 4.55598 6.38698 4.58212C6.41313 4.60827 6.43387 4.63932 6.44802 4.67348C6.46218 4.70765 6.46946 4.74427 6.46946 4.78125C6.46946 4.81823 6.46218 4.85485 6.44802 4.88902C6.43387 4.92318 6.41313 4.95423 6.38698 4.98038L4.69948 6.66788C4.67335 6.69407 4.64232 6.71485 4.60815 6.72903C4.57398 6.7432 4.53735 6.7505 4.50036 6.7505C4.46336 6.7505 4.42673 6.7432 4.39256 6.72903C4.35839 6.71485 4.32736 6.69407 4.30123 6.66788L2.61373 4.98038C2.58758 4.95423 2.56684 4.92318 2.55269 4.88902C2.53853 4.85485 2.53125 4.81823 2.53125 4.78125C2.53125 4.74427 2.53853 4.70765 2.55269 4.67348C2.56684 4.63932 2.58758 4.60827 2.61373 4.58212C2.66654 4.52931 2.73817 4.49964 2.81286 4.49964C2.84984 4.49964 2.88646 4.50693 2.92062 4.52108C2.95479 4.53523 2.98583 4.55598 3.01198 4.58212L4.21911 5.78981V2.53125C4.21911 2.45666 4.24874 2.38512 4.30148 2.33238C4.35423 2.27963 4.42576 2.25 4.50036 2.25V2.25Z" fill="#ED4D5C"/>
            </g>      
            </svg>
           `
            ) : "";

            const bgColor = data.data2.increased !== null ? (data.data2.increased ? `#E1F4CB` : `#FFE3E6`
            ) : "lightgrey";

            const color = data.data2.increased !== null ? (data.data2.increased ? `#62912C` : `#ED4D5C`
            ) : "black";


            dashboardAnalyticsIncomeNumberContainer.innerHTML = `
        <div>
            <div style="border-bottom: 1px solid #D9D9D9">
                <h4>Monthly Income</h4>
                <div class='d-flex justify-content-between'>
                <h3>$${data.data2.sales_current_month}</h3>            
                    <div> 
                    <h2 style='background-color:${bgColor}; color:${color}'> <span class=''>${sign}</span> ${data.data2.sales_change_in_percentage}% </h2>
                    </div>
                </div>
                <p>Compared to the previous month</p>
            </div>
    
            <div class='d-flex mt-4'>
                <div class='icon-container me-2'>
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.375" y="0.375" width="27.75" height="27.75" rx="13.875" fill="#9A55FF"/>
                <rect x="0.375" y="0.375" width="27.75" height="27.75" rx="13.875" stroke="#9A55FF" stroke-width="0.75"/>
                <g clip-path="url(#clip0_51_24884)">
                <rect width="12" height="12" transform="translate(8.25 8.25)" fill="white" fill-opacity="0.01"/>
                <g clip-path="url(#clip1_51_24884)">
                <path d="M18.75 18.75V11.625L15.375 8.25H11.25C10.8522 8.25 10.4706 8.40804 10.1893 8.68934C9.90804 8.97064 9.75 9.35218 9.75 9.75V18.75C9.75 19.1478 9.90804 19.5294 10.1893 19.8107C10.4706 20.092 10.8522 20.25 11.25 20.25H17.25C17.6478 20.25 18.0294 20.092 18.3107 19.8107C18.592 19.5294 18.75 19.1478 18.75 18.75ZM15.375 10.5C15.375 10.7984 15.4935 11.0845 15.7045 11.2955C15.9155 11.5065 16.2016 11.625 16.5 11.625H18V15H10.5V9.75C10.5 9.55109 10.579 9.36032 10.7197 9.21967C10.8603 9.07902 11.0511 9 11.25 9H15.375V10.5ZM10.5 17.25V15.75H12V17.25H10.5ZM10.5 18H12V19.5H11.25C11.0511 19.5 10.8603 19.421 10.7197 19.2803C10.579 19.1397 10.5 18.9489 10.5 18.75V18ZM12.75 19.5V18H15V19.5H12.75ZM15.75 19.5V18H18V18.75C18 18.9489 17.921 19.1397 17.7803 19.2803C17.6397 19.421 17.4489 19.5 17.25 19.5H15.75ZM18 17.25H15.75V15.75H18V17.25ZM12.75 17.25V15.75H15V17.25H12.75Z" fill="white"/>
                </g>
                </g>              
                </svg>
                </div>
                <div>
                <h5>Accounting </h3>
                  <p class='current-month'> Current month :${data.data2.current_month_name} </p> 
                </div>
            </div>
        </div>
    `;



        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });


}

Income()


// Target section
const monthlyTargetOrder = () => {
    fetch('/monthly-target-order/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("data", data)
            const ctx = document.getElementById('dashboard-analytics-section-target-chart-canvas').getContext('2d');
            const barColors = [
                '#FFFFFF',
                '#DDC6FF',

            ]


            const chart = new Chart(ctx, {
                type: 'doughnut',
                data: {

                    datasets: [{
                        // label: 'My First Dataset',
                        data: [data.data.orders_current_month, data.data.monthly_target_orders],
                        backgroundColor: barColors,
                        hoverOffset: 4,
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: 40,
                    responsive: true,
                    plugins: {
                        centerTextPlugin: {
                            text: `${data.data.target_gained}%`
                        }
                    }



                }

            });




            // const dashboardAnalyticsTargetPercentageContainer = document.getElementById('dashboard-analytics-section-target-percentage-container')
            // dashboardAnalyticsTargetPercentageContainer.innerHTML = `<div><p>${data.data.target_gained}%</p></div>`

            const dashboardAnalyticsTargetNumbersContainer = document.getElementById('dashboard-analytics-section-target-numbers-container')
            dashboardAnalyticsTargetNumbersContainer.innerHTML = `<div>
            <h3>${data.data.orders_current_month} / ${data.data.monthly_target_orders}</h3>
            <p class='dashboard-analytics-section-target-order-text'>Target Orders</p>
            </div>`

        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

monthlyTargetOrder()


const profit = () => {
    const dashboardAnalyticsProfitDigitContainer = document.getElementById("dashboard-analytics-section-profit-digit-container")
    const ctx = document.getElementById("dashboard-analytics-section-profit-chart-canvas")
    const barColors = [
        '#9A55FF',
        '#41A5FF',

    ]



    fetch('/profit/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("data", data)

            const sign = data.data.increased !== null ? (data.data.increased ? `
            
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 7.00001C4.57495 7.00001 4.64648 6.97038 4.69923 6.91764C4.75197 6.86489 4.78161 6.79336 4.78161 6.71876V3.4602L5.98873 4.66789C6.01488 4.69404 6.04592 4.71478 6.08009 4.72893C6.11426 4.74309 6.15087 4.75037 6.18786 4.75037C6.22484 4.75037 6.26145 4.74309 6.29562 4.72893C6.32979 4.71478 6.36083 4.69404 6.38698 4.66789C6.41313 4.64174 6.43387 4.6107 6.44802 4.57653C6.46218 4.54236 6.46946 4.50575 6.46946 4.46876C6.46946 4.43178 6.46218 4.39516 6.44802 4.361C6.43387 4.32683 6.41313 4.29579 6.38698 4.26964L4.69948 2.58214C4.67335 2.55595 4.64232 2.53517 4.60815 2.52099C4.57398 2.50681 4.53735 2.49951 4.50036 2.49951C4.46336 2.49951 4.42673 2.50681 4.39256 2.52099C4.35839 2.53517 4.32736 2.55595 4.30123 2.58214L2.61373 4.26964C2.56092 4.32245 2.53125 4.39408 2.53125 4.46876C2.53125 4.54345 2.56092 4.61508 2.61373 4.66789C2.66654 4.7207 2.73817 4.75037 2.81286 4.75037C2.88754 4.75037 2.95917 4.7207 3.01198 4.66789L4.21911 3.4602V6.71876C4.21911 6.79336 4.24874 6.86489 4.30148 6.91764C4.35423 6.97038 4.42576 7.00001 4.50036 7.00001Z" fill="#41A5FF"/>
            </svg>
            ` : `
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2529_12229)">
            <rect width="9" height="9" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 2.25C4.57495 2.25 4.64648 2.27963 4.69923 2.33238C4.75197 2.38512 4.78161 2.45666 4.78161 2.53125V5.78981L5.98873 4.58212C6.01488 4.55598 6.04592 4.53523 6.08009 4.52108C6.11426 4.50693 6.15087 4.49964 6.18786 4.49964C6.22484 4.49964 6.26145 4.50693 6.29562 4.52108C6.32979 4.53523 6.36083 4.55598 6.38698 4.58212C6.41313 4.60827 6.43387 4.63932 6.44802 4.67348C6.46218 4.70765 6.46946 4.74427 6.46946 4.78125C6.46946 4.81823 6.46218 4.85485 6.44802 4.88902C6.43387 4.92318 6.41313 4.95423 6.38698 4.98038L4.69948 6.66788C4.67335 6.69407 4.64232 6.71485 4.60815 6.72903C4.57398 6.7432 4.53735 6.7505 4.50036 6.7505C4.46336 6.7505 4.42673 6.7432 4.39256 6.72903C4.35839 6.71485 4.32736 6.69407 4.30123 6.66788L2.61373 4.98038C2.58758 4.95423 2.56684 4.92318 2.55269 4.88902C2.53853 4.85485 2.53125 4.81823 2.53125 4.78125C2.53125 4.74427 2.53853 4.70765 2.55269 4.67348C2.56684 4.63932 2.58758 4.60827 2.61373 4.58212C2.66654 4.52931 2.73817 4.49964 2.81286 4.49964C2.84984 4.49964 2.88646 4.50693 2.92062 4.52108C2.95479 4.53523 2.98583 4.55598 3.01198 4.58212L4.21911 5.78981V2.53125C4.21911 2.45666 4.24874 2.38512 4.30148 2.33238C4.35423 2.27963 4.42576 2.25 4.50036 2.25V2.25Z" fill="#ED4D5C"/>
            </g>      
            </svg>
           `
            ) : "";

            const bgColor = data.data.increased !== null ? (data.data.increased ? `#DBEEFF` : `#FFE3E6`
            ) : "lightgrey";

            const color = data.data.increased !== null ? (data.data.increased ? `#41A5FF` : `#ED4D5C`
            ) : "black";


            dashboardAnalyticsProfitDigitContainer.innerHTML = `<div class="d-flex justify-content-between">
            <div class='profit-current-month'>   $${data.data.profit}   </div>
            <div style='background-color:${bgColor}; color:${color}' class='profit-change'><span>${sign}</span> ${data.data.profit_percentage}%</div>
            </div>`


            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.data.months_x_axis,
                    datasets: [{
                        label: "",
                        data: data.data.profit_y_axis,
                        backgroundColor: barColors
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });


        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

profit()


const expense = () => {
    const dashboardAnalyticsExpenseDigitContainer = document.getElementById("dashboard-analytics-section-expense-digit-container")
    const ctx = document.getElementById("dashboard-analytics-section-expense-chart-canvas")
    const barColors = [
        '#9A55FF',
        '#41A5FF',

    ]



    fetch('/expense/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("data", data)

            const sign = data.data.increased !== null ? (data.data.increased ? `
            
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 7.00001C4.57495 7.00001 4.64648 6.97038 4.69923 6.91764C4.75197 6.86489 4.78161 6.79336 4.78161 6.71876V3.4602L5.98873 4.66789C6.01488 4.69404 6.04592 4.71478 6.08009 4.72893C6.11426 4.74309 6.15087 4.75037 6.18786 4.75037C6.22484 4.75037 6.26145 4.74309 6.29562 4.72893C6.32979 4.71478 6.36083 4.69404 6.38698 4.66789C6.41313 4.64174 6.43387 4.6107 6.44802 4.57653C6.46218 4.54236 6.46946 4.50575 6.46946 4.46876C6.46946 4.43178 6.46218 4.39516 6.44802 4.361C6.43387 4.32683 6.41313 4.29579 6.38698 4.26964L4.69948 2.58214C4.67335 2.55595 4.64232 2.53517 4.60815 2.52099C4.57398 2.50681 4.53735 2.49951 4.50036 2.49951C4.46336 2.49951 4.42673 2.50681 4.39256 2.52099C4.35839 2.53517 4.32736 2.55595 4.30123 2.58214L2.61373 4.26964C2.56092 4.32245 2.53125 4.39408 2.53125 4.46876C2.53125 4.54345 2.56092 4.61508 2.61373 4.66789C2.66654 4.7207 2.73817 4.75037 2.81286 4.75037C2.88754 4.75037 2.95917 4.7207 3.01198 4.66789L4.21911 3.4602V6.71876C4.21911 6.79336 4.24874 6.86489 4.30148 6.91764C4.35423 6.97038 4.42576 7.00001 4.50036 7.00001Z" fill="#41A5FF"/>
            </svg>
            ` : `
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2529_12229)">
            <rect width="9" height="9" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 2.25C4.57495 2.25 4.64648 2.27963 4.69923 2.33238C4.75197 2.38512 4.78161 2.45666 4.78161 2.53125V5.78981L5.98873 4.58212C6.01488 4.55598 6.04592 4.53523 6.08009 4.52108C6.11426 4.50693 6.15087 4.49964 6.18786 4.49964C6.22484 4.49964 6.26145 4.50693 6.29562 4.52108C6.32979 4.53523 6.36083 4.55598 6.38698 4.58212C6.41313 4.60827 6.43387 4.63932 6.44802 4.67348C6.46218 4.70765 6.46946 4.74427 6.46946 4.78125C6.46946 4.81823 6.46218 4.85485 6.44802 4.88902C6.43387 4.92318 6.41313 4.95423 6.38698 4.98038L4.69948 6.66788C4.67335 6.69407 4.64232 6.71485 4.60815 6.72903C4.57398 6.7432 4.53735 6.7505 4.50036 6.7505C4.46336 6.7505 4.42673 6.7432 4.39256 6.72903C4.35839 6.71485 4.32736 6.69407 4.30123 6.66788L2.61373 4.98038C2.58758 4.95423 2.56684 4.92318 2.55269 4.88902C2.53853 4.85485 2.53125 4.81823 2.53125 4.78125C2.53125 4.74427 2.53853 4.70765 2.55269 4.67348C2.56684 4.63932 2.58758 4.60827 2.61373 4.58212C2.66654 4.52931 2.73817 4.49964 2.81286 4.49964C2.84984 4.49964 2.88646 4.50693 2.92062 4.52108C2.95479 4.53523 2.98583 4.55598 3.01198 4.58212L4.21911 5.78981V2.53125C4.21911 2.45666 4.24874 2.38512 4.30148 2.33238C4.35423 2.27963 4.42576 2.25 4.50036 2.25V2.25Z" fill="#ED4D5C"/>
            </g>      
            </svg>
           `
            ) : "";

            const bgColor = data.data.increased !== null ? (data.data.increased ? `#DBEEFF` : `#FFE3E6`
            ) : "lightgrey";

            const color = data.data.increased !== null ? (data.data.increased ? `#41A5FF` : `#ED4D5C`
            ) : "black";


            dashboardAnalyticsExpenseDigitContainer.innerHTML = `<div class="d-flex justify-content-between">
            <div class='expense-current-month'>   $${data.data.expense}   </div>
            <div style='background-color:${bgColor}; color:${color}' class='expense-change'><span>${sign}</span> ${data.data.expense_percentage}%</div>
            </div>`


            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.data.months_x_axis,
                    datasets: [{
                        label: "",
                        data: data.data.expense_y_axis,
                        backgroundColor: barColors
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });


        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

expense()



const CustomerAnalytics = () => {
    const dashboardAnalyticsCustomerDigitContainer = document.getElementById("dashboard-analytics-section-customer-digit-container")
    const ctx = document.getElementById("dashboard-analytics-section-customer-chart-canvas")
    const barColors = [
        '#9A55FF',
        '#41A5FF',

    ]



    fetch('/customer-analytics/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("data", data)

            const sign = data.data.increased !== null ? (data.data.increased ? `
            
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 7.00001C4.57495 7.00001 4.64648 6.97038 4.69923 6.91764C4.75197 6.86489 4.78161 6.79336 4.78161 6.71876V3.4602L5.98873 4.66789C6.01488 4.69404 6.04592 4.71478 6.08009 4.72893C6.11426 4.74309 6.15087 4.75037 6.18786 4.75037C6.22484 4.75037 6.26145 4.74309 6.29562 4.72893C6.32979 4.71478 6.36083 4.69404 6.38698 4.66789C6.41313 4.64174 6.43387 4.6107 6.44802 4.57653C6.46218 4.54236 6.46946 4.50575 6.46946 4.46876C6.46946 4.43178 6.46218 4.39516 6.44802 4.361C6.43387 4.32683 6.41313 4.29579 6.38698 4.26964L4.69948 2.58214C4.67335 2.55595 4.64232 2.53517 4.60815 2.52099C4.57398 2.50681 4.53735 2.49951 4.50036 2.49951C4.46336 2.49951 4.42673 2.50681 4.39256 2.52099C4.35839 2.53517 4.32736 2.55595 4.30123 2.58214L2.61373 4.26964C2.56092 4.32245 2.53125 4.39408 2.53125 4.46876C2.53125 4.54345 2.56092 4.61508 2.61373 4.66789C2.66654 4.7207 2.73817 4.75037 2.81286 4.75037C2.88754 4.75037 2.95917 4.7207 3.01198 4.66789L4.21911 3.4602V6.71876C4.21911 6.79336 4.24874 6.86489 4.30148 6.91764C4.35423 6.97038 4.42576 7.00001 4.50036 7.00001Z" fill="#41A5FF"/>
            </svg>
            ` : `
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2529_12229)">
            <rect width="9" height="9" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50036 2.25C4.57495 2.25 4.64648 2.27963 4.69923 2.33238C4.75197 2.38512 4.78161 2.45666 4.78161 2.53125V5.78981L5.98873 4.58212C6.01488 4.55598 6.04592 4.53523 6.08009 4.52108C6.11426 4.50693 6.15087 4.49964 6.18786 4.49964C6.22484 4.49964 6.26145 4.50693 6.29562 4.52108C6.32979 4.53523 6.36083 4.55598 6.38698 4.58212C6.41313 4.60827 6.43387 4.63932 6.44802 4.67348C6.46218 4.70765 6.46946 4.74427 6.46946 4.78125C6.46946 4.81823 6.46218 4.85485 6.44802 4.88902C6.43387 4.92318 6.41313 4.95423 6.38698 4.98038L4.69948 6.66788C4.67335 6.69407 4.64232 6.71485 4.60815 6.72903C4.57398 6.7432 4.53735 6.7505 4.50036 6.7505C4.46336 6.7505 4.42673 6.7432 4.39256 6.72903C4.35839 6.71485 4.32736 6.69407 4.30123 6.66788L2.61373 4.98038C2.58758 4.95423 2.56684 4.92318 2.55269 4.88902C2.53853 4.85485 2.53125 4.81823 2.53125 4.78125C2.53125 4.74427 2.53853 4.70765 2.55269 4.67348C2.56684 4.63932 2.58758 4.60827 2.61373 4.58212C2.66654 4.52931 2.73817 4.49964 2.81286 4.49964C2.84984 4.49964 2.88646 4.50693 2.92062 4.52108C2.95479 4.53523 2.98583 4.55598 3.01198 4.58212L4.21911 5.78981V2.53125C4.21911 2.45666 4.24874 2.38512 4.30148 2.33238C4.35423 2.27963 4.42576 2.25 4.50036 2.25V2.25Z" fill="#ED4D5C"/>
            </g>      
            </svg>
           `
            ) : "";

            const bgColor = data.data.increased !== null ? (data.data.increased ? `#DBEEFF` : `#FFE3E6`
            ) : "lightgrey";

            const color = data.data.increased !== null ? (data.data.increased ? `#41A5FF` : `#ED4D5C`
            ) : "black";


            dashboardAnalyticsCustomerDigitContainer.innerHTML = `<div class="d-flex justify-content-between">
            <div class='customer-current-month'>  ${data.data.customer_current_month} </div>
            <div style='background-color:${bgColor}; color:${color}' class='customer-change'><span>${sign}</span> ${data.data.customer_percentage}%</div>
            </div>`


            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.data.months_x_axis,
                    datasets: [{
                        label: "",
                        data: data.data.customer_y_axis,
                        backgroundColor: barColors
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });


        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

CustomerAnalytics()

