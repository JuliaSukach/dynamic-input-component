import React, { useRef } from 'react'

const tagSuggestions = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS']

const DynamicInput = () => {
    const inputRef = useRef(null)
    return (
        <div className='p-4'>
            <div className='flex gap-2 mb-4'>
                {tagSuggestions.map(tag => (
                    <button
                        key={tag}
                        className='bg-blue-200 p-2 rounded-lg cursor-pointer'
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div
                ref={inputRef}
                className='border p-2 min-h-[50px] rounded-lg text-left'
                contentEditable={true}
                placeholder='Type or insert tags'
                style={{ whiteSpace: 'pre-wrap' }}
            >
            </div>
        </div>
    )
}

export default DynamicInput