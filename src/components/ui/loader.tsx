import { LoaderCircle } from "lucide-react"

const Loader = () => {
    return <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin"></LoaderCircle>
    </div>
}

export default Loader;