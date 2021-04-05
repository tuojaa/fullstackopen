import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders short content', () => {
  const blog = {
    title: 'Paavon muistelmat',
    author: 'Paavo M. Pesusieni',
    url: 'http://paavo.com/123',
    likes: 987,
    user: {
      name: 'Mikko Mallikas'
    }
  }

  const component = render(
    <Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />
  )

  expect(component.container).not.toHaveTextContent(
    'http://paavo.com/123'
  )
  expect(component.container).not.toHaveTextContent(
    '987'
  )

})

test('renders details when show button is clicked', () => {
  const blog = {
    title: 'Paavon muistelmat',
    author: 'Paavo M. Pesusieni',
    url: 'http://paavo.com/123',
    likes: 987,
    user: {
      name: 'Mikko Mallikas'
    }
  }

  const component = render(
    <Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(
    'http://paavo.com/123'
  )
  expect(component.container).toHaveTextContent(
    '987'
  )

})

test('handleLike is called 2 times when add like button is clicked twice', () => {
  const blog = {
    title: 'Paavon muistelmat',
    author: 'Paavo M. Pesusieni',
    url: 'http://paavo.com/123',
    likes: 987,
    user: {
      name: 'Mikko Mallikas'
    }
  }
  const handleLike = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={() => {}} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})