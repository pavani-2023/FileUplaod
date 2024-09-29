import React, { useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './FileUpload.css'
// import logoImage from './images/logo.jpeg';
import logoImages from './images/new-logo.jpg'

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

  const handleTableDataUpload = async () => {
    try {
      // Assuming uploadedData contains the entire table data, including attachments
      const response = await axios.post('http://localhost:5000/uploadTableData', uploadedData);

      console.log('Table data uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading table data:', error);
    }
  };



// // //two tables per page calculating by jspd modify
// const handleExportToPDF = async () => {
  
//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   // Add logo to the first page
//   const logoWidth = 40;
//   const logoHeight = 40;
//   const logoX = pdf.internal.pageSize.width - 180;
//   const logoY = 10;

//   pdf.addImage(logoImage, 'JPEG', logoX, logoY, logoWidth, logoHeight);

//   pdf.setFontSize(12);

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
//   // const lastY = pdf.previousAutoTable.finalY;

//   // Manually draw a line at the bottom of the table
//   // pdf.setLineWidth(0.5);
//   // pdf.line(10, 70, tableWidth + 100, 70);
//   // pdf.line(10, lastY, tableWidth + 100, lastY);
  
//   pdf.addPage();

//   for (let index = 1; index < uploadedData.length; index++) {
//        const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
//         Key: key,
//          Value: value,
//       }));

//       const tableStartY = index === 1 ? 10 : pdf.autoTable.previous.finalY + 10; // Adjust startY based on whether it's the first table or not
//       const tableEndY = pdf.autoTable.previous.finalY; // Record the final Y position after adding the table

//         const imageSrc = imageStates[index];
//         if (imageSrc) {
//             try {
//                 const imgWidth = 60;
//                 const imgHeight = 60;

//                 const imgX = pdf.internal.pageSize.width - 120; // Adjust the X position to leave space for the image beside the table

//                 // const imgY = (tableStartY < pdf.internal.pageSize.height && tableEndY < pdf.internal.pageSize.height) ? tableStartY : 20;
//                 const imgY = (tableStartY < pdf.internal.pageSize.height && tableEndY < pdf.internal.pageSize.height) ? tableStartY+15 : 15;
//                 pdf.addImage(imageSrc, 'JPEG', imgX, imgY, imgWidth, imgHeight);
//             } catch (error) {
//                 console.error('Error adding image to PDF:', error);
//             }
//         }

//         const tableOptions = {
//             body: data,
//             theme: 'plain',
//             startY: tableStartY,
//             styles: { cellPadding: 0.5 },
//         };

//         const tableWidth = 150;
//         pdf.autoTable({ ...tableOptions, tableWidth });

//         const lastY = pdf.previousAutoTable.finalY;

//         // Manually draw a line at the top of the table
//         pdf.setLineWidth(0.5);
//         if (tableStartY === pdf.autoTable.previous.finalY) {
//           // If the table is starting on a new page, don't draw the line at the top
//           pdf.line(10, 20, tableWidth + 100, 20);
//         } else {
//           // If the table is not starting on a new page, draw the line at the top

//           pdf.line(10, tableStartY , tableWidth + 100, tableStartY);
//           // pdf.autoTable({ ...tableOptions, tableWidth });
//         }
//         // pdf.line(10, tableStartY, tableWidth + 100, tableStartY);
//         // pdf.line(10, index === 1 ? 10 : pdf.autoTable.previous.finalY - 10, tableWidth + 100, index === 1 ? 10 : pdf.autoTable.previous.finalY - 10);


//         // Manually draw a line at the bottom of the table
//         pdf.line(10, lastY, tableWidth + 100, lastY);

//   }


//   pdf.save('all_tables_data.pdf');
// };

const { PDFDocument } = require('pdf-lib');

const handleExportToPDF = async () => {
  const pdfDoc = await PDFDocument.create();
  let currentPageIndex = 0;
  // Add logo to the first page
  const logoWidth = 40;
  const logoHeight = 40;
  const logoX = pdfDoc.getPage(0).getWidth() - 180;
  const logoY = pdfDoc.getPage(0).getHeight() - 50;

  const logoImage = await pdfDoc.embedJpg(logoImages); // Replace with your logo image bytes
  pdfDoc.getPage(0).drawImage(logoImage, {
    x: logoX,
    y: logoY,
    width: logoWidth,
    height: logoHeight,
  });

  const data = Object.entries(uploadedData[0]).map(([key, value]) => ({
    Key: key,
    Value: value,
  }));

  const tableWidth = 150;

  const tableOptions = {
    columnStyles: {
      0: { textColor: [52, 97, 64], fontStyle: 'bold' },
    },
  };

  const table = pdfDoc.getTable();
  table.addHeaders(data[0]);
  data.forEach((row) => table.addRow(row, tableOptions));

  const imageSrc = imageStates[0];
  if (imageSrc) {
    try {
      const imgWidth = 60;
      const imgHeight = 60;
      const imgX = pdfDoc.getPage(0).getWidth() - 120;
      const imgY = 80;

      const image = await pdfDoc.embedJpg(imageSrc); // Replace with your image source
      pdfDoc.getPage(0).drawImage(image, {
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: imgHeight,
      });
    } catch (error) {
      console.error('Error adding image to PDF:', error);
    }
  }

  pdfDoc.addPage();

  for (let index = 1; index < uploadedData.length; index++) {
    const currentPage = pdfDoc.addPage();
    currentPageIndex++;
    const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    const imageSrc = imageStates[index];
    if (imageSrc) {
      try {
        const imgWidth = 60;
        const imgHeight = 60;
        const imgX = currentPage.getWidth() - 120;
        const imgY = 80;

        const image = await pdfDoc.embedJpg(imageSrc); // Replace with your image source
        pdfDoc.getPage(index).drawImage(image, {
          x: imgX,
          y: imgY,
          width: imgWidth,
          height: imgHeight,
        });
      } catch (error) {
        console.error('Error adding image to PDF:', error);
      }
    }

    const tableOptions = {};
    const table = pdfDoc.getTable();
    table.addHeaders(data[0]);
    data.forEach((row) => table.addRow(row, tableOptions));

    // Draw lines at the top and bottom of the table
    const lastY = currentPage.getHeight() - 20;
    currentPage.drawLine({ start: { x: 10, y: 20 }, end: { x: tableWidth + 100, y: 20 } });
    currentPage.drawLine({ start: { x: 10, y: lastY }, end: { x: tableWidth + 100, y: lastY } });
  }

  const pdfBytes = await pdfDoc.save();
  // Save or send the pdfBytes as needed
};

// Example usage:
// handleExportToPDF().then(() => console.log('PDF created successfully'));

// const handleExportToPDF = async () => {
//   const pdfDoc = await PDFDocument.create();

//   // Add logo to the first page
//   const logoWidth = 40;
//   const logoHeight = 40;
//   const logoX = pdfDoc.getPage(0).getWidth() - 180;
//   const logoY = pdfDoc.getPage(0).getHeight() - 50;

//   const logoImage = await pdfDoc.embedJpg(logoImages); // Replace with your logo image bytes
//   pdfDoc.getPage(0).drawImage(logoImage, {
//     x: logoX,
//     y: logoY,
//     width: logoWidth,
//     height: logoHeight,
//   });

//   const data = Object.entries(uploadedData[0]).map(([key, value]) => ({
//     Key: key,
//     Value: value,
//   }));

//   const tableWidth = 150;

//   const tableOptions = {
//     columnStyles: {
//       0: { textColor: [52, 97, 64], fontStyle: 'bold' },
//     },
//   };

//   const table = pdfDoc.getTable();
//   table.addHeaders(data[0]);
//   data.forEach((row) => table.addRow(row, tableOptions));

//   const imageSrc = imageStates[0];
//   if (imageSrc) {
//     try {
//       const imgWidth = 60;
//       const imgHeight = 60;
//       const imgX = pdfDoc.getPage(0).getWidth() - 120;
//       const imgY = 80;

//       const image = await pdfDoc.embedJpg(imageSrc); // Replace with your image source
//       pdfDoc.getPage(0).drawImage(image, {
//         x: imgX,
//         y: imgY,
//         width: imgWidth,
//         height: imgHeight,
//       });
//     } catch (error) {
//       console.error('Error adding image to PDF:', error);
//     }
//   }

//   for (let index = 1; index < uploadedData.length; index++) {
//     const data = Object.entries(uploadedData[index]).map(([key, value]) => ({
//       Key: key,
//       Value: value,
//     }));

//     const imageSrc = imageStates[index];
//     if (imageSrc) {
//       try {
//         const imgWidth = 60;
//         const imgHeight = 60;
//         const imgX = pdfDoc.getPage(index).getWidth() - 120;
//         const imgY = 80;

//         const image = await pdfDoc.embedJpg(imageSrc); // Replace with your image source
//         pdfDoc.getPage(index).drawImage(image, {
//           x: imgX,
//           y: imgY,
//           width: imgWidth,
//           height: imgHeight,
//         });
//       } catch (error) {
//         console.error('Error adding image to PDF:', error);
//       }
//     }

//     const tableOptions = {};
//     const table = pdfDoc.getTable();
//     table.addHeaders(data[0]);
//     data.forEach((row) => table.addRow(row, tableOptions));

//     // Draw lines at the top and bottom of the table
//     const tableStartY = pdfDoc.getPage(index).getHeight() - 20;
//     const lastY = pdfDoc.getPage(index).getHeight() - 20;
//     pdfDoc.getPage(index).drawLine({ start: { x: 10, y: tableStartY }, end: { x: tableWidth + 100, y: tableStartY } });
//     pdfDoc.getPage(index).drawLine({ start: { x: 10, y: lastY }, end: { x: tableWidth + 100, y: lastY } });
//   }

//   const pdfBytes = await pdfDoc.save();
//   // Save or send the pdfBytes as needed
// };





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
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedData && (
        <div>
          <button onClick={handleTableDataUpload}>Upload Table Data</button>
          <button onClick={handleExportToPDF}>Export to PDF</button>

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

export default FileUpload;

