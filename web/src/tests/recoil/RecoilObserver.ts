import { RecoilValue, useRecoilValue } from 'recoil'
import {useEffect, useRef} from "react"

export type RecoilObserverProps<T> = {
    node: RecoilValue<T>
    onChange: (value: T) => void
}

export const RecoilObserver = <T>({ node, onChange }: RecoilObserverProps<T>) => {
    const value = useRecoilValue(node)
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            onChange(value)
        } else {
            isMounted.current = true
        }
    }, [onChange, value])

    return null
}
