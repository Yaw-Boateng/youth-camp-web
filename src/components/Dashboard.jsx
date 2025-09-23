// Dashboard.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingParticipant, setEditingParticipant] = useState(null);

  // You can set the camp date here
  const campDate = new Date("2025-09-24T00:00:00").getTime();
  const [daysLeft, setDaysLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = campDate - now;

      if (distance > 0) {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setDaysLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        clearInterval(interval);
        setDaysLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [campDate]);

  // Fetch participants registered by the current user
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const q = query(
          collection(db, "participants"),
          where("registeredBy", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedParticipants = [];
        querySnapshot.forEach((doc) => {
          fetchedParticipants.push({ id: doc.id, ...doc.data() });
        });
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error("Error fetching participants: ", error);
        toast.error("Failed to load participants.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [currentUser]); // Re-run effect if the user changes

  // Handle changes in the edit modal form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingParticipant({ ...editingParticipant, [name]: value });
  };

  // Save the edited participant data to Firestore
  const handleSaveEdit = async () => {
    if (!editingParticipant || !editingParticipant.id) return;

    try {
      setLoading(true);
      const participantRef = doc(db, "participants", editingParticipant.id);
      await updateDoc(participantRef, {
        fullName: editingParticipant.fullName,
        gender: editingParticipant.gender,
        phoneNumber: editingParticipant.phoneNumber,
        email: editingParticipant.email,
        branch: editingParticipant.branch,
        emergencyContact: editingParticipant.emergencyContact,
        category: editingParticipant.category,
        birthDate: editingParticipant.birthDate, // full date string
        arrivalDay: editingParticipant.arrivalDay,
        specialNeeds: editingParticipant.specialNeeds,
      });

      // Update local state with the new data
      setParticipants(
        participants.map((p) =>
          p.id === editingParticipant.id ? editingParticipant : p
        )
      );

      toast.success("Participant details updated successfully!");
      setEditingParticipant(null); // Close the modal
    } catch (error) {
      console.error("Error updating participant: ", error);
      toast.error("Failed to update participant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel the edit and close the modal
  const handleCancelEdit = () => {
    setEditingParticipant(null);
  };

  // The rest of the JSX remains the same as your original code...
  // ... (JSX for the dashboard layout, stats cards, and table)

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 overflow-hidden font-[Inter]">
      {/* Script tag should be in index.html, not here */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-7xl mx-auto py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* My Registered Card */}
          <div className="bg-white/10 backdrop-blur-md overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-white drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-300">
                    My Participants
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-white">
                    {participants.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Days Until Camp Card */}
          <div className="bg-white/10 backdrop-blur-md overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-white drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-300">
                    Days Until Camp
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-white">
                    {`${daysLeft.days}d ${daysLeft.hours}h ${daysLeft.minutes}m ${daysLeft.seconds}s`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Status Card */}
          <div className="bg-white/10 backdrop-blur-md overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-green-400 drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-300">
                    Registration Status
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-green-400">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-white/20">
          <div className="px-6 py-5 border-b border-white/20">
            <h3 className="text-lg font-bold text-white">
              My Registered Participants
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Manage the participants you have registered
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading participants...</p>
            </div>
          ) : participants.length === 0 ? (
            <div className="text-center py-12 text-white">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">
                You have not registered any participants yet.
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Get started by registering your first participant.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center px-6 py-3 border-2 border-white/20 shadow-sm text-sm font-semibold rounded-xl text-white bg-blue-700/50 hover:bg-blue-700/80 transition-all duration-300 backdrop-blur-sm"
                >
                  Register Participant
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/10 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Age & Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-white/10 text-white">
                  {participants.map((participant) => (
                    <tr
                      key={participant.id}
                      className="hover:bg-white/20 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-sm">
                              {participant.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {participant.fullName}
                            </div>
                            <div className="text-xs text-gray-300">
                              {participant.branchName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{participant.age} years</div>
                        <div className="text-xs text-gray-300">
                          {participant.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {participant.contactNumber}
                        </div>
                        <div className="text-xs text-gray-300">
                          Emergency: {participant.emergencyContact}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {participant.registeredAt &&
                          new Date(
                            participant.registeredAt.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingParticipant(participant)}
                          className="text-blue-400 hover:text-blue-200 transition-colors duration-150"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Participant Modal */}
      {editingParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Participant
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editingParticipant.fullName}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={editingParticipant.gender}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editingParticipant.phoneNumber}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editingParticipant.email}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={editingParticipant.branch}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={editingParticipant.emergencyContact}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={editingParticipant.category}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="Sunday School">Sunday School</option>
                  <option value="Teen">Teen</option>
                  <option value="Young Adult">Young Adult</option>
                </select>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={editingParticipant.birthDate}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Arrival Day */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Arrival Day
                </label>
                <input
                  type="date"
                  name="arrivalDay"
                  value={editingParticipant.arrivalDay}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Special Needs */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Special Needs / Medical Conditions
                </label>
                <textarea
                  name="specialNeeds"
                  rows="3"
                  value={editingParticipant.specialNeeds}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
