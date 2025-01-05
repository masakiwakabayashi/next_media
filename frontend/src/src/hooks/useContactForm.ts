import { useState } from "react";


export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // フォームの値を変更する関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // フォームを送信する関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: ここでAPIを呼び出す
    console.log("送信されたデータ:", formData);
    setIsSubmitted(true);
  };

  return {
    formData,
    isSubmitted,
    handleChange,
    handleSubmit,
  };
};
