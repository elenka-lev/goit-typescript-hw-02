import axios from 'axios';

const fetchImages = async (query, page=1) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
            client_id: 'fPC6DPo197NQObxLX7yRDE94nR2mOGR2NEf1OkduwVk',
            query: query,
            page: page,
            per_page: 15,
        }
    });
        return response.data;
    }
    catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export default fetchImages;