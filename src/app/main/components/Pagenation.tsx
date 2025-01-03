interface PagenationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagenation({
  currentPage,
  totalPages,
  handlePageChange,
}: PagenationProps) {
  return (
    <>
      <div className='flex justify-center items-center gap-2 mt-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='text-yellow-400 disabled:text-gray-500'
        >
          {"◀"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-2 ${
              currentPage === i + 1
                ? "text-white bg-blue-900"
                : "text-yellow-400"
            }`}
          >
            {(i + 1).toString().padStart(2, "0")}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='text-yellow-400 disabled:text-gray-500'
        >
          {"▶"}
        </button>
      </div>
      <div className='text-sm mt-2'>
        {`페이지: ${currentPage.toString().padStart(2, "0")} / ${totalPages
          .toString()
          .padStart(2, "0")}`}
      </div>
    </>
  );
}
