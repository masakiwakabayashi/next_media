
import BaseLayout from "@/components/layout/BaseLayout";
import Image from "next/image";

type adminData = {
  name: string;
  role: string;
  bio: string;
  profileImagePath: string;
}

type AboutPageProps = {
  adminData: adminData;
}


const AboutPageTemplate = (props: AboutPageProps) => {
  const { adminData } = props;

  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-400 mb-6">運営者について</h1>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center">
          {/* プロフィール画像 */}
          <div className="w-32 h-32 relative mb-6 md:mb-0 md:mr-6">
            <Image
              src={adminData.profileImagePath}
              alt={adminData.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          {/* 運営者情報 */}
          <div>
            <h2 className="text-2xl font-bold text-teal-500 mb-2">{adminData.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{adminData.role}</p>
            <p className="text-gray-800 leading-relaxed">{adminData.bio}</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default AboutPageTemplate;
