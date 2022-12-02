import * as React from 'react'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

function ModalBody({ body, closeButton, handleClose, className }: { body: Function, closeButton?: Boolean, handleClose: any, className?: string }) {
    return (
        <div className='absolute top-0 left-0 w-full h-full text-center bg-[rgba(0,0,0,0.5)]'>
            <div className="flex flex-col justify-center w-full h-full">
                <div className={`bg-white rounded-md m-auto p-5 w-9/12 relative ${className}`}>
                    {
                        closeButton ? (
                            <div className='text-right mb-2.5 my-[-4px]'>
                                <MdClose className='cursor-pointer w-5 h-5 m-[-4px] inline-block' onClick={handleClose} />
                            </div>
                        ) : ''
                    }
                    <div className='text-left container'>{body({ handleClose })}</div>
                </div>
            </div>
        </div>
    )
}

export default function Modal({ body, element, onClose, closeButton = true, defaultStatus = 0, className }: { element?: Function, body: Function, onClose?: Function, closeButton?: Boolean, defaultStatus?: number, className?: string }) {
    const [status, setStatus] = useState(defaultStatus)
    function handleClose() {
        if (onClose) onClose()
        setStatus(0)
    }
    function handleOpen() {
        setStatus(1)
    }
    return (
        <>
            {
                status === 1 ? <ModalBody body={body} closeButton={closeButton} handleClose={handleClose} className={className} /> : ''
            }
            {
                element ? element({ onClick: handleOpen }) : ''
            }
        </>
    )
}