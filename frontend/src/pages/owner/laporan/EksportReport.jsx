import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';

const EksportReport = () => {
  const [exportType, setExportType] = useState('transaksi');
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleExport = () => {
    alert(`Export ${exportType} sebagai ${exportFormat.toUpperCase()} - Fitur dalam pengembangan`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Export Data</h2>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Tipe Data</label>
            <select
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="transaksi">Data Transaksi</option>
              <option value="keuangan">Laporan Keuangan</option>
              <option value="penjualan">Laporan Penjualan</option>
              <option value="film">Statistik Film</option>
              <option value="studio">Statistik Studio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format Export</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setExportFormat('pdf')}
                className={`p-4 rounded-lg border-2 transition ${
                  exportFormat === 'pdf' ? 'border-red-500 bg-red-900/30' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">PDF</div>
              </button>
              <button
                onClick={() => setExportFormat('excel')}
                className={`p-4 rounded-lg border-2 transition ${
                  exportFormat === 'excel' ? 'border-red-500 bg-red-900/30' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Excel</div>
              </button>
              <button
                onClick={() => setExportFormat('csv')}
                className={`p-4 rounded-lg border-2 transition ${
                  exportFormat === 'csv' ? 'border-red-500 bg-red-900/30' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">CSV</div>
              </button>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EksportReport;
