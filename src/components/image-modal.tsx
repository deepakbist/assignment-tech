import { createPortal } from 'react-dom';
const ImageModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return createPortal(<div></div>, document.getElementById('dialog')!);
};
export default ImageModal;
