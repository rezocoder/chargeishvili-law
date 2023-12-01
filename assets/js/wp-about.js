const aboutContainer = document.getElementById("about-cont");

const getPageData = async (pageId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/pages/${pageId}`);
        const pageData = await response.json();
        return {
            title: pageData.title ? pageData.title.rendered : 'No Title',
            content: pageData.content ? pageData.content.rendered : 'No Content'
        };
    } catch (error) {
        console.error('Error fetching page data:', error);
        return { title: 'No Title', content: 'No Content' };
    }
};

const displayPageData = async () => {
    const pageId = 49;

    try {
        const { title, content } = await getPageData(pageId);
        aboutContainer.innerHTML = `
            <h2><em>${title}</em></h2>
                        <div class="styled-content">
                           <p>${content}</p>
                        </div>
        `;

    } catch (error) {
        console.error('Error displaying page data:', error);
    }
};

window.addEventListener("load", (event) => {
    displayPageData();
});
