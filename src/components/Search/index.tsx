import { useState  } from 'react';
import { SearchType } from '@/utils/types';
import CloseIcon from '@/icons/CloseIcon';
import SearchIcon from '@/icons/SearchIcon';

const Search = ({ setSearch, searchVal }: SearchType) => {
  const [inputVal, setInputVal] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setSearch(e.currentTarget.value)
    }
  }

  const handleClear = () => {
    setSearch('');
    setInputVal('');
  };

  return (
    <div className='max-w-md'>
      <div className="relative flex items-start w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-12 w-12 text-gray-300">
          <div className="h-6 w-6">
            <SearchIcon />
          </div>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search..."
          onKeyUp={e => handleKeyPress(e)}
          onChange={e => setInputVal(e.target.value)}
          value={inputVal}
        /> 
      </div>

      {searchVal && (
        <div className="my-2 flex items-center">
          <p>Showing results for: {searchVal}</p>
          <button 
            className={'ml-4 rounded-full border-solid border-2 border-gray-800 p-3 w-[12px] h-[12px] flex items-center justify-center hover:bg-gray-800'}
            onClick={() => handleClear()}
          >
            <div className="h-5 w-5 absolute">
              <CloseIcon />
            </div>
          </button>
        </div>
      )}
  </div>
  )
}

export default Search;
