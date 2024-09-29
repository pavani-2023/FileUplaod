
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import './FileUpload.css'
// import logoImage from './images/logo.jpeg';
import logoImage from './images/new-logo.jpg'
import { saveAs } from 'file-saver';
const rgb = require('some-library').rgb;

const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [imageStates, setImageStates] = useState([]);
  const tableRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const handleExportToPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();

      for (const row of uploadedData) {
        const page = pdfDoc.addPage();

        const { width, height } = page.getSize();
        const margin = 50;

        const tableHeight = height - 2 * margin - 20;

        const tableRows = Object.entries(row);

        const rowHeight = tableHeight / tableRows.length;

        tableRows.forEach(([key, value], rowIndex) => {
          const text = `${key}: ${value}`;

          // Reduce font size
          const fontSize = 10;

          // Draw text with reduced font size
          page.drawText(text, { x: margin, y: height - margin - 40 - rowIndex * rowHeight, fontSize });

          // Draw top border for the row
          const borderTopY = height - margin - 40 - rowIndex * rowHeight;
          page.drawLine({ start: { x: margin, y: borderTopY }, end: { x: width - margin, y: borderTopY }, color: rgb(0, 0, 0), thickness: 1 });

          // Draw bottom border for the row
          const borderBottomY = height - margin - 40 - (rowIndex + 1) * rowHeight;
          page.drawLine({ start: { x: margin, y: borderBottomY }, end: { x: width - margin, y: borderBottomY }, color: rgb(0, 0, 0), thickness: 1 });
        });
      }

      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Trigger a download of the PDF
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = 'exported-tables.pdf';
      link.click();
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };


  const handleImageChange = (event, rowIndex) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImageStates = [...imageStates];
        newImageStates[rowIndex] = e.target.result;
        setImageStates(newImageStates);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      <img src={logoImage} className="logo" style={{width:'200px'}} alt='logo'/>
      
      </div>
      
      <h1>Excel File Upload</h1>
      <input type="file"  onChange={handleFileChange} />
      <button  className='button' onClick={handleUpload}>Upload</button>


      {uploadedData && (
        <div style={{marginTop:'50px',marginLeft:'50px'}}>
          
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
             <button className='button' onClick={handleExportToPDF}>Export to PDF</button>
          </div>
          

          {uploadedData.map((row, index) => (
            <div key={index} className="table-container">
              
              <table ref={tableRef} className='table'>
                <thead>
                
                    {Object.keys(row).map((key) => (
                      <tr key={key}>
                        <td style={{fontWeight:'bold'}}>{key}</td>
                      </tr>
                    ))}
                
                </thead>
                <tbody >
                  
                    {Object.values(row).map((value, i) => (
                      <tr key={i}>
                        <td>{value}</td>
                      </tr>
                    ))}
                
                  
                </tbody>
                <table style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width:'400px'}}>
                <tr >
                    <td>
                      <input type="file" onChange={(e) => handleImageChange(e, index)} />
                      {imageStates[index] && (
                        <img src={imageStates[index]} alt={`Selected ${index + 1}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '90%' }} />
                      )}
                    </td>
                </tr>
                </table>
              </table>
            </div>
          ))} 

         
        </div>
      )}
    </div>
  );
};

export default ExcelFileUpload;






