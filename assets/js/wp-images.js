const heroImage = document.getElementById("heroImage");
const overlayImage = document.getElementById("overlay");

const updateImages = async () => {
    try {
        console.log('works')
        const response = await fetch("https://pofuki.wordifysites.com/wp-json/wp/v2/images");
        const imageData = await response.json();
        
        if (imageData.length >= 2) {
            const heroMediaId = imageData.find(image => image.slug === 'hero').featured_media;
            const overlayMediaId = imageData.find(image => image.slug === 'thumbnail').featured_media;

            if (heroMediaId && overlayMediaId) {
                const [heroMedia, overlayMedia] = await Promise.all([
                    fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/media/${heroMediaId}`),
                    fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/media/${overlayMediaId}`)
                ]);

                const [heroMediaData, overlayMediaData] = await Promise.all([
                    heroMedia.json(),
                    overlayMedia.json()
                ]);

                const heroImageUrl = heroMediaData.source_url;
                const overlayImageUrl = overlayMediaData.source_url;

                heroImage.src = heroImageUrl;
                heroImage.alt = "Hero Image";

                overlayImage.src = overlayImageUrl;
                overlayImage.alt = "Overlay Image"; 
            } else {
                console.warn('Media ID not found in the JSON response.');
            }
        } else {
            console.warn('Not enough images found in the JSON response.');
        }
    } catch (error) {
        console.error('Error updating images:', error);
    }
};

window.addEventListener("load", (event) => {
    updateImages();
});