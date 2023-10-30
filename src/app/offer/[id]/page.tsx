import Link from 'next/link';
import LocationIcon from '@/icons/LocationIcon';
import CompanyIcon from '@/icons/CompanyIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ApplyForm from '@/components/ApplyForm';
import { getJob } from "@/utils/api";
import daysSinceToday from '@/utils/daysSinceToday';

export default async function OfferPage ({
  params
}: {
  params: {
    id: string
  } 
}) {

  const {
    created_at,
    title,
    company,
    description,
    salary,
    location,
    location_state,
    department,
    salary_currency,
  } = await getJob(params.id)

  const daysAgo = daysSinceToday(created_at);

  return (
    <section className="py-8">
      <div className="container">
        <Link className='flex items-center w-fit' href="/">
          <ArrowLeftIcon />
          <span className="ml-2">Back to offers</span>
        </Link>
        <div className="w-full lg:w-7/12 text-center sm:text-left">
          <div className="mt-10 rounded-t-md bg-gradient-to-r from-amber-500 to-amber-600 font-bold">
            <div className="p-4">
              <div className="sm:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className='text-[14px]'>
                  Created&nbsp;
                  {daysAgo === 0
                    ? 'today'
                    : daysAgo > 1 
                      ? `${daysAgo} days ago` 
                      : 'yesterday'
                  }  
                </p>
              </div>
              <div className='sm:flex items-center'>
                <div className='flex items-center justify-center'>
                  <div className="w-[20px] h-[20px] mr-1">
                    <CompanyIcon fillVal="#fff" />
                  </div>
                  <p className='sm:mr-10'>{company}</p>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="w-[20px] h-[20px] mr-1">
                    <LocationIcon fillVal="#fff" />
                  </div>
                  <p>{location}, {location_state}</p>
                </div>
              </div>
              <div className='bg-black/40 w-fit mt-4 py-2 px-6 rounded-lg mx-auto sm:mx-0'>
                <p>{salary} {salary_currency}</p>
              </div>
            </div>
          </div>
          <div className='bg-gray-900 p-4 rounded-b-md sm:flex items-center justify-between'>
            <div className='mb-2 sm:m-0'>
              <p className='text-sm text-gray-400 mb-2'>Department</p>
              <p>{department}</p>
            </div>
            <div className='mb-2 sm:m-0'>
              <p className='text-sm text-gray-400 mb-2'>Operating mode</p>
              <p>Office</p>
            </div>
            <div className='mb-2 sm:m-0'>
              <p className='text-sm text-gray-400 mb-2'>Type of work</p>
              <p>Full-time</p>
            </div>
            <div className='mb-2 sm:m-0'>
              <p className='text-sm text-gray-400 mb-2'>Employment Type</p>
              <p>Contract</p>
            </div>
          </div>

          <div className='bg-gray-900 mt-6 p-4 rounded-md'>
            <h2 className='text-xl font-bold mb-6'>Job description</h2>
            <p>{description}</p>
          </div>

          <div className='bg-gray-900 mt-6 p-4 rounded-md'>
            <h2 className='text-xl font-bold mb-6'>Apply for this job</h2>
            <ApplyForm id={params.id} />
          </div>
        </div>
      </div>
    </section>
  )
}