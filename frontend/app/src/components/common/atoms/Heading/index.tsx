

type BasicHeadingProps = {
  children: React.ReactNode;
}


export const Heading1 = (props: BasicHeadingProps) => {
  const { children } = props;
  return (
    <h1 className="text-4xl font-bold text-teal-400 mb-6">
      {children}
    </h1>
  );
}

export const Heading2 = (props: BasicHeadingProps) => {
  const { children } = props;
  return (
    <h2 className="text-lg font-bold text-teal-500 mb-4">
      {children}
    </h2>
  );
}
