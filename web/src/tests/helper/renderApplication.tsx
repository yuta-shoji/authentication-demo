import {act, ReactElement} from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

export default async function renderApplication(
    ui: ReactElement
): Promise<(ui: ReactElement) => void> {
    let rerender: (ui: ReactElement) => void
    await act(async () => {
        rerender = render(ui).rerender
    })
    return rerender!
}

export async function renderApplicationInMemoryRouter(
    ui: ReactElement,
    path: string = '/'
): Promise<(ui: ReactElement) => void> {
    let rerender: (ui: ReactElement) => void
    await act(async () => {
        rerender = render(
            <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
        ).rerender
    })
    return rerender!
}