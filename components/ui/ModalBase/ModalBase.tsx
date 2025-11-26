import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';

import { ReactNode, Dispatch, SetStateAction } from 'react';

type ModalBaseProps = {
    isOpen: boolean;
    type: "action" | "read-only"
    closeModal: Dispatch<SetStateAction<boolean>>;
    title: string;
    children: ReactNode;
    className?: string;
};


export const ModalBase = ({
    isOpen,
    closeModal,
    title,
    children,
    className,
    type,
}: ModalBaseProps) => {

    const setOpen = () => {
        closeModal(false);
    };
    return (
        <div>
            <Dialog open={isOpen} onClose={setOpen} className='relative z-10 text-center'>
                <DialogBackdrop
                    transition
                    className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
                />

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
                        <DialogPanel
                            transition
                            className={`relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center ${className ?? ''}`}
                        >
                            <div className='mt-3 text-center sm:mt-0 sm:ml-4'>
                                <DialogTitle
                                    as='h2'
                                    className='mt-3 font-semibold text-white text-3xl item text-center'
                                >
                                    {title}
                                </DialogTitle>
                                <div>
                                    {children}
                                </div>
                            </div>
                            {type === "read-only" && (
                                <div
                                    id='ModalBase-Footer'
                                    className='sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        data-autofocus
                                        onClick={setOpen}
                                        className='mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-white sm:mt-0 hover:cursor-pointer'
                                        style={{
                                            backgroundColor: '#8E9CC9',
                                            flex: 1,
                                            flexBasis: 0,
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}