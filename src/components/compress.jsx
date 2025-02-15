import { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react"; // Importamos el icono

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
      const response = await fetch(import.meta.env.PUBLIC_API_URL, {
        method: "POST",
        body: formData,
      });

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
    <div className="flex items-center justify-center w-full p-3 ">
      <div className="p-6 bg-[#ffffff95] rounded-xl shadow-lg  w-full  md:w-96 text-center">
        {/* Contenedor del input con icono */}
        <div className="mb-4">
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-red-500 rounded-lg cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition">
            <Upload size={24} className="text-red-500 mb-2" />
            <span className="text-gray-600 font-medium">
              {file ? "Archivo seleccionado" : "Subir PDF"}
            </span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Nombre del archivo con borde rojo */}
          {file && (
            <div className="mt-2 p-2 border border-red-500 rounded text-gray-700 text-sm">
              {file.name}
            </div>
          )}
        </div>

        <Button
          onClick={uploadPDF}
          disabled={loading}
          id="cvBtn"
          className="w-full px-4 md:px-8 h-14 flex-1 text-n700 bg-primary-light dark:bg-primary-dark hover:bg-primary-hover-light dark:hover:bg-primary-hover-dark rounded-xl"
        >
          Comprimir PDF
        </Button>

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
