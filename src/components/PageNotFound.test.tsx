import { render, screen } from '@testing-library/react'
import PageNotFound from './PageNotFound'
import { MemoryRouter } from 'react-router-dom'


describe('page-not-found page',()=>{
    describe('should contain text - Page Not Found',()=>{
        test('checking',()=>{
            render(
                <MemoryRouter>
                    <PageNotFound />
                </MemoryRouter>
            )
            const heading = screen.getByText(/404/i)
            expect(heading).toBeDefined()
        })
    })
})