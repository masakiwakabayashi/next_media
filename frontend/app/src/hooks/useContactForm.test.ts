import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';

describe('useContactForm', () => {
  test('フォームの初期化', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    });
    expect(result.current.isSubmitted).toBe(false);
  });

  test('handleChangeでformDataが更新されること', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: '山田太郎' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.name).toBe('山田太郎');
  });



});
