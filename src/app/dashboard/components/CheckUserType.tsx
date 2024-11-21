
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

interface Props {
    close: ()=> void;
    description?: string;
}

export default function CheckUserType({close, description}:Props) {
    const router = useRouter()
  return (
    <div className="grid gap-5">
       <div className="grid w-full gap-2">
       <h3 className=" text-lg font-semibold"> This feature is only available to paid users</h3>
       <hr/>
       <p className="">{description} </p>
       </div>

       <div className="flex items-center gap-2 w-full justify-end">
       <Button variant="cancel" onClick={close}> Cancel</Button>
       <Button onClick={()=> router.push("/pricing")}> Subscribe</Button>
       </div>
    </div>
  )
}
