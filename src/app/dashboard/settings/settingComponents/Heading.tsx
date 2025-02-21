import React from 'react'
import Button from '../../components/ui/Button'

interface Props {
    title: string;
    description: string;
    handleSave: () => void;
}

export default function Heading({
    title,
    description,
    handleSave,
}: Props) {
    return (
        <div className="flex w-full justify-between items-center my-4 border-b pb-6">
            <div className="flex flex-col gap-2">
                <h2 className='text-xl font-semibold'>{title} </h2>
                <p className='text-sm text-gray-500 lg:whitespace-nowrap'>{description} </p>
            </div>
            <div className="flex gap-2 justify-end w-full">
                <Button variant='secondary'  >Cancel</Button>
                <Button onClick={handleSave}> Save changes</Button>

            </div>
            
        </div>
    )
}
