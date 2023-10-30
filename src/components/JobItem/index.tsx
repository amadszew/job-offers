import Link from 'next/link';
import { Jobs } from '@/utils/types';
import LocationIcon from '@/icons/LocationIcon';
import CompanyIcon from '@/icons/CompanyIcon';
import daysSinceToday from '@/utils/daysSinceToday'

export default function JobItem({ 
    id,
    created_at,
    title,
    company,
    salary,
    location,
    location_state,
    department,
    salary_currency
}: Jobs) {

  const daysAgo = daysSinceToday(created_at);

  return (
    <div className='w-full max-w-xl rounded-md overflow-hidden bg-gray-900'>
      <Link href={`/offer/${id}`}>
        <div className='py-2 px-6'>
          <div className='sm:flex justify-between'>
            <p className='font-semibold text-lg'>{title}</p>
            <div className='flex items-center'>
              <p className='text-green-700 font-semibold'>{salary} {salary_currency}</p>
              <p className='ml-4 text-[10px] rounded-lg bg-black p-2 text-gray-300'>
                {daysAgo === 0
                  ? 'today'
                  : daysAgo > 1 
                    ? `${daysAgo} days ago` 
                    : 'yesterday'
                }
              </p>
            </div>
          </div>
          <div className='mt-4 sm:flex items-center justify-between text-gray-300'>
            <div className='sm:flex items-center text-sm'>
              <div className='flex items-center mr-4'>
                <div className="w-[16px] h-[16px] mr-1">
                  <CompanyIcon fillVal="#d1d5db" />
                </div>
                <p>{company}</p>
              </div>
              <div className='flex items-center mt-2 sm:mt-0'>
                <div className="w-[16px] h-[16px] mr-1">
                  <LocationIcon fillVal="#d1d5db" />
                </div>
                <p>{location}, {location_state}</p>
              </div>
            </div>
            <p className='sm:ml-2 mt-2 sm:mt-0 w-fit text-[10px] rounded-lg border-2 border-gray-800 p-2'>{department}</p>
          </div>
        </div> 
      </Link>
    </div>
  )
}
