import { useEffect, useRef, useState } from 'react'

export default function useCounter(targetNumber, durationMs = 2000) {
    const [value, setValue] = useState(0)
    const rafRef = useRef(0)
    const startRef = useRef(0)
    const targetRef = useRef(0)

    useEffect(() => {
        const clean = () => cancelAnimationFrame(rafRef.current)
        targetRef.current = Number(String(targetNumber).replace(/[^0-9.]/g, '')) || 0
        startRef.current = 0

        const tick = (ts) => {
            if (!startRef.current) startRef.current = ts
            const elapsed = ts - startRef.current
            const progress = Math.min(elapsed / durationMs, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const next = Math.floor(targetRef.current * eased)
            setValue(next)
            if (progress < 1) rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return clean
    }, [targetNumber, durationMs])

    return value
}


