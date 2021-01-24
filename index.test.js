import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('input with normal mouseDown event', () => {
  const state = { value: '' }
  const handleChange = jest.fn(e => (state.value = e.target.value))
  const { getByRole } = render(
    <div>
      <input
        type="text"
        value={state.value}
        onChange={handleChange}
        onMouseDown={(e) => null}
        onMouseUp={(e) => null}
      />
    </div>
  )
  const $input = getByRole('textbox')
  
  const sample = 'hello world'
  userEvent.type($input, sample)

  expect(handleChange).toHaveBeenCalledTimes(sample.length)
})

test('input with prevented mouseDown event', () => {
  const state = { value: '' }
  const handleChange = jest.fn(e => (state.value = e.target.value))
  const { getByRole } = render(
    <div>
      <input
        type="text"
        value={state.value}
        onChange={handleChange}
        onMouseDown={(e) => void e.preventDefault()}
      />
    </div>
  )
  const $input = getByRole('textbox')
  
  const sample = 'hello world'
  userEvent.type($input, sample)

  expect(handleChange).toHaveBeenCalledTimes(sample.length)
})