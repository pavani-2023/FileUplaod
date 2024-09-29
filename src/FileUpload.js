
import React, { useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './FileUpload.css'
// import logoImage from './images/logo.jpeg';
import logoImage from './images/new-logo.jpg'

const FileUpload = () => {
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


  //each table each page
 
// const handleExportToPDF = async () => {
//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   for (let index = 0; index < uploadedData.length; index++) {
//     if (index > 0) {
//       // Add a new page before drawing each table except the first one
//       pdf.addPage();
//     }

//     pdf.setFontSize(12);
//     pdf.text(`Table for Row ${index + 1}`, 10, 10);

//     const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
//       Key: key,
//       Value: value,
//     }));

//     const tableOptions = {
//       body: data,
//       theme: 'plain',
//       startY: 20, // Adjust the startY value as needed
//       styles: { cellPadding: 0.5,fillColor: [255, 255, 255]  },
//       columnStyles: {
//         0: { textColor: [52, 97, 64],fontStyle: 'bold' }, 
//       },
//     };

//     const tableWidth = 150;

//     pdf.autoTable({ ...tableOptions, tableWidth });

//     const imageSrc = imageStates[index];
//     if (imageSrc) {
//       try {
//         const imgWidth = 60;
//         const imgHeight = 60;
//         const imgX = pdf.internal.pageSize.width - 120;
//         const imgY = 30; // Adjust the vertical position as needed

//         // Directly add the image to the PDF
//         pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
//       } catch (error) {
//         console.error('Error adding image to PDF:', error);
//       }
//     }

//     const lastY = pdf.previousAutoTable.finalY;
    
//     // Manually draw a line at the top of the table
//     pdf.setLineWidth(0.5);
//     pdf.line(10, 20, tableWidth + 100, 20);

//     // Manually draw a line at the bottom of the table
//     pdf.line(10, lastY, tableWidth + 100, lastY);
//   }

//   pdf.save('all_tables_data.pdf');
// };



// //present working each table in each page
// const handleExportToPDF = async () => {
//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   pdf.setFontSize(12);

//   // Add logo to the first page
//   const logoWidth = 40;
//   const logoHeight = 40;
//   const logoX = pdf.internal.pageSize.width - 180;
//   const logoY = 10;

//   pdf.addImage(logoImage, 'JPEG', logoX, logoY, logoWidth, logoHeight);

  

//   const data = Object.entries(uploadedData[0]).map(([key, value]) => ({
//     Key: key,
//     Value: value,
//   }));

//   const tableWidth = 150;

//   const tableOptions = {
//     body: data,
//     theme: 'plain',
//     startX:40,
//     startY: 70, // Adjust the startY value as needed
//     styles: { cellPadding: 0.5, fillColor: [255, 255, 255] },
//       columnStyles: {
//         0: { textColor: [52, 97, 64], fontStyle: 'bold' },
//       },
//   };

//   pdf.autoTable({ ...tableOptions, tableWidth });

//   const imageSrc = imageStates[0];
//     if (imageSrc) {
//       try {
//         const imgWidth = 60;
//         const imgHeight = 60;
//         const imgX = pdf.internal.pageSize.width - 120;
//         const imgY = 80; // Adjust the vertical position as needed

//         // Directly add the image to the PDF
//         pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
//       } catch (error) {
//         console.error('Error adding image to PDF:', error);
//       }
//     }
//   const lastY = pdf.previousAutoTable.finalY;

//   // Manually draw a line at the bottom of the table
//   pdf.setLineWidth(0.5);
//   pdf.line(10, 70, tableWidth + 100, 70);
//   pdf.line(10, lastY, tableWidth + 100, lastY);

//   // Continue with additional pages and tables as needed
//   for (let index = 1; index < uploadedData.length; index++) {
//     pdf.addPage();

//     pdf.text(`Table for Row ${index + 1}`, 60, 10); // Adjust the position as needed

//     const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
//       Key: key,
//       Value: value,
//     }));

//     const tableOptions = {
//       body: data,
//       theme: 'plain',
//       startY: 20, // Adjust the startY value as needed
//       styles: { cellPadding: 0.5, fillColor: [255, 255, 255] },
//       columnStyles: {
//         0: { textColor: [52, 97, 64], fontStyle: 'bold' },
//       },
//     };

//     // Add image or other content as needed
//     const tableWidth = 150;

//     pdf.autoTable({ ...tableOptions, tableWidth });

//     const imageSrc = imageStates[index];
//     if (imageSrc) {
//       try {
//         const imgWidth = 60;
//         const imgHeight = 60;
//         const imgX = pdf.internal.pageSize.width - 120;
//         const imgY = 30; // Adjust the vertical position as needed

//         // Directly add the image to the PDF
//         pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
//       } catch (error) {
//         console.error('Error adding image to PDF:', error);
//       }
//     }

//     const lastY = pdf.previousAutoTable.finalY;

//     // Manually draw a line at the top of the table
//     pdf.setLineWidth(0.5);
//     pdf.line(10, 20, tableWidth + 100, 20);

//     // Manually draw a line at the bottom of the table
//     pdf.line(10, lastY, tableWidth + 100, lastY);
//   }

//   pdf.save('all_tables_data.pdf');
// }




// //two tables per page calculating by jspd modify
  const handleExportToPDF = async () => {
    
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape',
    });

    // Add logo to the first page
    const logoWidth = 40;
    const logoHeight = 40;
    const logoX = pdf.internal.pageSize.width - 180;
    const logoY = 10;

    pdf.addImage(logoImage, 'JPEG', logoX, logoY, logoWidth, logoHeight);

    pdf.setFontSize(12);

    const data = Object.entries(uploadedData[0]).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    const tableWidth = 150;

    const tableOptions = {
      body: data,
      theme: 'plain',
      startX:40,
      startY: 70, // Adjust the startY value as needed
      styles: { cellPadding: 0.5, fillColor: [255, 255, 255] },
        columnStyles: {
          0: { textColor: [52, 97, 64], fontStyle: 'bold' },
        },
    };

    pdf.autoTable({ ...tableOptions, tableWidth });

    const imageSrc = imageStates[0];
      if (imageSrc) {
        try {
          const imgWidth = 60;
          const imgHeight = 60;
          const imgX = pdf.internal.pageSize.width - 120;
          const imgY = 80; // Adjust the vertical position as needed

          // Directly add the image to the PDF
          pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        } catch (error) {
          console.error('Error adding image to PDF:', error);
        }
      }
    const lastY = pdf.previousAutoTable.finalY;

    // Manually draw a line at the bottom of the table
    pdf.setLineWidth(0.5);
    pdf.line(10, 70, tableWidth + 100, 70);
    pdf.line(10, lastY, tableWidth + 100, lastY);
    
    pdf.addPage();


    

    pdf.setLineWidth(0.5);
    
  for (let index = 1; index < uploadedData.length; index++) {
    const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
        Key: key,
        Value: value,
    }));

    const tableStartY = index === 1 ? 10 : pdf.autoTable.previous.finalY + 15;

    // Draw a top border for each table
    pdf.line(10, tableStartY, 10 + 250, tableStartY);

    const imageSrc = imageStates[index];
    if (imageSrc) {
        try {
            const imgWidth = 60;
            const imgHeight = 60;
            const imgX = pdf.internal.pageSize.width - 120;
            const imgY = tableStartY + 10;
            pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        } catch (error) {
            console.error('Error adding image to PDF:', error);
        }
    }

    const tableOptions = {
        body: data,
        theme: 'plain',
        startY: tableStartY,
        styles: { cellPadding: 0.5 },
        columnStyles: {
            0: { textColor: [52, 97, 64], fontStyle: 'bold' },
        },
    };

    const tableWidth = 150;
    pdf.autoTable({ ...tableOptions, tableWidth });

    const lastY = pdf.previousAutoTable.finalY;

    // Draw a bottom border for each table
    pdf.line(10, lastY, 10 + tableWidth+100, lastY);
  }


    pdf.save('all_tables_data.pdf');
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
    <div className='file-upload'>
      
      <h1>Upload Excel File</h1>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} className="upload-input" />
        <button className='button' onClick={handleUpload}>Upload</button>
      </div>

      {uploadedData && (
        <div className="result-section">
          <button className='button export-button' onClick={handleExportToPDF}>Export to PDF</button>

          {uploadedData.map((row, index) => (
            <div key={index} className="table-container">
              <table ref={tableRef} className='vertical-table'>
                <tbody>
                  {Object.keys(row).map((key, i) => (
                    <tr key={i}>
                      <th>{key}</th>
                      <td>{row[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2" className="image-cell">
                      <div className="image-upload">
                        <input type="file" onChange={(e) => handleImageChange(e, index)} />
                        {imageStates[index] && (
                          <img src={imageStates[index]} alt={`Selected ${index + 1}`} className="uploaded-image" />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
                
              </table>
            </div>
          ))}
        </div>
      )}
  </div>


  );
};

export default FileUpload;






