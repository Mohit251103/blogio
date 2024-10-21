"use client";
import BulletList from '@tiptap/extension-bullet-list'
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
import "../../app/globals.css"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import EditorMenu from './EditorMenu';
import { PopupContext, PopupContextType } from '@/context/popup-provider';
import TableMenu from './TableButton';
import axiosInstance from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { EditorContext } from '@/context/editor-context';

const useDebouncedCallback = (callback: Function, delay: number) => {
    const handler = useRef<NodeJS.Timeout>();
    return useCallback(
        (...args: any[]) => {
            clearTimeout(handler.current);
            handler.current = setTimeout(() => {
                clearTimeout(handler.current);
                callback(...args);
            }, delay);

        }, [callback, delay])
}

const Tiptap = ({ slug }: { slug: string | null }) => {
    const { data: session } = useSession();
    const { editorState, setEditorState, setDrafting, setBlogData } = useContext(EditorContext);
    const { editorMenu, setEditorMenu } = useContext<PopupContextType>(PopupContext);
    const [tableMenu, setTableMenu] = useState<boolean>(false);
    const [content, setContent] = useState({
        title: "",
        description: ""
    })
    const inputRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    })

    const [scroll, setScroll] = useState({
        xscroll: 0,
        yscroll: 0
    })

    const [selectionPos, setSelectionPos] = useState({
        top: 0,
        left: 0
    });

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
            TaskList,
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
        content: `${content.description}`,
        autofocus: 'start',
        editorProps: {
            attributes: {
                class: 'ProseMirror focus:outline-none lg:min-w-[60vw] min-w-[70vw] max-w-[70vw]',
            },
            transformPastedText(text) {
                return text.toUpperCase()
            },
        },
        onUpdate({ editor }) {
            setEditorState(editor.getHTML());
        },
        immediatelyRender: false
    });

    const getBlog = async () => {
        try {
            const res = await axiosInstance.get(`/api/blog/get?slug=${slug}`);
            setContent({ ...res.data.data, description: res.data.data.description?? '' });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlog();
    }, []);

    useEffect(() => {
        editor?.commands.setContent(content.description);
    },[content.title!=""])

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
        if (!editor?.isActive('table')) {
            setTableMenu(false);
            return;
        }
        setTableMenu(true);
        window.addEventListener('scroll', () => {
            setTableMenu(false);
        })
        const { head } = editor?.state.selection;
        const resolvedPos = editor?.view.coordsAtPos(head);
        setSelectionPos({
            top: resolvedPos.top,
            left: resolvedPos.left
        })

        return () => {
            window.removeEventListener('scroll', () => {
                setTableMenu(false);
            })
        }

    }, [editor?.isActive('table'), editorState])

    const handleUpdate = useDebouncedCallback(async () => {
        try {
            setDrafting(true);
            const res = await axiosInstance.post("/api/blog/c", { editorState, slug: slug, userId: session?.user?.id });
            console.log(res.data)
            setBlogData(res.data.data)
            setDrafting(false);
            console.log("Drafted..");
        } catch (error) {
            console.log(error);
        }
    }, 1000)

    useEffect(() => {
        if (editorState === "second") return;
        console.log(editor);
        handleUpdate();
    }, [editorState, editor])

    // const addImage = () => {
    //     const url = "";
    //     editor?.chain().focus().setImage({ src: url }).run()
    // }

    const handleKeyCapture = (event: any) => {

        if (event.key === "Enter") {
            // setEditorState(editor.getText() + "<p?>Hello ... </p?>")
        }

        if (!editor) {
            return;
        }

        console.log(editor.getText().endsWith('/'));

        if (event.key === "/" || editor.getText().endsWith("/")) {
            const { head } = editor?.state.selection;
            const resolvedPos = editor?.view.coordsAtPos(head);  // Get coordinates of the caret

            setPosition({
                top: scroll.yscroll + resolvedPos.top,
                left: scroll.xscroll + resolvedPos.left + 10
            })
            setEditorMenu(true);
        }
        else setEditorMenu(false);
    }


    if (!editor || !content.title) {
        return <div className='text-center'>Loading...</div>
    }

    return (
        <>
            {
                editorMenu && <div className={`z-10 rounded-md bg-background text-foreground shadow-sm shadow-foreground absolute`} style={{ top: `${position.top}px`, left: `${position.left + 1}px` }}>
                    <EditorMenu editor={editor} />
                </div>
            }

            {
                tableMenu && <TableMenu editor={editor} top={scroll.yscroll + selectionPos.top - 180} left={scroll.xscroll + selectionPos.left} />
            }
            <p className='text-2xl font-extrabold my-2'>{content.title}</p>
            <EditorContent ref={inputRef} editor={editor} className='min-w-[70vw] overflow-x-hidden flex flex-col justify-start' onKeyUp={(e) => handleKeyCapture(e)} >
                {/* {children} */}
            </EditorContent>
        </>
    )
}

export default Tiptap



