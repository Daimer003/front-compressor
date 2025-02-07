
import { useState } from "react";


export default function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadPDF = async () => {
    if (!file) return alert("Selecciona un archivo PDF");
    setLoading(true);
    setDownloadUrl(null);
    
    const formData = new FormData();
    formData.append("pdf", file);
    
    try {
      const response = await fetch("https://compressor-production-4115.up.railway.app/api/compress", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) throw new Error("Error al comprimir el PDF");
      
      const blob = await response.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-80 text-center">
      <h2 className="text-lg font-semibold mb-3">Comprimir PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-3" />
      <button 
        onClick={uploadPDF} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Comprimiendo..." : "Comprimir PDF"}
      </button>
      {downloadUrl && (
        <div className="mt-3">
          <a href={downloadUrl} download="compressed.pdf" className="text-blue-600 underline">
            Descargar PDF Comprimido
          </a>
        </div>
      )}
    </div>
  );
}
