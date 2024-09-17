import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEvent, MouseEventHandler, useRef } from "react";

interface UpdateAccountProps {
  _method: string;
  profile_picture: File | null;
  first_name: string;
  last_name: string;
  email: string;
}

const ChangeAccountDetails = () => {
  const changeProfileInput = useRef<HTMLInputElement | null>(null);
  const profileImage = useRef<HTMLImageElement | null>(null);
  const { user } = usePage<PageProps>().props.auth;
  const { data, setData, post, errors, processing } = useForm<UpdateAccountProps>({
    _method: 'patch',
    profile_picture: null,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });


  const handleChangeProfilePictureClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    if (changeProfileInput.current) {
      changeProfileInput.current.click();
    }
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setData('profile_picture', image);

      if (profileImage.current) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            profileImage.current!.src = reader.result as string;
          }
        };
        reader.readAsDataURL(image);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route('account.update'));
  };

  return (
    <>
      <section className="flex items-center flex-col sm:flex-row justify-center sm:justify-start gap-5 border-b-2 pb-8 mb-8">
        <img 
          src={user.profile_picture ? `storage/profiles/${user.profile_picture}` : 'https://placehold.co/150x150'} 
          alt="profile picture" 
          className="rounded-full size-32 object-cover object-top border bg-zinc-50"
          ref={profileImage}
        />
        <div className="text-center sm:text-start">
          <p className="font-semibold text-2xl">{user.first_name} {user.last_name}</p>
          <button 
            className="underline text-sm"
            onClick={handleChangeProfilePictureClick}
          >
            Change profile picture
          </button>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/jpg"
            hidden
            ref={changeProfileInput}
            onChange={handleProfilePictureChange}
          />
        </div>
      </section>
      <form 
        className="mb-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between flex-wrap gap-4 mb-3">
          <div className="flex flex-col grow gap-1">
            <label 
              htmlFor="fname"
              className="text-zinc-600"
            >
              First Name
            </label>
            <input 
              type="text" 
              id="fname"
              className="px-2 py-1.5 rounded-md"
              disabled={processing}
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
            />
            {errors.first_name && <p className="text-red-500 text-xs px-1">{errors.first_name}</p>}
          </div>
          <div className="flex flex-col grow gap-1">
            <label 
              htmlFor="lname"
              className="text-zinc-600"
            >
              Last Name
            </label>
            <input 
              type="text" 
              id="lname"
              className="px-2 py-1.5 rounded-md"
              disabled={processing}
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
            />
            {errors.last_name && <p className="text-red-500 text-xs px-1">{errors.last_name}</p>}
          </div>
          <div className="flex flex-col grow gap-1">
            <label 
              htmlFor="email"
              className="text-zinc-600"
            >
              Email
            </label>
            <input 
              type="text" 
              id="email"
              className="px-2 py-1.5 rounded-md"
              disabled={processing}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs px-1">{errors.email}</p>}
          </div>
        </div>
        <button 
          type="submit"
          disabled={processing}
          className="bg-zinc-950 text-white px-3.5 py-2 rounded-md disabled:opacity-75"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ChangeAccountDetails;
