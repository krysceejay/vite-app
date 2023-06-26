import '@smile_identity/smart-camera-web'
import { useEffect, useRef } from 'react';
import { uploadSmileId } from '../../../api/kyc';

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
}

const VerifyDoc = ({country, title}: VerifyDocProp) => {
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
			const response = await uploadSmileId({...e.detail, ...extraInput})
      console.log('response', response)
    } catch (e) {
      console.error(e)
		}
	}	

	return (
		<div>
			<smart-camera-web capture-id document-capture-modes="camera,upload" ref={ref} />
		</div>
  )
}

export default VerifyDoc