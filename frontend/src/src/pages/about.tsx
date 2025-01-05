
import AboutPageTemplate from "@/components/template/AboutPageTemplate";

const AboutPage = () => {
  const adminData = {
    name: "山田 太郎",
    role: "ブログ運営者",
    bio: `
      はじめまして!私はWeb開発者として10年以上の経験を持つ山田太郎です。
      このブログでは、プログラミングやデザインに関する知識を共有し、
      初心者から上級者まで幅広い方々に役立つ情報を提供しています。
      特にNext.jsやTailwind CSSなどの最新技術を活用した効率的な開発方法を探求することが好きです。
    `,
    profileImagePath: "/images/admin-profile.jpg",
  };

  return (
    <AboutPageTemplate adminData={adminData} />
  );
};

export default AboutPage;
