export default function AnimatedBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Floating gradient orbs */}
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-emerald-400/30 to-cyan-400/30 blur-3xl sa-float" />
            <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-green-400/25 to-blue-500/25 blur-3xl sa-float-slow" />
            <div className="absolute -bottom-24 left-1/3 h-[22rem] w-[22rem] rounded-full bg-gradient-to-tr from-lime-300/25 to-emerald-500/25 blur-3xl sa-float" />

            {/* Soft animated aurora wash */}
            <div className="absolute inset-0 sa-aurora opacity-90" />

            {/* Subtle vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_50%_-20%,rgba(0,0,0,0.22),transparent_60%)] mix-blend-multiply opacity-20" />
        </div>
    )
}


