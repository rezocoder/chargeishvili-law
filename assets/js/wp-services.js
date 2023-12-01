const servicesContainer = document.getElementById("services");

const getServiceDetails = async (serviceId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/services/${serviceId}`, {
            credentials: 'include', // Include credentials in the request
            headers: {
                'Authorization': 'Basic ' + btoa('wordify:osnimftt') // Encode username:password for HTTP basic authentication
            }
        });

        const serviceData = await response.json();
        return serviceData.title.rendered;
    } catch (error) {
        console.error('Error fetching service details:', error);
        return null;
    }
};

const getServicesByServiceType = async () => {
    try {
        const response = await fetch("https://pofuki.wordifysites.com/wp-json/wp/v2/services", {
            credentials: 'include', // Include credentials in the request
            headers: {
                'Authorization': 'Basic ' + btoa('wordify:osnimftt') // Encode username:password for HTTP basic authentication
            }
        });

        const servicesData = await response.json();

        const servicesByType = {};
        for (const service of servicesData) {
            const serviceId = service.id;
            const serviceName = await getServiceDetails(serviceId);

            const title = service.title ? service.title.rendered : 'No Title';
            const termId = service['service-type'][0];
            const serviceType = await getServiceTypeDetails(termId);

            if (!servicesByType[serviceType]) {
                servicesByType[serviceType] = [];
            }

            servicesByType[serviceType].push(title);
        }

        for (const [serviceType, serviceTitles] of Object.entries(servicesByType)) {
            const serviceTypeElement = document.createElement("div");
            serviceTypeElement.classList.add("flex-col");
            serviceTypeElement.classList.add('specialisms-list')
            serviceTypeElement.innerHTML = `
                <div class="title">
                    <h3>${serviceType}</h3>
                </div>
                <ul>
                    ${serviceTitles.map(title => `
                        <li>
                            <a href="service-detail.html" class="single-specialism">
                                <span>${title}</span>
                                <div class="btn btn-arrow">
                                    <div class="arrow small border first">
                                        <div class="arrow-fill"></div>
                                        <div class="arrow-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <polyline points="18 8 18 18 8 18" fill="none" stroke="#000" stroke-miterlimit="10"/>
                                                <line x1="18" y1="18" x2="5" y2="5" fill="none" stroke="#000" stroke-miterlimit="10"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="arrow small border second">
                                        <div class="arrow-fill"></div>
                                        <div class="arrow-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <polyline points="18 8 18 18 8 18" fill="none" stroke="#000" stroke-miterlimit="10"/>
                                                <line x1="18" y1="18" x2="5" y2="5" fill="none" stroke="#000" stroke-miterlimit="10"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;

            servicesContainer.appendChild(serviceTypeElement);
        }
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

const getServiceTypeDetails = async (termId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/service-type/${termId}`, {
            credentials: 'include', // Include credentials in the request
            headers: {
                'Authorization': 'Basic ' + btoa('wordify:osnimftt') // Encode username:password for HTTP basic authentication
            }
        });

        const serviceTypeData = await response.json();
        return serviceTypeData.name;
    } catch (error) {
        console.error('Error fetching service type details:', error);
        return 'No Service Type';
    }
};

window.addEventListener("load", (event) => {
    getServicesByServiceType();
});
