import { useState } from "react";

export default function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadPDF = async () => {
    if (!file) return alert("Selecciona un archivo PDF");
    setLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(
        "https://compressor-production-4115.up.railway.app/api/compress",
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Error al comprimir el PDF");

      const blob = await response.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Hubo un error al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-600">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red">Comprimir PDF</h2>
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-600
                      hover:file:bg-blue-100"
          />
        </div>
        <button
          onClick={uploadPDF}
          className={`w-full px-4 py-2 rounded-lg text-white font-medium transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Comprimiendo..." : "Comprimir PDF"}
        </button>
        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download="compressed.pdf"
              className="text-blue-600 font-medium hover:underline"
            >
              Descargar PDF Comprimido
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

