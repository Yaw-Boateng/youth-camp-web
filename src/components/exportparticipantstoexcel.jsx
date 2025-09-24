import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { db } from "../config/firebase";

// Function to fetch participants and export as Excel
export const exportParticipantsToExcel = async () => {
  try {
    // 1. Fetch all docs from Firestore collection
    const querySnapshot = await getDocs(collection(db, "participants"));
    const participants = [];

    querySnapshot.forEach((doc) => {
      participants.push({ id: doc.id, ...doc.data() });
    });

    // 2. Convert JSON → worksheet
    const worksheet = XLSX.utils.json_to_sheet(participants);

    // 3. Create a new workbook & append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

    // 4. Export workbook as Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "participants.xlsx");
  } catch (error) {
    console.error("Error exporting participants: ", error);
  }
};
