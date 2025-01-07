import { useState } from "react";


type CommentData = {
  text: string;
  date: string;
};

export const useComments = (initialComments: CommentData[]) => {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [commentInput, setCommentInput] = useState<string>("");

  // コメント追加処理
  const addComment = (text: string) => {
    const newComment = { text, date: new Date().toISOString() };
    // TODO: コメントを登録するAPI呼び出しをここに追加
    console.log("新しいコメント:", newComment);
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // フォーム送信処理
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentInput.trim()) {
      addComment(commentInput);
      setCommentInput("");
    }
  };

  return {
    comments,
    commentInput,
    setCommentInput,
    handleCommentSubmit,
  };
};
