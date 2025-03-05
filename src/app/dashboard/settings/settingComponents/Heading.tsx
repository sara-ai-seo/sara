import React from 'react'
import Button from '../../components/ui/Button'

interface Props {
    title: string;
    description: string;
    handleSave: ()=> void;
    children: React.ReactNode;
    handleCancel?: () => void; 
    isLoading?: boolean;
}

export default function Heading({
    title,
    description,
    handleSave,
    children,
    handleCancel,
    isLoading
}: Props) {
    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            handleSave();
        }}>
            <div className="flex w-full justify-between items-center my-4 border-b pb-6">
            <div className="flex flex-col gap-2">
                <h2 className='text-xl font-semibold'>{title} </h2>
                <p className='text-sm text-gray-500 lg:whitespace-nowrap'>{description} </p>
            </div>
            <div className="flex gap-2 justify-end w-full">
                <Button variant='secondary' type='reset' onClick={handleCancel} >Cancel</Button>
                <Button type="submit" disabled={isLoading} > 
                    {
                        isLoading? "Submitting..." : "Save changes"
                    }
                </Button>

            </div>
            
        </div>
        <div className="transition-all duration-200 border-0 p-0">
        {
            children
        }
        </div>
        </form>
    )
}
