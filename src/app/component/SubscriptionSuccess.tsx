"use client"
import { Card } from '@/components/ui/card';
import React from 'react'
import { TiTick } from "react-icons/ti";
import Button from '../dashboard/components/ui/Button';
import  { useRouter} from "next/navigation";

export default function SubscriptionSuccess() {
    const router = useRouter()
    return (
        <div className="w-full rounded-md shadow-md h-full flex flex-col justify-center items-center gap-5 p-3 py-10">
            <div className="p-2 rounded-full border-green-600 border flex items-center justify-center">

                <TiTick  className='text-green-600 animate-bounce' />
                <h1 className="text-lg font-semibold text-center text-green-600">
                    Subscription Success!
                </h1>
            </div>
            <Card className='p-4 flex flex-col justify-center gap-3' >
                <h2> You have successfully subscribed for one month basic plan</h2>
                <div className="flex items-center justify-center gap-3 w-full">
                    <Button onClick={()=> router.push("/dashboard")}> Go to dashboard </Button>
                    <Button onClick={()=> router.push("/")} variant='secondary'> Go to Home</Button>
                </div>
            </Card>
        </div>
    )
}
