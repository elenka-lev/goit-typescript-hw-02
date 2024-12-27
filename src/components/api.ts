import axios from 'axios';

type Image = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
};

type FetchImagesResponse = {
  results: Image[];
  total: number;
  total_pages: number;
};

const fetchImages = async (query:string, page : number=1) : Promise<FetchImagesResponse> => {
    try {
        const response = await axios.get<FetchImagesResponse>('https://api.unsplash.com/search/photos', {
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