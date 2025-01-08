
import AboutPageTemplate from "@/components/template/AboutPageTemplate";

const AboutPage = () => {
  const adminData = {
    name: "若林 将輝",
    role: "ブログ運営者",
    bio: `
      はじめまして!私は若林 将輝です。
      このブログでは、東京の美味しい食べ物を紹介しています。
    `,
    profileImagePath: "/no_image.webp",
  };

  return (
    <AboutPageTemplate adminData={adminData} />
  );
};

export default AboutPage;
