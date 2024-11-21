import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"

const AddRowButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full my-1 px-4 flex justify-between" onClick={() => { editor.chain().focus().addRowAfter().run() }}><Plus /><p className="flex-grow text-center">Add Row</p></Button>
    )
}
const AddColButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full mb-1 px-4 flex justify-between" onClick={() => { editor.chain().focus().addColumnAfter().run() }}><Plus /><p className="flex-grow text-center">Add Column</p></Button>
    )
}
const RemoveRowButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full mb-1 px-4 flex justify-between" onClick={() => { editor.chain().focus().deleteRow().run() }}><Trash /><p className="flex-grow text-center">Delete Row</p></Button>
    )
}
const RemoveColButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full px-4 flex justify-between" onClick={() => editor.chain().focus().deleteColumn().run()}><Trash /><p className="flex-grow text-center">Delete Column</p></Button>
    )
}
const DeleteTable = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full bg-red-500/50 text-white my-1 px-4 flex justify-between" onClick={() => editor.chain().focus().deleteTable().run()}><Trash /><p className="flex-grow text-center">Delete Table</p></Button>
    )
}


const TableMenu = ({ editor, top, left }: { editor: any, top: number, left: number }) => {
    return <div className={`flex flex-col items-center justify-center min-w-[250px] absolute z-50 rounded-md shadow-sm shadow-foreground p-2 dark:bg-black dark:text-white bg-black/50 `} style={{ top: `${top}px`, left: `${left+10}px` }}>
        <AddRowButton editor={editor} />
        <AddColButton editor={editor} />
        <RemoveRowButton editor={editor} />
        <RemoveColButton editor={editor} />
        <DeleteTable editor={editor}/>  
    </div>
}


export default TableMenu