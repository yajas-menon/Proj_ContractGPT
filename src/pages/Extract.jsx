import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle2, Download } from "lucide-react"
import Navbar from '../components/Navbar'

export default function FileUploader() {
  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(null);
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile || null)
    setFileURL(URL.createObjectURL(selectedFile));
    setResponse(null)
    setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!file) {
      setResponse('Please select a file first.')
      setStatus('error')
      return
    }

    setIsLoading(true)
    setResponse(null)
    setStatus('idle')

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Send file to FastAPI backend
      const res = await fetch('https://fastapi1-gdfbegg8dfencud4.canadacentral-01.azurewebsites.net/upload', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        throw new Error('Failed to upload file')
      }

      const data = await res.json()
      setResponse(data.response)  // Show the extracted text in the response box
      setStatus('success')
    } catch (error) {
      setResponse(`Error: ${error.message}`)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // Make a GET request to download the file
      const res = await fetch('https://fastapi1-gdfbegg8dfencud4.canadacentral-01.azurewebsites.net/download', {
        method: 'GET',
      })

      if (!res.ok) {
        throw new Error('Failed to download file')
      }

      // Create a Blob from the response and download the file
      const blob = await res.blob()
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'response.docx') // File name for download
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      setResponse(`Error: ${error.message}`)
      setStatus('error')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className='h-screen'>
    <Navbar />
    <div className="w-full h-screen mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">File Uploader</h2>
      </div>
  
      {/* Use flex to align the file upload and response box side by side */}
      <div className="flex space-x-6">
        {/* Left: File Upload */}
        <div className="w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={isLoading}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="file-upload"
              />
              <button
                type="submit"
                disabled={!file || isLoading}
                className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Uploading...' : <>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </>
                }
              </button>
            </div>
  
            {response && (
              <div
                className={`p-4 rounded-md ${
                  status === 'error' ? 'bg-red-50' : 'bg-green-50'
                } flex`}
              >
                {status === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                )}
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      status === 'error' ? 'text-red-800' : 'text-green-800'
                    }`}
                  >
                    {status === 'error' ? 'Error' : 'Success'}
                  </h3>
                </div>
              </div>
            )}
          </form>
          <div>

{fileURL && (
  <div className="mt-4">
      <iframe
        src={fileURL}
        title="Selected File"
        className="w-full h-80 border border-gray-300 rounded-md"
        />
    </div>
  )}
  </div>

          {/* Button to download the file */}
          <div className="mt-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm ${
                isDownloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDownloading ? 'Downloading...' : <>
                  <Download className="mr-2 h-4 w-4" /> Download Response
                </>
              }
            </button>
          </div>
         
        </div>
       
  
        {/* Right: Response Textarea */}
        <div className="w-1/2">
          <label
            htmlFor="response-box"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Response
          </label>
          <textarea
            id="response-box"
            placeholder="API response will appear here..."
            value={response || ''}
            readOnly
            className="block w-full h-80 p-2 border border-gray-300 rounded-md h-44 focus:ring-indigo-500 focus:border-indigo-500"
          />
          
        </div>
      </div>
    </div>
  </div>
  
  )
}
