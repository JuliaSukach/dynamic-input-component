import React from 'react'

const tagSuggestions = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS']

const DynamicInput = () => {  
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
        </div>
    )
}

export default DynamicInput