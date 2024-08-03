import InputField from '@/Components/InputField'
import { Head, Link } from '@inertiajs/react'

const Login = () => {
  return (
    <>
      <Head title="Login" />
      <form className="border rounded-md w-[400px] sm:w-[500px] p-10 mx-auto my-40 bg-white shadow-lg">
        <p className="text-2xl font-medium mb-3">Login</p>
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
          style="flex flex-col mb-7"
        />
        <section className="flex justify-between items-center text-sm">
          <p>
            Don't have an account? 
            <Link
              href="/register"
              className="underline ms-1"
            >
              Register
            </Link>
          </p>
          <input 
            type="submit" 
            value="Login"
            className="bg-zinc-950 text-white px-4 py-2.5 rounded-md" 
          />
        </section>
      </form>
    </>
  );
};

export default Login;
