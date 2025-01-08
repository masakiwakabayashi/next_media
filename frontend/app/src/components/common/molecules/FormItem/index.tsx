
import { FormInput } from "../../atoms/FormInput";
import { FormTextArea } from "../../atoms/FormTextArea";


type BasicFormItemProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: () => void;
  required: boolean;
  children: React.ReactNode;
}


export const FormInputItem = (props: BasicFormItemProps) => {
  const { children, id, name, value, placeholder, onChange, required } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-teal-500 font-bold mb-2"
      >
        {children}
      </label>
      <FormInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}


export const FormTextAreaItem = (props: BasicFormItemProps) => {
  const { children, id, name, value, placeholder, onChange, required } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-teal-500 font-bold mb-2"
      >
        {children}
      </label>
      <FormTextArea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}



