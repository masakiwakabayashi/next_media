
type CategoryChipProps = {
  children: React.ReactNode;
}

export const CategoryChip = (props: CategoryChipProps) => {
  const { children } = props;

  return (
    <div className="absolute top-2 left-2 bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded">
      {children}
    </div>
  );
}
