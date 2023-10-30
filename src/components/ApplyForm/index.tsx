'use client'
import { useState } from "react";
import { applyData } from "@/utils/api";
import { FormDataType } from "@/utils/types";
import Input from "./Input";

const ApplyForm = ({ id }: { id: string }) => {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cv_file_id: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cv_file_id: '',
  });

  const [status, setStatus] = useState<number>();

  const handleChange = ({ target: {value, name} }: {
    target: HTMLInputElement} ) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleGetFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target= e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFormData({
      ...formData,
      cv_file_id: file.name
    })
  };

  const handleValidation = () => {
    const {
      first_name,
      last_name,
      email,
      phone,
      cv_file_id
    } = formData;

    let errors: FormDataType = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      cv_file_id: ''
    };

    let formIsValid = true;

    //first Name validation
    if (first_name.trim().length === 0) {
      formIsValid = false;
      errors["first_name"] = " is required";
    }
    
    //last Name validation
    if (last_name.trim().length === 0) {
      formIsValid = false;
      errors["last_name"] = " is required";
    }

    //file validation
    if (cv_file_id.trim().length === 0) {
      formIsValid = false;
      errors["cv_file_id"] = " is required";
    }
    
    //email validation
    if (email.trim().length === 0) {
      formIsValid = false;
      errors["email"] = " is required";
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      formIsValid = false;
      errors["email"] = " is not valid";
    }
    
    //phone validation
    if (phone.trim().length === 0) {
      formIsValid = false;
      errors["phone"] = " is required";
    }

    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (!phone.match(phoneRegex)) {
      formIsValid = false;
      errors["phone"] = " is not valid";
    }

    setErrors(errors);
    return formIsValid;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      applyData(formData, id, setStatus);
    }
  };

  return (
    <div className="relative">
      {status && (
        <div className="absolute w-full h-full bg-gray-900 flex items-center justify-center">
          {status === 200 ? (
            <h1 className="text-2xl">
              Your application has been successfully sent
            </h1>
          ) : (
            <div>
              <h1 className="text-2xl">
                Ups, something went wrong. Try again later
              </h1>
              <p className="mt-6 text-xl text-center">
                (Status code: {status})
              </p>
            </div>
          )}
        </div>
      )}
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="md:grid md:grid-cols-2 md:gap-8 lg:m-0">
          <Input 
            type="text" 
            id="first_name" 
            label="First name" 
            placeholder="Enter your first name"
            error={errors.first_name} 
            handler={handleChange}
          />
          <Input 
            type="text" 
            id="last_name" 
            label="Last name" 
            placeholder="Enter your last name"
            error={errors.last_name} 
            handler={handleChange}
          />
          <Input 
            type="email" 
            id="email" 
            label="Email" 
            placeholder="Enter your email"
            error={errors.email} 
            handler={handleChange}
          />
          <Input 
            type="number" 
            id="phone" 
            label="Phone" 
            placeholder="Enter your phone number"
            error={errors.phone} 
            handler={handleChange}
          />
          <Input 
            type="file" 
            id="cv_file_id" 
            label="File upload" 
            placeholder="Upload your file"
            error={errors.cv_file_id} 
            handler={handleGetFileName}
          />
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className='rounded-full bg-red-400 py-3 px-20 font-semibold'
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}

export default ApplyForm;