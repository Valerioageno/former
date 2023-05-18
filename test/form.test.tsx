/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form, FormResult, Input, Radio, RadioGroup, Select, Textarea } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Form', () => {
  it('Render form', () => {
    render(<Form data-testid="form" />)
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInstanceOf(HTMLFormElement)
    expect(screen.getByTestId('form')).toBeVisible()
  })

  it('Correct submit payload', async () => {
    let payload: FormResult
    const initialPayload = {
      isFormValid: true,
      payload: {
        email: '',
        password: '',
        textarea1: '',
        textarea2: '',
        select1: '',
        select2: '',
        'radio-group-1': 'radio2',
        'radio-group-2': 'radio3',
        checkbox1: true,
        checkbox2: false,
        number1: 0,
        number2: 80,
      },
    }
    const submitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }

    render(
      <Form onSubmit={submitFn}>
        <Input name="email" type="email" data-testid="email" initialValue="" />
        <Input name="password" type="password" data-testid="password" initialValue="" />
        <Textarea name="textarea1" data-testid="textarea1" initialValue="" />
        <Textarea name="textarea2" data-testid="textarea2" initialValue="" />
        <Select name="select1" data-testid="select1" initialValue="">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <Select name="select2" data-testid="select2" initialValue="">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <RadioGroup name="radio-group-1" initialValue="radio2">
          <Radio name="radio1" data-testid="radio1" />
          <Radio name="radio2" />
        </RadioGroup>
        <RadioGroup name="radio-group-2" initialValue="radio3">
          <Radio name="radio3" />
          <Radio name="radio4" />
        </RadioGroup>
        <Input name="checkbox1" type="checkbox" data-testid="checkbox1" initialValue />
        <Input name="checkbox2" type="checkbox" data-testid="checkbox2" initialValue={false} />
        <Input name="number1" type="number" data-testid="number1" initialValue={0} />
        <Input name="number2" type="number" data-testid="number2" initialValue={80} />
        <button type="button" name="reset" data-testid="reset">
          Reset
        </button>
        <button type="submit" data-testid="submit">
          submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))

    expect(payload!).toStrictEqual(initialPayload)

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'hey@kingpin.com' } })
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'psw' } })
    fireEvent.change(screen.getByTestId('textarea1'), { target: { value: 'test textarea 1' } })
    fireEvent.change(screen.getByTestId('textarea2'), { target: { value: 'test textarea 2' } })
    fireEvent.change(screen.getByTestId('select1'), { target: { value: '1' } })
    fireEvent.change(screen.getByTestId('select2'), { target: { value: '3' } })

    fireEvent.click(screen.getByTestId('radio1'))
    fireEvent.click(screen.getByTestId('checkbox1'))
    fireEvent.click(screen.getByTestId('checkbox2'))
    fireEvent.change(screen.getByTestId('number1'), { target: { value: '40' } })
    fireEvent.change(screen.getByTestId('number2'), { target: { value: '10' } })

    fireEvent.click(screen.getByTestId('submit'))

    expect(payload!).toStrictEqual({
      isFormValid: true,
      payload: {
        email: 'hey@kingpin.com',
        password: 'psw',
        textarea1: 'test textarea 1',
        textarea2: 'test textarea 2',
        select1: '1',
        select2: '3',
        'radio-group-1': 'radio1',
        'radio-group-2': 'radio3',
        checkbox1: false,
        checkbox2: true,
        number1: 40,
        number2: 10,
      },
    })

    fireEvent.click(screen.getByTestId('reset'))

    fireEvent.click(screen.getByTestId('submit'))

    expect(payload!).toStrictEqual(initialPayload)
  })
})
