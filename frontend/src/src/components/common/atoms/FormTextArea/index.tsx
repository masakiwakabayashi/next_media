type BasicFormTextAreaProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: () => void;
  required: boolean;
}


export const FormTextArea = (props: BasicFormTextAreaProps) => {
  const { id, name, value, placeholder, onChange, required } = props;

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
      placeholder={placeholder}
      required={required}
    />
  );
}
