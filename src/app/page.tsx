'use client'

import { Suspense, useState, useEffect } from 'react';
import { getJobs } from "@/utils/api";
import Await from '@/components/Await';
import Loading from "@/components/Loading";
import JobList from "@/components/JobsList";
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';

import { PropsType } from '@/utils/types';

const Home = () => {

  const [params, setParams] = useState({
    pageParam: 1,
    searchParam: '',
    limitParam: 10
  })

  const [count, setCount] = useState(0);

  const promise = getJobs(params);

  const handleSetPage = (value: number) => {
    setParams({
      ...params,
      pageParam: value
    })
  };

  const handleSetSearch = (value: string) => {
    setParams({
      ...params,
      pageParam: 1,
      searchParam: value
    })
  };

  useEffect(() => {
    promise.then((a) => {
      setCount(a.count)
    });
  }, [params])
  
  return (
    <section className="py-20">
      <div className="container">

        <Search 
          setSearch={handleSetSearch} 
          searchVal={params.searchParam} 
        />
        
        <Suspense fallback={<Loading />}>
          <Await promise={promise}>
            {({ items }: PropsType) => (
              <JobList items={items} />
            )}
          </Await>
        </Suspense>

        <Pagination 
          nofPages={count} 
          pagesLimit={params.limitParam} 
          currPage={params.pageParam}
          setPage={handleSetPage} 
        />

      </div>
    </section>
  )
}

export default Home;
