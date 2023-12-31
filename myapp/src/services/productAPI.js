import axios from 'axios';

const fetchProducts = async () => {
    const apiKey = '40641305-9b300c9ffa65fbd214b30c198';
    const url = 'https://pixabay.com/api/';

    try {
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                q: "sweet cake",
                image_type: "photo",
                per_page: 25
            }
        });
        return response.data.hits;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};

export { fetchProducts };
