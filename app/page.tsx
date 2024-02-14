'use client'
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [loder, setLoder] = useState(false);
  const [images, setImages] = useState<string[]>([])


  const query = async (data: any) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const output = URL.createObjectURL(result)
    return output;
  }
  const onClickHandler = async () => {
    try {
      setLoder(true);
      const input = { 'inputs': text }
      const result = await query(input)
      setUrl(result)
      setImages([...images, result])
    } catch (error) {
      console.log('error', error);
    }
    finally {
      setLoder(false)
    }
  }
  return (
    <>
      <div className="max-w-2xl mx-auto mt-5 ">
        <div className="block w-[710px]  gap-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mt-6 mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Next Gen Image Genrator</h5>
          <p className="font-medium text-base text-gray-700 dark:text-gray-400">Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.</p>
          <textarea onChange={(e) => setText(e.target.value)} rows={4} className="text-xl mt-5 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Prompt here..."></textarea>
          <button className="bg-green-500 text-white p-2 rounded cursor-pointer mt-5" onClick={onClickHandler}>Generate Image</button>
          {loder &&
            <div className="flex items-center justify-center">
              <button
                disabled
                type="button"
                className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Genrating...
              </button>

            </div>
          }
        </div>
        <div className="grid grid-cols-2	gap-5">
          {url && images.map((imageUrl, index) => (
            <Image key={index} src={imageUrl} alt="Generated Image" width={300} height={100} />
          ))}
        </div>
      </div>
    </>
  );
}
