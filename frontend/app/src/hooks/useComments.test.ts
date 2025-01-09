import { renderHook, act } from '@testing-library/react';
import { useComments } from './useComments';

describe('useComments', () => {
  const initialComments = [
    { text: 'コメント1', date: '2025-01-01T00:00:00.000Z' },
    { text: 'コメント2', date: '2025-01-02T00:00:00.000Z' },
  ];

  test('指定されたコメントで初期化されること', () => {
    const { result } = renderHook(() => useComments(initialComments));
    expect(result.current.comments).toEqual(initialComments);
    expect(result.current.commentInput).toBe('');
  });

  test('setCommentInputが呼び出されるとcommentInputが更新されること', () => {
    const { result } = renderHook(() => useComments(initialComments));
    act(() => {
      result.current.setCommentInput('新しいコメント');
    });
    expect(result.current.commentInput).toBe('新しいコメント');
  });




});
