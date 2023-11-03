const axios = require('axios');

// Define the NHentai API URL
const API_ROOT_URL = 'https://nhentai.net';
const API_URL = 'https://nhentai.net/api';
const IMAGE_URL = 'https://i.nhentai.net';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76'; // Replace with your User Agent
const COOKIES = {
    "cf_clearance":"PqmuRdbdEyBSgRCA2NKUCO.b6V.TJxQOMXnPhD_a29c-1698918671-0-1-4afeafd0.6547d2f0.1dfff030-160.0.0",
    "csrftoken":"SLdZmNotkiGbNyL7JY4B5r5Bmxnyai2GKejytvsUXc23QJXeVyoQp8YBEpBKf6yN"
};

// Function to get a doujin by ID
async function getDoujin(id) {
    try {
        const headers = {
            'User-Agent': USER_AGENT,
        };

        if (COOKIES) {
            headers.Cookie = Object.entries(COOKIES)
                .map(([key, value]) => `${key}=${value}`)
                .join('; ');
        }

        const response = await axios.get(`${API_ROOT_URL}/api/gallery/${id}`, {
            headers,
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected code: ${response.status}`);
        }


        const doujinData = response.data;
        const mediaId = doujinData.media_id;
        const pages = doujinData.images.pages;

        // Construct page URLs with appropriate file extensions
        const pageURLs = pages.map((page, index) => {
            let fileExtension;
            if (page.t === 'j') {
                fileExtension = '.jpg';
            } else if (page.t === 'p') {
                fileExtension = '.png';
            } else if (page.t === 'g') {
                fileExtension = '.gif';
            } else {
                fileExtension = '.jpg'; // Default to .jpg for unknown types
            }

            const imageURL = `https://i.nhentai.net/galleries/${mediaId}/${index + 1}${fileExtension}`;
            return imageURL;
        });

        console.log(response.data);
        console.log({
            id: doujinData.id,
            title: doujinData.title,
            pages: pageURLs
        });
        return {
            id: doujinData.id,
            title: doujinData.title,
            pages: pageURLs,
        };
    } catch (error) {
        console.error(error);
    }
}

module.exports = getDoujin;



