import React, { useRef, useState, useEffect } from 'react'

const initialTagSuggestions = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS']

const DynamicInput = () => {
    const inputRef = useRef(null)
    const [tagSuggestions, setTagSuggestions] = useState(initialTagSuggestions)

    useEffect(() => {
        // Focus the input when the component mounts
        inputRef.current.focus()
    }, [])

    const insertTag = (tag) => {
        inputRef.current.focus()
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
    
        const tagElement = document.createElement('span')
        tagElement.className = 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-flex items-center mx-1'
        tagElement.contentEditable = 'false'
        tagElement.innerHTML = `${tag}`
    
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

    const isValidNode = (node) => {
        return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            const selection = window.getSelection()
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                const startContainer = range.startContainer
                const startOffset = range.startOffset
    
                let parentNode = startContainer
                const childNodes = parentNode.childNodes
                if (startOffset > 0 && childNodes.length) {
                    let previousNode = childNodes[startOffset - 1]
                    // Skip invalid nodes like text nodes, spaces, etc.
                    while (previousNode && !isValidNode(previousNode)) {
                        previousNode = childNodes[Array.prototype.indexOf.call(childNodes, previousNode) - 1]
                    }
                    if (previousNode && previousNode.nodeName === 'SPAN') {
                        e.preventDefault()
                        let tagText = previousNode.textContent.trim()
                        tagText = tagText.substring(0, tagText.length - 1) // Remove "x" from the tag text
                        previousNode.remove()
                        setTagSuggestions((prev) => [...prev, tagText])
                    }
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
                className='border p-2 min-h-[50px] rounded-lg text-left tag'
                contentEditable={true}
                placeholder='Type or insert tags'
                style={{ whiteSpace: 'pre-wrap' }}
                role="textbox"
            >
            </div>
        </div>
    )
}

export default DynamicInput