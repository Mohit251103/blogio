'use client';

import { SingleImageDropzone } from '@/components/ui/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useContext, useState } from 'react';
import { Button } from './button';
import { ProfileContext } from '@/context/profile-context';

export function SingleImageDropzoneUsage() {
    const [file, setFile] = useState<File>();
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const { setImageUrl } = useContext(ProfileContext);
    const { edgestore } = useEdgeStore();

    return (
        <div >
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                onChange={(file) => {
                    setFile(file);
                }}
            />
            <div className={`h-2 bg-foreground transition-all duration-300 my-1 ${!progress? "hidden" : ""}`} style={{width: `${progress}%`}}></div>
            <Button
                onClick={async () => {
                    setUploading(true);
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                setProgress(progress);
                            }
                        });
                        setProgress(0);
                        setImageUrl(res.url);
                        setFile(undefined)
                        console.log(res);
                    }
                    setUploading(false);
                }}
                disabled={uploading}
            >
                {uploading? "Uploading..." : "Upload" }
            </Button>
        </div>
    );
}