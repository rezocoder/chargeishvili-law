const heroContainer = document.getElementById("hero-cont");

const getPageDataWithFeaturedImage = async (pageId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/pages/${pageId}`);
        const pageData = await response.json();

        const title = pageData.title ? pageData.title.rendered : 'No Title';
        const content = pageData.content ? pageData.content.rendered : 'No Content';

        let featuredImageUrl = '';
        if (pageData.featured_media) {
            const featuredMediaResponse = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/media/${pageData.featured_media}`);
            const featuredMediaData = await featuredMediaResponse.json();
            featuredImageUrl = featuredMediaData.source_url;
        }

        return { title, content, featuredImageUrl };
    } catch (error) {
        console.error('Error fetching page data with featured image:', error);
        return { title: 'No Title', content: 'No Content', featuredImageUrl: '' };
    }
};

const displayAnotherPageData = async () => {
    const pageId = 52;

    try {
        const { title, content, featuredImageUrl } = await getPageDataWithFeaturedImage(pageId);

        heroContainer.innerHTML = `
            <h2><em>${title}</em></h2>
            <div class="styled-content">
                <p>${content}</p>
            </div>
            <img src="${featuredImageUrl}" alt="Featured Image">
        `;
    } catch (error) {
        console.error('Error displaying page data with featured image:', error);
    }
};

window.addEventListener("load", (event) => {
    displayAnotherPageData();
});
