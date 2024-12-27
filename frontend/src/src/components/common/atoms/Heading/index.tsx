

const index = () => {
  return (
    <div>
      <div className="p-6">
        <Heading level={1}>ブログのメインタイトル</Heading>
        <Heading level={2}>セクションタイトル</Heading>
        <Heading level={3}>小見出し</Heading>
        <Heading level={4}>さらに小さい見出し</Heading>
        <Heading level={5}>細かい見出し</Heading>
        <Heading level={6}>最小の見出し</Heading>
      </div>
    </div>
  );
}

export default index;


const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  const styles = {
    h1: "text-teal-400 font-extrabold text-5xl md:text-6xl border-b-4 border-teal-400 pb-2 mb-4",
    h2: "text-teal-400 font-bold text-4xl md:text-5xl bg-teal-50 rounded px-4 py-2",
    h3: "text-teal-400 font-semibold text-3xl md:text-4xl underline decoration-teal-400",
    h4: "text-teal-400 font-medium text-2xl md:text-3xl italic",
    h5: "text-teal-400 font-normal text-xl md:text-2xl tracking-wide uppercase",
    h6: "text-teal-400 font-light text-lg md:text-xl tracking-wider bg-teal-100 rounded-full px-3 py-1",
  };

  return <Tag className={styles[Tag]}>{children}</Tag>;
};
