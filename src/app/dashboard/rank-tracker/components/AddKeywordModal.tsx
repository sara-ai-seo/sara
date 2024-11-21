import React from 'react'
import Keyword from "../../../../../public/dashboard/keyword.svg";
import { TextArea } from '@/app/component/commons/Input';
import Button from '../../components/ui/Button';

export default function AddKeywordModal() {
  return (
    <div className='flex flex-col items-center p-2 lg:p-3 gap-5'>
        <Keyword />
        <h1 className='text-xl font-semibold'>Add Keyword(s) </h1>
        <div className="flex gap-2 flex-col items-end">
        <TextArea />
            <Button variant={'secondary'} className='border'> Clear </Button>
        </div>
        <div className="flex justify-between items-center w-full px-8">
            <Button variant={'link'} className='border'> Cancel </Button>
            <Button variant={'primary'}>  Add Keyword(s) </Button>
        </div>

    </div>
  )
}
