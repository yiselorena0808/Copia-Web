import React from "react";

const FormArea: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-blue-50 rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Formulario de Área
      </h2>
      <form>
        <div className="mb-5">
          <label htmlFor="areaName" className="block text-blue-800 font-semibold mb-2">
            Nombre del Área
          </label>
          <input
            type="text"
            id="areaName"
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="areaCode" className="block text-blue-800 font-semibold mb-2">
            Nit de la empresa
          </label>
          <input
            type="text"
            id="areaCode"
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="areaDescription" className="block text-blue-800 font-semibold mb-2">
            Descripción del Área
          </label>
          <textarea
            id="areaDescription"
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Guardar Área
        </button>
      </form>
    </div>
  );
};

export default FormArea;
