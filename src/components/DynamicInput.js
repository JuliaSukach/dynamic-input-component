import React, { useRef } from 'react'

const tagSuggestions = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS']

const DynamicInput = () => {
    const inputRef = useRef(null)

    const insertTag = (tag) => {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
    
        const tagElement = document.createElement('span')
        tagElement.className = 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-flex items-center mx-1'
        tagElement.contentEditable = 'false'
        tagElement.innerHTML = `#${tag} <button class='ml-1 text-red-500 hover:text-red-700 font-bold' onclick='this.parentNode.remove()'>x</button>`
    
        range.insertNode(tagElement)

        range.setStartAfter(tagElement)
        range.setEndAfter(tagElement)
        selection.removeAllRanges()
        selection.addRange(range)
    
        inputRef.current.focus()
    }
    return (
        <div className='p-4'>
            <div className='flex gap-2 mb-4'>
                {tagSuggestions.map(tag => (
                    <button
                        key={tag}
                        className='bg-blue-200 p-2 rounded-lg cursor-pointer'
                        onClick={() => insertTag(tag)}
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