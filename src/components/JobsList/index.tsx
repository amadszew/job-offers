"use client"
import JobItem from "../JobItem";
import { PropsType } from '@/utils/types';

export default function JobList({ items } : PropsType) {

  return (
      <div className="my-10 grid grid-cols-1 gap-4">
        {items.length ? (
          items.map((item: any) => (
            <JobItem {...item} key={item.id} />
          ))
        ) : (
          <p>No job offers found</p>
        )}
      </div>
  );
}

