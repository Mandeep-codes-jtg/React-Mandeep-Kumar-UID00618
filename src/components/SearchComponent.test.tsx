import { fireEvent, render, screen } from "@testing-library/react";
import SearchComponent from "./SearchComponent";

describe('Search component', () => {
    test('input and button renders', ()=>{
        render(<SearchComponent onSearch={()=>{}} suggest={()=>{}}/>)
        expect(screen.getByPlaceholderText(/Search GitHub users/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /Search/i})).toBeInTheDocument()
    })

    test('empty input search', ()=>{
        const onSearchMock = jest.fn()
        render(<SearchComponent onSearch={onSearchMock} suggest={()=>{}}/>)
        const input = screen.getByPlaceholderText(/Search Github users/i)
        const button = screen.getByRole('button', {name: /Search/i})
        fireEvent.change(input, {target: {value: '   '}})
        fireEvent.click(button)
        expect(onSearchMock).not.toHaveBeenCalled()

        fireEvent.change(input, {target: {value: ''}})
        fireEvent.click(button)
        expect(onSearchMock).not.toHaveBeenCalled()
    })

    test('full input search', ()=>{
        const onSearchMock = jest.fn()
        render(<SearchComponent onSearch={onSearchMock} suggest={()=>{}}/>)
        const input = screen.getByPlaceholderText(/Search Github users/i)
        const button = screen.getByRole('button', {name: /Search/i})
        fireEvent.change(input, {target: {value: 'hello'}})
        fireEvent.click(button)
        expect(onSearchMock).toHaveBeenCalled()
    })

    test('trimmed query search',()=>{
        const onSearchMock = jest.fn()
        render(<SearchComponent onSearch={onSearchMock} suggest={()=>{}}/>)
        const input = screen.getByPlaceholderText(/Search Github users/i)
        const button = screen.getByRole('button', {name: /Search/i})
        fireEvent.change(input, {target: {value: '   hello '}})
        fireEvent.click(button)
        expect(onSearchMock).toHaveBeenCalledWith('hello')
    })
})
