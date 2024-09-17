import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";

interface ChangePasswordProps {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword = () => {
  const { data, setData, patch, errors, processing, wasSuccessful, reset } = useForm<ChangePasswordProps>({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    patch(route('account.change-password'));
  };

  useEffect(() => {
    if (wasSuccessful) {
      reset();
    }
  }, [wasSuccessful]);

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-semibold text-xl mb-3">Change Password</p>
      <div className="flex flex-col w-full sm:w-4/5 md:w-3/5 gap-1 mb-3">
        <label 
          htmlFor="current_password"
          className="text-zinc-600"
        >
          Current Password
        </label>
        <input 
          type="password" 
          id="current_password"
          className="px-2 py-1.5 rounded-md"
          disabled={processing}
          value={data.current_password}
          onChange={e => setData('current_password', e.target.value)}
        />
        {errors.current_password && <p className="text-red-500 text-xs px-1">{errors.current_password}</p>}
      </div>
      <div className="flex flex-col w-full sm:w-4/5 md:w-3/5 gap-1 mb-3">
        <label 
          htmlFor="new_password"
          className="text-zinc-600"
        >
          New Password
        </label>
        <input 
          type="password" 
          id="new_password"
          className="px-2 py-1.5 rounded-md"
          disabled={processing}
          value={data.password}
          onChange={e => setData('password', e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-xs px-1">{errors.password}</p>}
      </div>
      <div className="flex flex-col w-full sm:w-4/5 md:w-3/5 gap-1 mb-3">
        <label 
          htmlFor="confirm_password"
          className="text-zinc-600"
        >
          Confirm Password
        </label>
        <input 
          type="password" 
          id="confirm_password"
          className="px-2 py-1.5 rounded-md"
          disabled={processing}
          value={data.password_confirmation}
          onChange={e => setData('password_confirmation', e.target.value)}
        />
        {errors.password_confirmation && <p className="text-red-500 text-xs px-1">{errors.password_confirmation}</p>}
      </div>
      <button 
        type="submit"
        disabled={processing}
        className="bg-zinc-950 text-white px-3.5 py-2 rounded-md disabled:opacity-75"
      >
        Change
      </button>
    </form>
  );
};

export default ChangePassword;
