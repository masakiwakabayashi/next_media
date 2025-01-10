import Image from "next/image";

type ProfileCardProps = {
  imagePath: string;
  name: string;
  bio: string;
}

const ProfileCard = ({ imagePath, name, bio } : ProfileCardProps) => {
  return (
    <div className="rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden">
      {/* プロフィール画像 */}
      <div className="relative bg-teal-400 h-32">
        <Image
          width={100}
          height={100}
          src={imagePath ? imagePath : "/no_image.webp"}
          alt={name}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>
      {/* プロフィール情報 */}
      <div className="pt-16 pb-6 px-6 text-center">
        <h2 className="text-xl font-bold text-teal-400">{name}</h2>
        <p className="mt-4 text-sm text-gray-700">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
