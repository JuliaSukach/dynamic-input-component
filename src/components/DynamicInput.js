import React, { useRef, useState } from 'react'

const initialTagSuggestions = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS']

const DynamicInput = () => {
    const inputRef = useRef(null)
    const [tagSuggestions, setTagSuggestions] = useState(initialTagSuggestions)

    const insertTag = (tag) => {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
    
        const tagElement = document.createElement('span')
        tagElement.className = 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-flex items-center mx-1'
        tagElement.contentEditable = 'false'
        tagElement.innerHTML = `#${tag}`
    
        const deleteButton = document.createElement('button')
        deleteButton.className = 'ml-1 text-red-500 hover:text-red-700 font-bold'
        deleteButton.innerHTML = 'x'
        deleteButton.onclick = () => {
            tagElement.remove()
            setTagSuggestions(prev => [...prev, tag])
        }
        tagElement.appendChild(deleteButton)
    
        range.insertNode(tagElement)

        range.setStartAfter(tagElement)
        range.setEndAfter(tagElement)
        selection.removeAllRanges()
        selection.addRange(range)
    
        inputRef.current.focus()
        setTagSuggestions(prev => prev.filter(suggestion => suggestion !== tag))
    }


    const handleKeyDown = (e) => {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        if (e.key === 'Backspace') {
            const currentNode = range.startContainer
            if (currentNode.nodeType === Node.TEXT_NODE) {
                const parentNode = currentNode.parentNode
                if (parentNode && parentNode.className.includes('rounded-full')) {
                    e.preventDefault()
                    const tagText = parentNode.textContent.trim().substring(1)
                    parentNode.remove()
                    setTagSuggestions(prev => [...prev, tagText])
                }
            }
        }
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
                onKeyDown={handleKeyDown}
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