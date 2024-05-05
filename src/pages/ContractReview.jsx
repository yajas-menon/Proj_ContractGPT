import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Navbar from '../components/Navbar'

const ContractReview = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
    };
    const navigate=useNavigate();
    return (
        <div>
            <Navbar />
            
            {/* <ChevronLeftIcon className="w-5 h-5" /> */}
            <button type="button" className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mx-10 my-8" onClick={() => navigate(-1)}>
              <span>Back</span>
            </button>
          
            <div class="bg-white mx-10 my-2">
                <header class="bg-white  text-black py-4 px-6">
                    <h1 class="text-2xl font-bold">Contract Document Review</h1>
                </header>
                <main class="p-4">
                    <input type="file" id="file" onChange={handleFileUpload} />
                    <section class="mb-8">

                        <h2 class="text-lg font-semibold mb-2 mt-2">Document Preview</h2>

                        {uploadedFile && (
                            <DocViewer documents={[{ uri: URL.createObjectURL(uploadedFile) }]} pluginRenderers={DocViewerRenderers} />
                        )}
                    </section>
                    <section>
                        <h2 class="text-lg font-semibold mb-2">Comments</h2>
                        <textarea class="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300  text-black" placeholder="Add your comments here..."></textarea>
                    </section>
                    <div className="flex justify-center gap-4 mt-4">
                        <button  className='border border-slate-700 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:text-zinc-950 hover:shadow-lg'>Reject</button>
                        <button className='bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg'>Approve</button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ContractReview   