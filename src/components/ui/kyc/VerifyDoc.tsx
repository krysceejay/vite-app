import '@smile_identity/smart-camera-web'
import { useEffect, useRef } from 'react';
import { uploadSmileId } from '../../../api/kyc';
import { toast } from 'react-toastify';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "smart-camera-web": any;
    }
  }
}

type VerifyDocProp = {
	country: string
	title: string
	closeModal: () => void
}

const VerifyDoc = ({country, title, closeModal}: VerifyDocProp) => {
	const ref = useRef<JSX.IntrinsicElements["smart-camera-web"]>(null)
 
    useEffect(() => {
			if (ref && ref.current) {
				ref.current.addEventListener('imagesComputed', uploadImage)
				return () => {
					ref.current?.removeEventListener('imagesComputed', uploadImage)
				}
			}
    }, [])

	const uploadImage = async (e: CustomEvent) => {
		const extraInput = {
			country,
			title
		}

		try {
			await uploadSmileId({...e.detail, ...extraInput})
			toast.success('Document uploaded successfully.')
    } catch (e) {
      console.error(e)
			toast.error('An error occurred.')
		}finally {
			closeModal()
		}
	}	

	return (
		<div>
			<smart-camera-web capture-id document-capture-modes="camera,upload" ref={ref} />
		</div>
  )
}

export default VerifyDoc