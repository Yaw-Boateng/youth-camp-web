// import { useState, useEffect } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Correct imports for Firestore
// import Papa from 'papaparse'; 
// import app from '../config/firebase'; // Assuming 'app' is your initialized Firebase app

import { exportParticipantsToExcel } from "./exportparticipantstoexcel";

// export default function AdminDashboard() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const db = getFirestore(app);
//     const participantsCol = collection(db, 'participants'); // Reference the 'participants' collection

//     const fetchData = async () => {
//       try {
//         const participantsSnapshot = await getDocs(participantsCol);
//         const participantsList = participantsSnapshot.docs.map(doc => ({
//           id: doc.id, // Get the document ID
//           ...doc.data() // Get the rest of the data
//         }));
//         setData(participantsList);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDownload = () => {
//     if (data.length === 0) {
//       alert("No data to download.");
//       return;
//     }
    
//     // Papaparse can directly unparse an array of objects
//     const csv = Papa.unparse(data);

//     // Create a Blob and download the file
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "participants_data.csv");
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (isLoading) {
//     return <div className="p-8 text-center text-white bg-gray-900 min-h-screen">Loading data...</div>;
//   }

//   if (data.length === 0) {
//     return <div className="p-8 text-center text-white bg-gray-900 min-h-screen">No data available to display.</div>;
//   }
  
//   // Get headers from the first data object
//   const headers = Object.keys(data[0]);
  
//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Cloud Firestore Content</h2>
//         <button
//           onClick={handleDownload}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//         >
//           Download as Excel (CSV)
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-700">
//             <tr>
//               {headers.map(header => (
//                 <th key={header} className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
//                   {header.replace(/([A-Z])/g, ' $1').trim()}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {data.map(item => (
//               <tr key={item.id} className="hover:bg-gray-700 transition">
//                 {headers.map(header => (
//                   <td key={header} className="py-4 px-4 whitespace-nowrap text-sm font-light text-gray-300">
//                     {item[header] || ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { exportParticipantsToExcel } from "./exportExcel"; // adjust path

function AdminDashboard() {
  return (
    <div className="p-4">
      <button
        onClick={exportParticipantsToExcel}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        Download Participants (Excel)
      </button>
    </div>
  );
}

export default AdminDashboard;
