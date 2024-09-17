import ChangeAccountDetails from "@/Components/ChangeAccountDetails";
import ChangePassword from "@/Components/ChangePassword";
import HomeLayout from "@/Layouts/HomeLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, MouseEventHandler, useEffect, useRef } from "react";

const Account = () => {
  return (
    <HomeLayout>
      <main className="py-5 px-2 sm:px-10">
        <div className="bg-white shadow rounded-md border p-10 sm:p-14">
          
          <ChangeAccountDetails />
          <ChangePassword />
        </div>
      </main>
    </HomeLayout>
  );
};

export default Account;
