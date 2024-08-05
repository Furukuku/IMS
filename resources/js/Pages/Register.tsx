import InputField from "@/Components/InputField";
import { UserRegister } from "@/Interfaces/Authentication";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Register = () => {
  const { data, setData, post, processing, errors } = useForm<UserRegister>({
    first_name: '',
    last_name: '',
    company_name: '',
    company_address: '',
    student_no: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <>
      <Head title="Register" />
      <form 
        className="w-[400px] sm:w-[600px] border rounded-md p-10 mx-auto my-20 bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl font-medium mb-3">Register</p>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <InputField 
            label="First Name"
            value={data.first_name}
            setUserData={setData}
            fieldType="text"
            fieldName="first_name"
            disabled={processing}
            error={errors.first_name}
            id="fname"
            style="flex flex-col mb-5 w-full sm:w-[45%]"
          />
          <InputField 
            label="Last Name"
            value={data.last_name}
            setUserData={setData}
            fieldType="text"
            fieldName="last_name"
            disabled={processing}
            error={errors.last_name}
            id="lname"
            style="flex flex-col mb-5 w-full sm:w-[45%]"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <InputField 
            label="Company Name"
            value={data.company_name}
            setUserData={setData}
            fieldType="text"
            fieldName="company_name"
            disabled={processing}
            error={errors.company_name}
            id="companyName"
            style="flex flex-col mb-5 w-full sm:w-7/12"
          />
          <InputField 
            label="Student No."
            value={data.student_no}
            setUserData={setData}
            fieldType="text"
            fieldName="student_no"
            disabled={processing}
            error={errors.student_no}
            id="studentNo"
            style="flex flex-col mb-5 w-full sm:w-4/12"
          />
        </div>
        <InputField 
          label="Company Address"
          value={data.company_address}
          setUserData={setData}
          fieldType="text"
          fieldName="company_address"
          disabled={processing}
          error={errors.company_address}
          id="companyAddress"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="Email"
          value={data.email}
          setUserData={setData}
          fieldType="text"
          fieldName="email"
          disabled={processing}
          error={errors.email}
          id="email"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="Password"
          value={data.password}
          setUserData={setData}
          fieldType="password"
          fieldName="password"
          disabled={processing}
          error={errors.password}
          id="password"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="Confirm Password"
          value={data.password_confirmation}
          setUserData={setData}
          fieldType="password"
          fieldName="password_confirmation"
          disabled={processing}
          error={errors.password_confirmation}
          id="confirmPassword"
          style="flex flex-col mb-7"
        />
        <section className="flex justify-between items-center text-sm">
          <p>
            Already have an account? 
            <Link
              href="/login"
              className="underline ms-1"
            >
              Login
            </Link>
          </p>
          <button 
            type="submit" 
            disabled={processing}
            className="bg-zinc-950 text-white px-4 py-2.5 rounded-md disabled:opacity-75" 
          >
            Register
          </button>
        </section>
      </form>
    </>
  );
};

export default Register;
