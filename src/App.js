import './App.css';
import { useState, useEffect, useCallback } from 'react';
import Grids from './Grids';

import _ from 'lodash';
import { GiphyFetch } from '@giphy/js-fetch-api'
import ScrollToTop from "react-scroll-to-top";
import { FaTwitter, FaGithub } from 'react-icons/fa';



function App() {
  const [gifs, setGifs] = useState(null);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState({ 1: false, 2: false });

  // api key for giphy
  const apiKey = 'hJ5Pu0OaDQdjd5fR1f5h30DEyrrVAy45';

  // writing style for search bar in tailwind
  const searchStyle = `p-2 m-2 w-auto sm:w-full md:w-1/3 xl:w-1/3 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`;

  // debounce function for search bar input to prevent too many requests
  const debounce = useCallback(_.debounce(async (search) => {
    const giphy = new GiphyFetch(apiKey);
    const response = await giphy.search(search, { limit: 25 });
    setGifs(response.data);
    setOffset(0);
    setIsLoading({ 1: false, 2: false });
    response.data.length < 25 ? setIsLoadMore(false) : setIsLoadMore(true);
  }, 500), []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    debounce(value);
    setIsLoading({ 1: true, 2: false });


  }

  const loadMore = async () => {
    const giphy = new GiphyFetch(apiKey);
    setIsLoading({ 1: false, 2: true });

    const response = await giphy.search(search, { offset: offset + 25 });
    setGifs([...gifs, ...response.data]);
    setOffset(offset + 25);
    setIsLoading({ 1: false, 2: false });
    response.data.length < 25 ? setIsLoadMore(false) : setIsLoadMore(true);
  }

  const LoadingButton = () => {
    return (
      <button type="button" className="inline-flex items-center px-4 py-2  font-semibold leading-6 text-sm shadow rounded-md text-white bg-white-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </button>
    )
  }


  useEffect(() => {
    if (search) {
      const giphy = new GiphyFetch(apiKey);
      giphy.search(search, { limit: 25 }).then(response => {
        setGifs(response.data);
      });
    }


  }, []);

  return (
    <div className="App">
      <div className='flex flex-col items-center justify-between  h-full ' >
        <ScrollToTop smooth color="#fffff" />
        {/* github and twitter logo */}
        <div className='flex justify-center items-center self-end  m-2 p-2'>
          <a className='m-2 p-2' href="https://twitter.com/boneyupadhyay" target="_blank">
            <FaTwitter className='text-3xl text-cyan-500' />
          </a>
          <a className='m-2 p-2' href="https://github.com/boneyrox" target="_blank">
            <FaGithub className='text-3xl text-gray-800' />
          </a>

        </div>
        <div className='m-auto w-full' > <h1 className='text-5xl font-bold p-2 m-2 text-white font-semiBold' >🐱‍👤 gifSearch</h1>
          <input className={searchStyle}


            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Search Eg: ' cat '" />
        </div>
        {/* showing loader */}
        {isLoading[1] && <LoadingButton />}


        {/* showing grids for result */}
        {
          gifs ? <Grids gifs={gifs} /> : null


        }
        {isLoading[2] && <LoadingButton />}
        {/* load more button */}
        {isLoadMore && <button onClick={loadMore} className='p-2 m-2 w-1/4 border border-2  font-bold text-white  rounded-lg text-sm  hover:bg-gray-900' >Load More</button>}
        {/* footer */}
        <div className=' flex flex-col m-5 p-5  item-end '>
          <p className='text-white text-sm font-medium'>Made with ❤️ by <a className='text-white text-sm font-medium' href='https://github.com/boneyrox'>Boney</a>

          </p>

        </div>

      </div>
    </div>
  );
}

export default App;
