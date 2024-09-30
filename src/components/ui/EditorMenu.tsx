import { Heading1, Heading2, Heading3 } from 'lucide-react';
import "../../app/globals.css"

const EditorMenu = () => {
    return <div className="w-[35vw] md:w-[15vw] h-[30vh] rounded-md bg-card text-card-foreground p-2 overflow-y-auto absolute">
        <p className='text-card-foreground font-bold text-xs'>Basic Blocks</p>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'>
            <Heading1 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 1</p>
                <p className='text-xs text-slate-400'>Big section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'>
            <Heading2 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 2</p>
                <p className='text-xs text-slate-400'>Medium section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'>
            <Heading3 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>Heading 3</p>
                <p className='text-xs text-slate-400'>Small section heading.</p>
            </div>
        </div>
        <div className='flex items-center hover:bg-gray-500/50 hover:opacity-80 rounded-md hover:cursor-pointer p-1 text-left'>
            <Heading1 />
            <div className='mx-4 py-1'>
                <p className='text-sm'>To-do list</p>
                <p className='text-xs text-slate-400'>Track tasks with a to-do list.</p>
            </div>
        </div>

    </div>
}

export default EditorMenu;