"use client";
import { Editor } from '@tiptap/core'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "../../prosemirror.css"
import "../../app/globals.css"
import React, { useContext, useEffect, useRef, useState } from 'react'
import EditorMenu from './EditorMenu';
import { PopupContext, PopupContextType } from '@/context/popup-provider';

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

const Tiptap = ({children}:{children:React.ReactNode}) => {
    const [editorState, setEditorState] = useState<string>("");
    const { editorMenu, setEditorMenu } = useContext<PopupContextType>(PopupContext);
    const [initialContent, setInitialContent] = useState<string>("<p>Write / or type anything...</p>")
    const inputRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    })

    const [scroll, setScroll] = useState({
        xscroll: 0,
        yscroll:0
    })
    const editor = useEditor({
        extensions: [StarterKit,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            HorizontalRule,
            Dropcursor,
            Image,
            BulletList,
            OrderedList,
            ListItem,
            TaskItem.configure({
                nested: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            CodeBlock,
            Blockquote
        ],
        content: `${initialContent}`,
        autofocus: 'start',
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
        },
        immediatelyRender: false
    })

    useEffect(() => {
        const handleScroll = () => {
            // console.log('Scroll X:', window.scrollX);
            // console.log('Scroll Y:', window.scrollY);
            setScroll({
                xscroll: window.scrollX,
                yscroll: window.scrollY
            })
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const handleKeyCapture = (event: any) => {

        if (event.key === "Enter") {
            // setEditorState(editor.getText() + "<p?>Hello ... </p?>")
        }

        if (event.key === "/") {
            const { head } = editor.state.selection;
            const resolvedPos = editor.view.coordsAtPos(head);  // Get coordinates of the caret
            
            setPosition({
                top: scroll.yscroll + resolvedPos.top,
                left: scroll.xscroll + resolvedPos.left+10
            })
            setEditorMenu(true);
        }
        else setEditorMenu(false);
    }

    return (
        <>
            {/* <div className="control-group">
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
            </div> */}
            {
                editorMenu && <div className={`z-10 rounded-md bg-background text-foreground shadow-sm shadow-foreground absolute`} style={{ top: `${position.top}px`, left: `${position.left + 1}px` }}>
                    <EditorMenu editor={editor} />
                </div>
            }
            <EditorContent ref={inputRef} editor={editor} className='min-w-[70vw] overflow-x-hidden flex flex-col justify-start ' placeholder='Write / or type anything...' onKeyDown={(e) => handleKeyCapture(e)} >
                {/* {children} */}
            </EditorContent>
        </>
    )
}

export default Tiptap



