
const Loading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md">
            {/* Ambient glow background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
            </div>

            {/* Main loader container */}
            <div className="relative flex flex-col items-center gap-8">

                {/* Spinner with orbital rings */}
                <div className="relative w-24 h-24">
                    {/* Outer ring - rotating clockwise */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500/50 animate-[spin_1.2s_linear_infinite]"></div>

                    {/* Middle ring - rotating counter-clockwise */}
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-indigo-500 border-l-indigo-500/50 animate-[spin_1.8s_linear_infinite_reverse]"></div>

                    {/* Inner ring - fast rotation */}
                    <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-cyan-400 animate-[spin_0.9s_linear_infinite]"></div>

                    {/* Center core - pulsing gradient */}
                    <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse"></div>

                    {/* Orbiting particles */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)]"></div>
                    </div>
                    <div className="absolute inset-0 animate-[spin_2.5s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,1)]"></div>
                    </div>
                </div>

                {/* Text with shimmer effect */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-[0.3em] uppercase bg-gradient-to-r from-blue-400 via-white to-indigo-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]">
                        Loading
                    </h2>
                    <p className="text-xs text-slate-400/80 font-medium tracking-wider animate-pulse">
                        Please wait a moment...
                    </p>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-1.5 mt-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-500/70 animate-[bounce_1.4s_ease-in-out_infinite]"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        ></span>
                    ))}
                </div>
            </div>

            {/* Custom keyframe animations */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 50%; }
                    100% { background-position: -200% 50%; }
                }
                @keyframes bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
                    40% { transform: translateY(-8px); opacity: 1; }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); }
                    50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-pulse-slower {
                    animation: pulse-slower 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Loading;