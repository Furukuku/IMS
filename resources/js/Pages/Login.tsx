import InputField from "@/Components/InputField";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { UserLogin } from "@/Interfaces/Authentication";
import { FormEvent, useEffect } from "react";
import { PageProps } from "@/types";

const Login = () => {
  const { flash } = usePage<PageProps>().props;
  const { data, setData, post, processing, errors } = useForm<UserLogin>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post('/login');
  };

  useEffect(() => {
    if (flash.message) {
      setData((prev: UserLogin) => ({
        email: '',
        password: ''
      }));
    }
  }, [flash]);

  return (
    <>
      <Head title="Login" />
      <form 
        className="border rounded-md w-[400px] sm:w-[500px] p-10 mx-auto my-40 bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl font-medium mb-3">Login</p>
        {flash.message && <p className="text-red-500 text-xs mb-3">{flash.message}</p>}
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
          <button 
            type="submit" 
            disabled={processing}
            className="bg-zinc-950 text-white px-4 py-2.5 rounded-md disabled:opacity-75" 
          >
            Login
          </button>
        </section>
      </form>
    </>
  );
};

export default Login;
