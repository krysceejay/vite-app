import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { addKycFile } from '../../../api/kyc'
import Button from '../../../components/shared/Button'
import { FormInput } from '../../../components/shared/Form'
import Modal from '../../../components/shared/Modal'
import PageTopOne from '../../../components/shared/PageTopOne'
import useKycData from '../../../hooks/useKycData'

type TKycState = {
  upload: File | null
  title: string
  document_name: string
  isModalOpen: boolean
}

export default function KYCDocuments() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<TKycState>({
    upload: null,
    document_name: '',
    title: '',
    isModalOpen: false
  })

  const { title, document_name, upload, isModalOpen } = formData

  const openModal = (t: string) => {
    setFormData(prev => ({
      ...prev,
      document_name: t,
      isModalOpen: true
    }))
  }

  const closeModal = () => {
    setFormData(prev => ({
      ...prev,
      isModalOpen: false
    }))
  }

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUploadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileList: FileList | null = e.target.files
    if (!fileList) {
      return toast.error('File does not exist.')
    }

    const file = fileList[0]
    if (file.size > 100000) {
      return toast.error('File size is too large. File size limit is 100kb')
    }

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'application/pdf'
    ) {
      return toast.error('File format is incorrect. Kindly up a pdf, jpeg, jpg or png')
    }

    setFormData(prev => ({
      ...prev,
      upload: file
    }))
  }

  const { isLoading: kycIsLoading, isError: kycIsError, data: kycData } = useKycData()

  const { isLoading: addKycIsLoading, mutate: addNewKyc } = useMutation({
    mutationFn: addKycFile,
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries(['kyc'])
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const resErrors = err.response?.data.message
        if (Array.isArray(resErrors)) {
          resErrors.forEach((er: { field: string, error: string }) => {
            toast.error(er.error.replace(/_/g, ' '))
          })
        }else {
          toast.error(resErrors)
        }
        
      } else {
        console.log('unexpected', err)
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newUpload = {
      document_name,
      title,
      file: upload
    }
    addNewKyc(newUpload)
  }

  if (kycIsLoading) return <p>Loading...</p>
  if (kycIsError) return <p>Error occurred</p>

  const poi = kycData?.find(k => k.document_name === 'Proof of Identity')
  const poa = kycData?.find(k => k.document_name === 'Proof of Address')

  return (
    <main className="flex-grow">
      <PageTopOne title="KYC Documents" hasBtn={false} link="/" />
      {isModalOpen &&
        <Modal hide={() => closeModal()}>
          <form className="w-full my-8" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium capitalize">{document_name}</h3>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="File title"
                type="text"
                name="title"
                value={title}
                onChange={handleOnchange}
                placeholder="Add file title"
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Uploaded file"
                type="file"
                accept="image/*,.pdf"
                onChange={handleUploadInput}
                required
                errorMessage="A file must be uploaded"
              />
            </div>
            <div className="mt-3">
              <Button type="submit" disabled={addKycIsLoading}>
                <div className="bg-green-color py-3 px-4 rounded-md flex items-center justify-center">
                  {addKycIsLoading &&
                    <svg className="mr-4 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  <span className="font-medium"> Upload </span>
                </div>
              </Button>
            </div>
          </form>
        </Modal>
      }
      <section className="bg-white rounded-md mt-9 py-3.5 overflow-hidden">
        <div className="p-6 sm:px-10 auto-grid">
          <div
            onClick={() => openModal('Proof of Identity')}
            className="border border-[#D7D7D7] rounded-md flex flex-col justify-center items-center px-4 py-7 bg-white cursor-pointer">
            <img src="/asset/img/securityg.png" alt="Identity Proof" className="mx-auto h-[35px] w-[30px]" />
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold">Proof of Identity</p>
              <p className="text-xs mt-2 font-light">{poi?.title}</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {poi?.status.toLowerCase() === 'verified' ?
                  <div className="bg-[#28A745] w-2 h-2 rounded-full" /> :
                  <div className="bg-[#EEB012] w-2 h-2 rounded-full" />
                }
                <h3 className="text-[10px] font-light">
                  {poi ? poi.status : 'Not uploaded'}
                </h3>
              </div>
            </div>
          </div>
          <div
            onClick={() => openModal('Proof of Address')}
            className="border border-[#D7D7D7] rounded-md flex flex-col justify-center items-center px-4 py-7 bg-white cursor-pointer">
            <img src="/asset/img/securityy.png" alt="Address Proof" className="mx-auto h-[35px] w-[30px]" />
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold">Proof of Address</p>
              <p className="text-xs mt-2 font-light">{poa?.title}</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {poa?.status.toLowerCase() === 'verified' ?
                  <div className="bg-[#28A745] w-2 h-2 rounded-full" /> :
                  <div className="bg-[#EEB012] w-2 h-2 rounded-full" />
                }
                <h3 className="text-[10px] font-light">
                  {poa ? poa.status : 'Not uploaded'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
