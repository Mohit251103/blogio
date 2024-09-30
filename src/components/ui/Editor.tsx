"use client";
import { Editor } from '@tiptap/core'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "../../prosemirror.css"
import { useEffect, useRef, useState } from 'react'
import EditorMenu from './EditorMenu';

// new Editor({
//     // bind Tiptap to `.element`
//     element: document.querySelector('.element'),
//     // register extensions
//     extensions: [Document, Paragraph, Text],
//     // set the initial content
//     content: '<p>Example Text</p>',
//     // place the cursor in the editor after initialization
//     autofocus: true,
//     // make the text editable (but that’s the default anyway)
//     editable: true,
//     // disable the loading of the default CSS (which is not much anyway)
//     injectCSS: false,
// })

const Tiptap = () => {
    const [editorState, setEditorState] = useState<string>("");
    const [menu, setMenu] = useState<Boolean>(false);
    const [initialContent, setInitialContent] = useState<string>("<p>Write / or type anything...</p>")
    const inputRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    })
    const editor = useEditor({
        extensions: [StarterKit,
            Document,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            HorizontalRule,
            Dropcursor,
            Image,
            BulletList,
            OrderedList,
            ListItem
        ],
        // content: `${initialContent}`,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
            transformPastedText(text) {
                return text.toUpperCase()
            },
        },
        onUpdate({ editor }) {
            setEditorState(editor.getHTML());
        }
    })

    useEffect(() => {
        // if (editorState.length>0 && initialContent!=="") {
        //     setInitialContent("")
        // }
    }, [editorState])

    if (!editor) {
        return <></>
    }

    const addImage = () => {
        const url = "";
        editor.chain().focus().setImage({ src: url }).run()
    }

    const handleKeyCapture = (event:any) => {
        if (event.key === "/") {
            console.log(inputRef.current?.getBoundingClientRect());
            // const { top, left } = inputRef.current?.getBoundingClientRect();
            setMenu(true);
        }
        else setMenu(false);
    }

    return (
        <>
            <div className="control-group">
                <div className="button-group">
                    <button
                        onClick={() => editor!.chain().focus().toggleBlockquote().run()}
                        className={editor!.isActive('blockquote') ? 'is-active' : ''}
                    >
                        Toggle blockquote
                    </button>
                    <button
                        onClick={() => editor!.chain().focus().toggleBulletList().run()}
                        className={editor!.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Toggle bullet list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        Toggle ordered list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        Toggle code block
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        H3
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        Set horizontal rule
                    </button>
                    <button onClick={addImage}>Set image</button>


                </div>
            </div>
            {menu && <EditorMenu/>}
            <EditorContent ref={inputRef} editor={editor} className='min-w-[70vw] h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground border-none' placeholder='Write / or type anything...' onKeyDown={(e) => handleKeyCapture(e)}/>
        </>
    )
}

export default Tiptap



