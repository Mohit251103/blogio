"use client";
import { Heading1, Heading2, Heading3, LayoutList, ListOrdered, List, Table, Code, Quote, Minus } from 'lucide-react';
import "../../app/globals.css"
import { useEdgeStore } from '@/lib/edgestore';
import { useCallback, useEffect, useRef, useState } from 'react';

const EditorMenu = ({ editor }: { editor: any }) => {

    // const [url, setUrl] = useState<string>("");
    const imageRef = useRef<HTMLInputElement>(null);
    const { edgestore } = useEdgeStore();

    // const handleImageInput = () => {
    //     console.log("handling click .. ");
    //     imageRef.current?.click();
    // }

    // useEffect(() => {
    //     if (url) {

    //     else {
    //         console.log("url not opening");
    //     }
    // }, [url]);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("inside file change .. ");
        const file = event.target.files?.[0];
        if (file) {
            try {
                console.log("trying uploading .. ");
                const res = await edgestore.publicFiles.upload({
                    file: file
                });
                editor.chain().focus().setImage({ src: res.url }).run();
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    }, [editor, edgestore.publicFiles]);

    return <div className={`w-[45vw] md:w-[20vw] h-[30vh] rounded-md bg-card text-card-foreground p-2 overflow-y-auto z-100`}>
        <p className='text-card-foreground font-bold text-xs'>Basic Blocks</p>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run() }}>
            <Heading1 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 1</p>
                <p className='text-xs text-slate-400'>Big section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 2</p>
                <p className='text-xs text-slate-400'>Medium section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 3</p>
                <p className='text-xs text-slate-400'>Small section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleTaskList().run()}>
            <LayoutList />
            <div className='mx-4 py-1'>
                <p className='text-sm'>To-do list</p>
                <p className='text-xs text-slate-400'>Track tasks with a to-do list.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor!.chain().focus().toggleBulletList().run()}>
            <List />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Bulleted list</p>
                <p className='text-xs text-slate-400'>Create a simple bulleted List</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Numbered List</p>
                <p className='text-xs text-slate-400'>List with numbering</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }>
            <Table />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Table</p>
                <p className='text-xs text-slate-400'>Add simple tabular content to your page</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <Code />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Code</p>
                <p className='text-xs text-slate-400'>Add a code block</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Quote</p>
                <p className='text-xs text-slate-400'>Add a quote</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Minus />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Divider</p>
                <p className='text-xs text-slate-400'>Visually divide a block</p>
            </div>
        </div>
        {/* <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'
            onClick={() => handleImageInput()}>
            <Image />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Image</p>
                <p className='text-xs text-slate-400'>Add an image</p>
            </div>
        </div> */}

        <input type='file' onChange={handleFileChange} onClick={(e) => e.stopPropagation()} onInput={(e) => console.log('Input event triggered', e)} ref={imageRef} accept='image/*' style={{ display: "none" }} />


    </div>
}

export default EditorMenu;