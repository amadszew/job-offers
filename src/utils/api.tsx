import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getJobs = async ({
  pageParam = 1, 
  searchParam, 
  limitParam = 10
}: {
  pageParam: number
  searchParam: string
  limitParam: number
}) => {
  const res = await fetch(`${API_URL}?limit=${limitParam}&search=${searchParam}&page=${pageParam}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const getJob = async (id: string) => {
  const res = await fetch(
    `${API_URL}/${id}`
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const applyData = async (
  formData: {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    cv_file_id: string,
  }, 
  id: string,
  setStatus: (status: number) => void
) => {

  const res = await fetch(
    `${API_URL}/${id}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  });

  setStatus(res.status);

  const data = await res.json()

  console.log('DATA', data)

  return NextResponse.json(data)
}

  
