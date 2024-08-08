import { UserLogin, UserRegister } from "@/Interfaces/Authentication";
import { ChangeEvent } from "react";

type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type userDetails = UserRegister | UserLogin;

interface InputFieldProps {
  label: string;
  value: string;
  setUserData: setDataByMethod<userDetails>;
  fieldType: string;
  fieldName: string;
  disabled: boolean;
  error?: string;
  id: string;
  style: string;
}

const InputField = ({
  label, 
  value, 
  setUserData, 
  fieldType,
  fieldName, 
  disabled,
  error,
  id, 
  style 
}: InputFieldProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserData((prev: userDetails) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <section className={style}>
      <label 
        htmlFor={id}
        className="mb-1"
      >
        {label}
      </label>
      <input 
        type={fieldType}
        name={fieldName}
        value={value} 
        disabled={disabled}
        id={id}
        className="py-1.5 px-2 rounded"
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500 text-xs m-1">{error}</p>}
    </section>
  );
};

export default InputField;
