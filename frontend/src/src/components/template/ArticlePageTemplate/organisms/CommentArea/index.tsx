

type CommentData = {
  text: string;
  date: string;
}

type CommentAreaProps = {
  CommentData: CommentData[]
}

const CommentArea = (props: CommentAreaProps) => {
  const { CommentData } = props;

  return (
      <div className="mt-12">
        <h2 className="text-lg font-bold text-teal-400 mb-4">コメント</h2>
        {/* コメントフォーム */}
        <form onSubmit={()=>{}} className="mb-6">
          <textarea
            className="w-full p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="コメントを入力してください..."
            // value={}
            onChange={()=>{}}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-500"
          >
            コメントを投稿
          </button>
        </form>
        {/* コメント一覧 */}
        <div>
          {CommentData.length > 0 ? (
            CommentData.map((comment, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">まだコメントはありません。</p>
          )}
        </div>
      </div>
  );
}

export default CommentArea;
