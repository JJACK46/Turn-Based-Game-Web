

function CreditPopup({ variable, setVariable }: Props) {
    return (
        <>
            {variable && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <button onClick={() => setVariable(false)} className='top-0 left-0 bg-black opacity-40 size-full'></button>
                    <div className='absolute w-4/5 h-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 flex flex-col items-center p-10 gap-2 z-10'>
                        <h1 className='font-mono font-extrabold text-5xl'>Credit</h1>

                        <h1 className='font-mono font-bold text-2xl'>tester test testing 1</h1>
                        <h1 className='font-mono font-bold text-2xl'>tester test testing 2</h1>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreditPopup