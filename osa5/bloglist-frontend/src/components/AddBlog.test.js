import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, act } from '@testing-library/react'
import AddBlog from './AddBlog'

test('handleSubmit is called with correct arguments ', () => {
    
    const doAddBlog = jest.fn(async () => {})

    const component = render(
        <AddBlog doAddBlog={doAddBlog} />
    )
    
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    fireEvent.change(titleInput, { target: { value: 'Title'}})
    fireEvent.change(authorInput, { target: { value: 'Author'}})
    fireEvent.change(urlInput, { target: { value: 'http://example.com'}})

    act(() => {
        const submitButton = component.container.querySelector('#submit')
        fireEvent.click(submitButton)
    });    

    expect(doAddBlog.mock.calls).toHaveLength(1)
    expect(doAddBlog.mock.calls[0][0].title).toBe('Title')
    expect(doAddBlog.mock.calls[0][0].author).toBe('Author')
    expect(doAddBlog.mock.calls[0][0].url).toBe('http://example.com')
})
