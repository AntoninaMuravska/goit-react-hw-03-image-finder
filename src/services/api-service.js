import axios from 'axios';

const BASEURL = 'https://pixabay.com/api/';
const APIKEY = '19817387-6793f3100509fa593759a5ec0';

const fetchImage = ({ searchQuery, page }) => {
  return axios
    .get(
      `${BASEURL}?q=${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default fetchImage;
