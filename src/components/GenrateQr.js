import { useEffect, useState } from "react";

function GenerateQr() {
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState('');
    const [size, setSize] = useState(200);
    const [qr, setQr] = useState('');

    // Async function to fetch the QR code URL
    const generateQrCode = async () => {
        setQr(`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}`);
    }

    // Changing the URL only when the user changes the input
    useEffect(() => {
        if (word) {
            generateQrCode();
        }
    }, [word, size]);

    // Updating the input word when user click generate button
    const handleClick = () => {
        setWord(temp)
    }

    return (
        <div>
            <h1>Generate QR Code</h1>
            <div className="input-box">
                <div className="gen">
                    <input type="text"
                        onChange={(e) => {setTemp(e.target.value)}}
                        placeholder="Enter text to generate QR" 
                    />

                    <button className="button"
                        onClick={handleClick}>
                        Generate
                    </button>
                </div>

                <div className="extra-feature">
                    <h3>Dimension:</h3>
                    <input type="range"
                        min="200" max="600"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="output-box">
                <img src={qr} alt=""/>
                <a href={qr} 
                    download="QRCode">
                    <button type="button">Download</button>        
                </a>
            </div>
        </div>
    );
}

export default GenerateQr; 