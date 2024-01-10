import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const dialog2 = dialog.current;

        if(open) {
            dialog2.showModal();
        }

        return () => dialog2.close();
    }, [open]);

    return (
        createPortal(
            <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
                {children}
            </dialog>,
            document.getElementById('modal')
        )
    );
}