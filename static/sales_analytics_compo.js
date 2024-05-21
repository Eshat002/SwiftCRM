const salesAnalytics = () => {
    const ctx = document.getElementById("sales-analytics-canvas")

    fetch('/analytics/sales-analytics/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log("sales", data)

            const sign = data.increased !== null ? (data.increased ? `
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

            const bgColor = data.increased !== null ? (data.increased ? `#DBEEFF` : `#FFE3E6`
            ) : "lightgrey";

            const color = data.increased !== null ? (data.increased ? `#41A5FF` : `#ED4D5C`
            ) : "black";

            const salesAnalyticsCompoDigitContainer = document.getElementById("sales-analytics-compo-digit-container")
            salesAnalyticsCompoDigitContainer.innerHTML = `
            <div>
            <h2 class='sales-analytics-title'>Overall Sales</h2>
            <h1 class='sales-analytics-subtitle'>$${data.last_7_days_sales}</h1>
            </div>
            <div style='background-color:${bgColor}; color:${color}' class='sales-change'><span>${sign}</span> ${data.comparison_result}%</div>
            </div>`


            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.last_7_days_date_names,
                    datasets: [{
                        label: "Last 7 days",
                        data: data.last_7_days_daily_sales,
                        borderColor: "#9A55FF",
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBackgroundColor: '#9A55FF'

                    },
                    ],

                },
                options: {
                    plugins: {
                        legend: {
                            position: "top",
                            align: "end",
                            labels: {
                                usePointStyle: true,

                            },

                        },
                    },

                }

            });


        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

salesAnalytics()


