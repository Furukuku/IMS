
interface InputFieldProps {
  label: string;
  fieldType: string;
  id: string;
  style: string;
}

const InputField = ({ label, fieldType, id, style, }: InputFieldProps) => {
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
        id={id}
        className="py-1.5 px-2 rounded" 
      />
    </section>
  );
};

export default InputField;
