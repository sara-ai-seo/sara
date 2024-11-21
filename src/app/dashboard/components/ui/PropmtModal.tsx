// import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'
// import Button from './Button';

// interface Props {
//   isOpen: boolean;
//   setIsOpen: (state: boolean)=> void;
//   title: string;
//   textDescription: string;
//   moreText?: string;
//   proceed: ()=> void;

// }
// export function PromptModal({isOpen, setIsOpen, title, textDescription, moreText, proceed}:Props) {

//   return (
//     <>
      
//     <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 bg-white rounded-2xl">
//         <span className="fixed inset-0 flex w-screen items-center justify-center p-4">
//           <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
//             <DialogTitle className="font-bold">{title} </DialogTitle>
//             <Description>{textDescription} </Description>
//             <p>{moreText} </p>
//             <span className="flex gap-4">
//               <Button onClick={() => setIsOpen(false)}>Cancel</Button>
//               <Button onClick={proceed}>Deactivate</Button>
//             </span>
//           </DialogPanel>
//         </span>
//       </Dialog>
//     </>
//   )
// }





import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export function Example() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}