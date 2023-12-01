const lawTypesContainer = document.getElementById("law-types");

const getLawTypes = async () => {
    try {
        const response = await fetch("https://pofuki.wordifysites.com/wp-json/wp/v2/law-types");
        const lawTypesData = await response.json();

        // Display law types
        for (const lawType of lawTypesData) {
            const title = lawType.title ? lawType.title.rendered : 'No Title';
            const content = lawType.content ? lawType.content.rendered : 'No Content';

            // Create a new element for each law type
            const lawTypeElement = document.createElement("div");
            lawTypeElement.classList.add('flex-col')
            lawTypeElement.innerHTML = `

                <h3>${title}</h3>
                <div class="content">
                <p>${content}</p>
                </div>

            `;

            // Append the law type element to the container
            lawTypesContainer.appendChild(lawTypeElement);
        }
    } catch (error) {
        console.error('Error fetching law types:', error);
    }
};

window.addEventListener("load", (event) => {
    getLawTypes();
});
