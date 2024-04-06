import { useState } from 'react'

function HowToPopup({ variable, setVariable }: Props) {
    const [test, setTest] = useState<number>(0);
    return (
        <>
            {variable && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <button onClick={() => setVariable(false)} className='top-0 left-0 bg-black opacity-40 size-full'></button>
                    <div className='absolute w-4/5 h-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 flex flex-col items-center p-10 gap-2 z-10'>
                        <h1 className='font-mono font-extrabold text-5xl'>HOW TO PLAY</h1>
                        <div className='flex size-full'>
                            <button onClick={() => setTest((test - 1 >= 0) ? test - 1 : test)} className='font-mono text-lg border-white border-2 px-4'>{"<"}</button>
                            <div className='size-full bg-slate-400'>picture {test}</div>
                            <button onClick={() => setTest((test + 1 <= 10) ? test + 1 : test)} className='font-mono text-lg border-white border-2 px-4'>{">"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default HowToPopup