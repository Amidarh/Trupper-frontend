import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar24 } from '@/core/commons/components/calendar';

interface CustomModalProps {
  status: boolean
}

export function EnableExamModeModal({ status }: CustomModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="modal-toggle"
        checked={status}
        onCheckedChange={() => setIsOpen(true)}
        onChange={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className='flex justify-center items-center text-center'>
            <DialogTitle className='flex justify-center items-center text-center flex-col gap-3'>
                <Info size={50}/>
                <h2 className='text-center'>Info</h2>
            </DialogTitle>
          </DialogHeader>
        <DialogDescription className='text-center'>Note: by setting this exam mode active all users under this sub category will be mandated to take part in this exam and therefore will loose access to their dashboard until they partake in this exam or the validity of this exam elapses </DialogDescription>
        <div className='flex flex-col gap-5'>
                <Calendar24
                    label='Valid From'
                />
                <Calendar24
                    label='Valid Till'
                />
        </div>
        <div className='flex flex-row justify-between items-center'>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>Cancel</Button>
          {!status ? <Button>Set active</Button> : <Button>Set inactive</Button>}
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}