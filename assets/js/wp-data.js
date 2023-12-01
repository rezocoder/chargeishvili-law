const teamMembersContainer = document.getElementById("teamMembers");

const getMediaDetails = async (mediaId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/media/${mediaId}`);
        const mediaData = await response.json();
        return mediaData.source_url;
    } catch (error) {
        console.error('Error fetching media details:', error);
        return null;
    }
};

const getTeamMembers = async () => {
    try {
        const response = await fetch("https://pofuki.wordifysites.com/wp-json/wp/v2/team-members");
        const teamMembersData = await response.json();

        for (const teamMember of teamMembersData) {
            const mediaId = teamMember.featured_media;
            const imageSource = await getMediaDetails(mediaId);

            const title = teamMember.title ? teamMember.title.rendered : 'No Title';
            const termId = teamMember['member-position'][0];
            const position = await getPositionDetails(termId);

            const teamMemberElement = document.createElement("li");
            teamMemberElement.classList.add("single-team-item");
            teamMemberElement.innerHTML = `

                <a href="team_detail.html">
                <div class="col col-image">
                    <div class="image">
                        <img class="overlay thumbnail lazy" src=${imageSource} width="810" height="1080" alt=${title}>
                        <div class="overlay image-dark"></div>
                    </div>
                </div>
                <div class="col col-content">
                    <h3><span>${title}</span></h3>
                    <p class="small">${position}</p>
                    <div class="arrow small border">
                        <div class="arrow-fill"></div>
                        <div class="arrow-fill-hover"></div>
                        <div class="arrow-content">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <polyline points="18 8 18 18 8 18" fill="none" stroke="#000" stroke-miterlimit="10"/>
                            <line x1="18" y1="18" x2="5" y2="5" fill="none" stroke="#000" stroke-miterlimit="10"/>
                            </svg>
                        </div>
                    </div>
                </div>
                </a>
            `;

            teamMembersContainer.appendChild(teamMemberElement);
        }
    } catch (error) {
        console.error('Error fetching team members:', error);
    }
};

const getPositionDetails = async (termId) => {
    try {
        const response = await fetch(`https://pofuki.wordifysites.com/wp-json/wp/v2/member-position/${termId}`);
        const positionData = await response.json();
        return positionData.name; // Assuming the term name is in the 'name' field
    } catch (error) {
        console.error('Error fetching position details:', error);
        return 'No Position';
    }
};


window.addEventListener("load", (event) => {
    getTeamMembers();
});
