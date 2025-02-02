import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdOutlineDeleteOutline } from "react-icons/md";

interface DeleteProps {
    project: string;
    projectId: number;
    handleDelete: (id: number) => void;
}
function DeleteProject({
    handleDelete, project, projectId
}: DeleteProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex items-center rounded-full p-2  hover:bg-gray-200 justify-self-end"
                title={`Delete`}
                
            >

                <MdOutlineDeleteOutline className=' group-hover:text-primary' />

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{`Are you sure you want to delete ${project}?`} </AlertDialogTitle>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(projectId)} className="bg-primary text-white hover:border-primary hover:bg-white hover:text-primary hover:border">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProject