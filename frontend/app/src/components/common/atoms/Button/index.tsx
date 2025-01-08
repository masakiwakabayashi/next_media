
type BasicButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
}

export const CtaButton = (props: BasicButtonProps) => {
  const { children, onClick } = props;

  return (
    <button
      className="w-80 px-12 py-3 text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
