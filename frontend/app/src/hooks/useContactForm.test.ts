import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "./useContactForm";
import { describe, it, expect, vi } from "vitest";

describe("useContactForm", () => {
  it("初期状態を確認する", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.formData).toEqual({
      name: "",
      email: "",
      message: "",
    });
    expect(result.current.isSubmitted).toBe(false);
  });

  it("フォームデータを変更する", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "テストユーザー" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "message", value: "テストメッセージ" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.formData).toEqual({
      name: "テストユーザー",
      email: "test@example.com",
      message: "テストメッセージ",
    });
  });

  it("フォームを送信する", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "テストユーザー" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "message", value: "テストメッセージ" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    act(() => {
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.formData).toEqual({
      name: "テストユーザー",
      email: "test@example.com",
      message: "テストメッセージ",
    });
  });
});
