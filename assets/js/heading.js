const url = "https://pofuki.wordifysites.com/wp-json/wp/v2/heading";
const heroTextElement = document.getElementById("heroText");

const fetchDataAndInsertText = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Extract the title from the JSON response
        const title = responseData[0].title.rendered;

        // Update your local element with the extracted title
        heroTextElement.innerHTML = title;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the fetchDataAndInsertText function when the window has loaded
window.addEventListener("load", fetchDataAndInsertText);
