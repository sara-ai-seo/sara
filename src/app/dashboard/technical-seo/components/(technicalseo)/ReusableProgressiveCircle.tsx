import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCircle } from 'react-icons/fa6';
import { RxQuestionMarkCircled } from 'react-icons/rx';

interface ProgressiveCircleProps {
    val: number;
    title: string;
    pageTitle: string;
    info?: string;
}

export const ReusableProgressiveCircle = ({ val, title, pageTitle, info }: ProgressiveCircleProps) => {
    return (
        <section className='grid gap-8'>
            <div className="grid">
                <h1 className={`text-[#101828] flex items-center font-semibold text-xl gap-4`}>
                    {pageTitle}
                   <button title={info}>
                   <RxQuestionMarkCircled />
                   </button>
                </h1>
                <hr className='mt-2' />
            </div>

            <div style={{ width: '100%', height: '100%' }}>
                <CircularProgressbarWithChildren value={val} className='' 
                styles={{
                    path: { stroke: val < 40 ? '#D92D20' : val < 70 ? '#FDB022' : '#039855' }
                }} 
                >
                    <div className="flex flex-col">
                        <p className='text-gray-600 text-center text-sm'> {title} </p>
                        <p className='text-gray-900 text-center text-5xl'> {val}% </p>
                    </div>
                </CircularProgressbarWithChildren>
            </div>

            <div className="grid gap-3">
                <div className="flex items-center space-x-2 w-full">
                    <FaCircle className='text-red-500' />
                    <p className=' font-normal'> Low</p>
                </div>
                <div className="flex items-center space-x-2 w-full">
                    <FaCircle className='text-yellow-500' />
                    <p className=' font-normal'> Moderate</p>
                </div>
                <div className="flex items-center space-x-2 w-full">
                    <FaCircle className='text-green-500' />
                    <p className=' font-normal'> High</p>
                </div>
            </div>
        </section>
    )
}
