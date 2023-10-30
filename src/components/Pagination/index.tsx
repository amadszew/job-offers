import { PaginationTypes } from '@/utils/types';

const Pagination = ({ nofPages, pagesLimit, currPage, setPage }: PaginationTypes) => {

  const pages = Math.ceil(nofPages/pagesLimit);

  return (
    <div className='my-10 flex flex-wrap gap-2 sm:gap-4 justify-start'>
      {[...Array(pages)].map((e, i) => (
        <button 
          key={i} 
          value={i+1} 
          className={`rounded-full border-solid border-2 border-gray-800 p-4 w-[24px] h-[24px] flex items-center justify-center ${currPage === (i+1) && 'bg-gray-800'}`}
          onClick={() => setPage(i+1)}
          disabled={currPage === (i+1) && true}
        >
          {i+1}
        </button>
      ))}
    </div>
  )
}

export default Pagination;
