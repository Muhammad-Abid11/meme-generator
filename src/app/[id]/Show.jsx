"use client"
import React, { useState } from 'react'

export default function Show({ singleProduct }) {
    // console.log("Hi Details", singleProduct)

    const user = process.env.NEXT_PUBLIC_SECRET_UNAME;
    const pass = process.env.NEXT_PUBLIC_SECRET_UPASS;
    // console.log("Hi user and pass", user, pass)

    const [textOne, setTextOne] = useState('');
    const [textTwo, setTextTwo] = useState('');
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [updateMeme, setUpdateMeme] = useState("")

    const handleTextOneChange = (event) => {
        setTextOne(event.target.value);
    };

    const handleTextTwoChange = (event) => {
        setTextTwo(event.target.value);
    };

    const handleGenerateMeme = async () => {
        if (textOne && textTwo) {
            // console.log('Generating meme with Text One:', textOne, 'and Text Two:', textTwo);
            const postAPI = `https://api.imgflip.com/caption_image?template_id=${singleProduct.id}&username=${user}&password=${pass}&text0=${textOne}&text1=${textTwo}`
            const res = await fetch(postAPI)
            const result = await res.json()
            console.log("result--->", result)
            setUpdateMeme(result.data.url)
            setTextOne("");
            setTextTwo("");

            setDownloadDisabled(false);


        } else {
            // One or both input fields are empty, show alert
            alert('Please fill both input fields.');
        }
    };

    const handleDownloadMeme = async () => {
        if (updateMeme) {
            try {
                // Fetch the image data
                const response = await fetch(updateMeme);
                const blob = await response.blob();

                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'meme.jpg');

                // Simulate click on the link to trigger download
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);

                setDownloadDisabled(true);
            } catch (error) {
                console.error('Error downloading meme:', error);
                setDownloadDisabled(true);
            }
        }
    };


    return (
        <>
            <div>
                <h1 className='text-center my-11 text-4xl'>Edit</h1>

                <section class="text-gray-600 body-font">
                    <div class="container  mx-auto">
                        <div class="flex flex-wrap text-center lg:w-2/3 m-auto ">

                            <div class="lg:w-1/2 bg-current sm:w-1/2 mb-10 px-4 ">
                                <div class=" h-80 overflow-hidden ">
                                    <img alt="content" class=" object-contain  object-center h-full w-full" src={singleProduct.url} />
                                </div>
                            </div>

                            <div class="lg:w-1/2 bg-slate-200 sm:w-1/2 m-auto px-4 ">
                                <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">{singleProduct.name}</h2>

                                <input
                                    required
                                    type="text"
                                    name="text-one"
                                    placeholder='Enter Text One'
                                    className='p-2 rounded'
                                    value={textOne}
                                    onChange={handleTextOneChange}
                                />
                                <br />
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="text-two"
                                    placeholder='Enter Text Two'
                                    className='p-2 rounded'
                                    value={textTwo}
                                    onChange={handleTextTwoChange}
                                />
                                <button
                                    className="flex mx-auto my-8  text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
                                    onClick={handleGenerateMeme}
                                >
                                    Generate Meme
                                </button>

                                <button type="button" class="flex mx-auto my-8 px-8 py-3 text-white bg-blue-300 rounded focus:outline-none"
                                    disabled={downloadDisabled}
                                    onClick={handleDownloadMeme}
                                    style={{ backgroundColor: downloadDisabled ? "pink" : "blue" }}
                                >Download
                                </button>




                                <a
                                    href={updateMeme}
                                    // download="meme.png"
                                    download
                                    // target="_blank"
                                    rel={updateMeme}
                                >
                                    <button>Download Meme</button>
                                </a>
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}