
import BaseLayout from "@/components/layout/BaseLayout";

const PrivacyPolicyTemplate = () => {
  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-400 mb-6">プライバシーポリシー</h1>
        <p className="text-gray-800 mb-6">
          このプライバシーポリシーでは、当サイトが収集する情報、その情報の使用方法、およびプライバシー保護への取り組みについて説明します。
        </p>

        {/* 情報の収集 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">情報の収集</h2>
          <p className="text-gray-800 leading-relaxed">
            当サイトでは、以下の情報を収集する場合があります：
          </p>
          <ul className="list-disc list-inside text-gray-800 mt-4">
            <li>名前、メールアドレス（お問い合わせ時など）</li>
            <li>アクセスログ、Cookie による利用者の行動データ</li>
          </ul>
        </section>

        {/* 情報の利用目的 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">情報の利用目的</h2>
          <p className="text-gray-800 leading-relaxed">
            収集した情報は、以下の目的で使用されます：
          </p>
          <ul className="list-disc list-inside text-gray-800 mt-4">
            <li>お問い合わせへの回答</li>
            <li>サービス改善のためのデータ分析</li>
            <li>利用者への重要な通知の送信</li>
          </ul>
        </section>

        {/* 情報の共有 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">情報の共有</h2>
          <p className="text-gray-800 leading-relaxed">
            当サイトは、以下の場合を除き、収集した情報を第三者と共有することはありません：
          </p>
          <ul className="list-disc list-inside text-gray-800 mt-4">
            <li>法律に基づく要求があった場合</li>
            <li>利用者の同意がある場合</li>
          </ul>
        </section>

        {/* セキュリティ */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">セキュリティ</h2>
          <p className="text-gray-800 leading-relaxed">
            当サイトは、利用者の情報を安全に保つために適切なセキュリティ対策を実施しています。
          </p>
        </section>

        {/* 改訂について */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">プライバシーポリシーの改訂について</h2>
          <p className="text-gray-800 leading-relaxed">
            当サイトは、必要に応じてプライバシーポリシーを改訂することがあります。改訂後は本ページにてお知らせします。
          </p>
        </section>
      </div>
    </BaseLayout>
  );
}

export default PrivacyPolicyTemplate;
