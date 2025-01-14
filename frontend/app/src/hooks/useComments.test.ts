import { renderHook, act } from "@testing-library/react";
import { useComments } from "./useComments";
import { describe, it, expect, vi } from "vitest";

type CommentData = {
  text: string;
  date: string;
}

describe("useComments", () => {
  it("初期コメントを設定する", () => {
    const initialComments = [{ text: "初期コメント", date: "2025-01-01T00:00:00.000Z" }];
    const { result } = renderHook(() => useComments(initialComments));

    expect(result.current.comments).toEqual(initialComments);
    expect(result.current.commentInput).toBe("");
  });

  it("コメントを追加する", () => {
    const initialComments: CommentData[] = [];
    const { result } = renderHook(() => useComments(initialComments));

    act(() => {
      result.current.setCommentInput("新しいコメント");
    });

    act(() => {
      // モックイベントを作成
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;
      // モックイベントを渡す
      result.current.handleCommentSubmit(mockEvent);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].text).toBe("新しいコメント");
    expect(result.current.comments[0].date).toBeDefined();
    expect(result.current.commentInput).toBe("");
  });

  it("空のコメントは追加されない", () => {
    const initialComments: CommentData[] = [];
    const { result } = renderHook(() => useComments(initialComments));

    act(() => {
      result.current.setCommentInput("");
    });

    act(() => {
      // モックイベントを作成
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;
      // モックイベントを渡す
      result.current.handleCommentSubmit(mockEvent);
    });

    expect(result.current.comments).toHaveLength(0);
    expect(result.current.commentInput).toBe("");
  });
});
