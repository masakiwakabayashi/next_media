import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  it('totalPagesが1以下の場合は何も表示しない', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('最初のページでは「前へ」がリンクにならない', () => {
    render(<Pagination currentPage={1} totalPages={3} />)

    expect(screen.queryByRole('link', { name: '前へ' })).not.toBeInTheDocument()
    expect(screen.getByText('前へ')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '次へ' })).toHaveAttribute('href', '/?page=2')
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('最後のページでは「次へ」がリンクにならない', () => {
    render(<Pagination currentPage={3} totalPages={3} />)

    expect(screen.queryByRole('link', { name: '次へ' })).not.toBeInTheDocument()
    expect(screen.getByText('次へ')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '前へ' })).toHaveAttribute('href', '/?page=2')
  })

  it('検索クエリがある場合はhrefにqを含める', () => {
    render(<Pagination currentPage={2} totalPages={3} query="キーワード" />)

    expect(screen.getByRole('link', { name: '前へ' })).toHaveAttribute(
      'href',
      '/?q=%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%89'
    )
    expect(screen.getByRole('link', { name: '次へ' })).toHaveAttribute(
      'href',
      '/?q=%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%89&page=3'
    )
  })
})
