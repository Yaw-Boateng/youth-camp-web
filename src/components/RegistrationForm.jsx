import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function RegistrationForm() {
  // NOTE: This navigate function is a placeholder.
  // It would normally be imported from your project's routing setup.
  const useNavigate = () => (path) => console.log(`Navigating to ${path}`);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    birthMonth: "",
    birthDate: "",
    age: "",
    gender: "",
    branchName: "",
    contactNumber: "",
    emergencyContact: "",
    specialNeeds: "",
    parentGuardianName: "",
    parentGuardianContact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!currentUser) {
        toast.error("You must be logged in to register a participant.");
        setLoading(false);
        return;
      }

      // 1. Create a reference to the 'participants' collection
      const participantsRef = collection(db, "participants");

      // 2. Create a query to check for an existing document with the same full name, birth month, and birth date
      const q = query(
        participantsRef,
        where("fullName", "==", formData.fullName),
        where("birthMonth", "==", formData.birthMonth),
        where("birthDate", "==", formData.birthDate)
      );

      // 3. Execute the query
      const querySnapshot = await getDocs(q);

      // 4. Check if any documents were found
      if (!querySnapshot.empty) {
        // A duplicate was found
        toast.error(
          `${formData.fullName} is already registered. Please check the participant list.`
        );
        setLoading(false);
        return; // Stop the function here
      }

      // 5. If no duplicates are found, proceed with adding the new document
      await addDoc(participantsRef, {
        ...formData,
        registeredAt: serverTimestamp(),
        registeredBy: currentUser.uid,
      });

      // Show success message and reset form
      toast.success(`${formData.fullName} has been successfully registered!`);
      setFormData({
        fullName: "",
        birthMonth: "",
        birthDate: "",
        age: "",
        gender: "",
        branchName: "",
        contactNumber: "",
        emergencyContact: "",
        parentGuardianName: "",
        parentGuardianContact: "",
        specialNeeds: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`Registration failed. Please try again.
      Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setFormData({
      fullName: "",
      birthMonth: "",
      birthDate: "",
      age: "",
      gender: "",
      branchName: "",
      contactNumber: "",
      emergencyContact: "",
      parentGuardianName: "",
      parentGuardianContact: "",
      specialNeeds: "",
    });
    toast.success(`Form has been successfully cleared!`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 font-[Inter]">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
            Register a Participant
          </h1>
          <p className="mt-2 text-gray-300 drop-shadow-sm">
            Youth Camp 2025 - September 24th-28th
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/20">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 lg:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter participant's full name"
                />
              </div>

              {/* Birthday */}
              <div>
                <label
                  htmlFor="birthMonth"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Birthday (Month & Day) *
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    id="birthMonth"
                    name="birthMonth"
                    required
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={handleChange}
                    className="w-1/2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    placeholder="Month"
                  />
                  <input
                    type="number"
                    id="birthDate"
                    name="birthDate"
                    required
                    min="1"
                    max="31"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-1/2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    placeholder="Day"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="10"
                  max="25"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Age"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  <option className="bg-blue-900" value="">
                    Select Gender
                  </option>
                  <option className="bg-blue-900" value="Male">
                    Male
                  </option>
                  <option className="bg-blue-900" value="Female">
                    Female
                  </option>
                </select>
              </div>

              {/* Branch Name */}
              <div>
                <label
                  htmlFor="branchName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Branch Name *
                </label>
                <input
                  type="text"
                  id="branchName"
                  name="branchName"
                  required
                  value={formData.branchName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Church branch name"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Emergency Contact *
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  required
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              {/* Parent/Guardian Name */}
              <div>
                <label
                  htmlFor="parentGuardianName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  id="parentGuardianName"
                  name="parentGuardianName"
                  required
                  value={formData.parentGuardianName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Parent or guardian's name"
                />
              </div>

              {/* Parent/Guardian Contact */}
              <div>
                <label
                  htmlFor="parentGuardianContact"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Parent/Guardian Contact *
                </label>
                <input
                  type="tel"
                  id="parentGuardianContact"
                  name="parentGuardianContact"
                  required
                  value={formData.parentGuardianContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
            </div>

            {/* Special Needs */}
            <div className="md:col-span-2">
              <label
                htmlFor="specialNeeds"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Special Needs or Medical Conditions
              </label>
              <textarea
                id="specialNeeds"
                name="specialNeeds"
                rows={3}
                value={formData.specialNeeds}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Any special dietary requirements, medical conditions, or accessibility needs..."
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={() => clearInputs()}
                className="px-6 py-3 border border-white/20 rounded-xl text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl shadow-lg text-sm font-bold text-white bg-blue-700/50 hover:bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </div>
                ) : (
                  "Register Participant"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}