import { Plus } from "lucide-react"
import { Button } from "../ui/button"

const AddRowButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full my-1" onClick={() => { editor.chain().focus().addRowAfter().run() }}><Plus />{"  "}Add Row</Button>
    )
}
const AddColButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full mb-1" onClick={() => { editor.chain().focus().addColumnAfter().run() }}><Plus />{"  "}Add Column</Button>
    )
}
const RemoveRowButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full mb-1" onClick={() => { editor.chain().focus().deleteRow().run() }}><Plus />{"  "}Add Column</Button>
    )
}
const RemoveColButton = ({ editor }: { editor: any }) => {
    return (
        <Button variant="outline" className="w-full" onClick={() => editor.chain().focus().deleteColumn().run()}><Plus />{"  "}Add Column</Button>
    )
}


const TableMenu = ({ editor, top, left }: { editor: any, top: number, left: number }) => {
    return <div className={`flex flex-col items-center justify-center min-w-[250px] absolute z-50 rounded-md shadow-sm shadow-foreground p-2 dark:bg-black dark:text-white bg-black/50 `} style={{ top: `${top}px`, left: `${left}px` }}>
        <AddRowButton editor={editor} />
        <AddColButton editor={editor} />
        <RemoveRowButton editor={editor} />
        <RemoveColButton editor={editor} />
    </div>
}


export default TableMenu