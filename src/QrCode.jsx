import React, { useState } from 'react'

export const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState('');
    const [qrSize, setQrSize] = useState('150');

    async function generateQR() {
        setLoading(true);

        try{
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch(error){
            console.error("Error generating QR code ",error);
        }finally{
            setLoading(false);
        }
    }

    function downloadQR(){
        fetch(img).then((Response) => Response.blob()).then((blob)=>{
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "qr.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error downloading QR code ",error);
        });
    }

  return (
    <div className='app-container'>
        <h2>QR CODE GENERATOR</h2>
        {loading && <p>Please wait....</p>}
        {img && <img src={img} alt="" className='qr-img'/>}
        <div className='label-container'>
            <label htmlFor="dataInput" className='input-label'>
                Data for QR Code :
            </label>
            <input type="text" value={qrData} onChange={(e) => setQrData(e.target.value)} name="dataInput" id="dataInput" placeholder='Enter data for QR Code'/>
            <label htmlFor="sizeInput" className='input-label'>
                QR Size (e.g., 150) :
            </label>
            <input type="text" value={qrSize} onChange={(e) => setQrSize(e.target.value)} name="dataInput" id="dataInput" placeholder='Size for QR Image'/>
            <div className='buttons'>
                <button onClick={generateQR} disabled = {loading} type="button" className='generate-button'>Generate QR Code</button>
                <button onClick={downloadQR} type="button" className='download-button'>Download QR Code</button>
            </div>
            <p className='footer'>Made by <a href="https://www.linkedin.com/in/sanjaykumar-21csr092/">Sanjaykumar S</a></p>
        </div> 
    </div>
  )
}
