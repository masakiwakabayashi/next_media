
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center mt-6">
      {/* 前のページボタン */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-l bg-teal-400 text-white hover:bg-teal-500 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        前へ
      </button>

      {/* ページ番号 */}
      <ul className="flex items-center space-x-2 mx-4">
        {generatePageNumbers().map((page) => (
          <li key={page}>
            <button
              onClick={() => handleClick(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-400 border border-teal-400 hover:bg-teal-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      {/* 次のページボタン */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-r bg-teal-400 text-white hover:bg-teal-500 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        次へ
      </button>
    </nav>
  );
};
