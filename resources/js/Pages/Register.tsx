import InputField from "@/Components/InputField";
import { Head, Link } from "@inertiajs/react";

const Register = () => {
  return (
    <>
      <Head title="Register" />
      <form className="w-[400px] sm:w-[600px] border rounded-md p-10 mx-auto my-20 bg-white shadow-lg">
        <p className="text-2xl font-medium mb-3">Register</p>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <InputField 
            label="First Name"
            fieldType="text"
            id="fname"
            style="flex flex-col mb-5 w-full sm:w-[45%]"
          />
          <InputField 
            label="Last Name"
            fieldType="text"
            id="lname"
            style="flex flex-col mb-5 w-full sm:w-[45%]"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <InputField 
            label="Company Name"
            fieldType="text"
            id="companyName"
            style="flex flex-col mb-5 w-full sm:w-7/12"
          />
          <InputField 
            label="Student No."
            fieldType="text"
            id="studentNo"
            style="flex flex-col mb-5 w-full sm:w-4/12"
          />
        </div>
        <InputField 
          label="Company Address"
          fieldType="text"
          id="companyAddress"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="Email"
          fieldType="text"
          id="email"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="Password"
          fieldType="password"
          id="password"
          style="flex flex-col mb-5"
        />
        <InputField 
          label="ConfirmPassword"
          fieldType="password"
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
          <input 
            type="submit" 
            value="Register"
            className="bg-zinc-950 text-white px-4 py-2.5 rounded-md" 
          />
        </section>
      </form>
    </>
  );
};

export default Register;
