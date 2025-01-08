
import BaseLayout from "@/components/layout/BaseLayout";
import { useContactForm } from "@/hooks/useContactForm";

const ContactPageTemplate = () => {
  const { formData, isSubmitted, handleChange, handleSubmit } = useContactForm();

  console.log(formData);

  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-400 mb-6">お問い合わせ</h1>
        {isSubmitted ? (
          <p className="text-teal-500 text-lg font-semibold">
            お問い合わせありがとうございます。返信までしばらくお待ちください。
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
            {/* 名前 */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-teal-500 font-bold mb-2"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="お名前を入力してください"
                required
              />
            </div>

            {/* メールアドレス */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-teal-500 font-bold mb-2"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="メールアドレスを入力してください"
                required
              />
            </div>

            {/* メッセージ */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-teal-500 font-bold mb-2"
              >
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="メッセージを入力してください"
                required
              />
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              className="w-full p-3 bg-teal-400 text-white font-bold rounded hover:bg-teal-500"
            >
              送信
            </button>
          </form>
        )}
      </div>
    </BaseLayout>
  );
}

export default ContactPageTemplate;
