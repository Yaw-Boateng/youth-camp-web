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
  const useNavigate = () => (path) => console.log(`Navigating to ${path}`);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    branch: "",
    emergencyContact: "",
    category: "", // Teen, Sunday School, Young Adult
    birthDate: "",
    arrivalDay: "", // New field
    specialNeeds: "",
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

      const participantsRef = collection(db, "participants");

      // Query: check for existing participant with same fullName + birthDate
      const q = query(
        participantsRef,
        where("fullName", "==", formData.fullName),
        where("birthDate", "==", formData.birthDate)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error(
          `${formData.fullName} is already registered. Please check the participant list.`
        );
        setLoading(false);
        return;
      }

      await addDoc(participantsRef, {
        ...formData,
        registeredAt: serverTimestamp(),
        registeredBy: currentUser.uid,
      });

      toast.success(`${formData.fullName} has been successfully registered!`);
      setFormData({
        fullName: "",
        gender: "",
        phoneNumber: "",
        email: "",
        branch: "",
        emergencyContact: "",
        category: "",
        birthDate: "",
        arrivalDay: "",
        specialNeeds: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`Registration failed. Please try again. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setFormData({
      fullName: "",
      gender: "",
      phoneNumber: "",
      email: "",
      branch: "",
      emergencyContact: "",
      category: "",
      birthDate: "",
      arrivalDay: "",
      specialNeeds: "",
    });
    toast.success(`Form has been successfully cleared!`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 font-[Inter]">
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
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 lg:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter participant's full name"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                >
                  <option className="bg-blue-900" value="">Select Gender</option>
                  <option className="bg-blue-900" value="Male">Male</option>
                  <option className="bg-blue-900" value="Female">Female</option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                />
              </div>

              {/* Branch */}
              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-2">
                  Branch *
                </label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Church branch name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-300 mb-2">
                  Emergency Contact *
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  required
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category (Teen / Sunday School / Young Adult) *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                >
                  <option className="bg-blue-900" value="">Select Category</option>
                  <option className="bg-blue-900" value="Sunday School">Sunday School</option>
                  <option className="bg-blue-900" value="Teen">Teen</option>
                  <option className="bg-blue-900" value="Young Adult">Young Adult</option>
                </select>
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Birth Date *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                />
              </div>

              {/* Arrival Day */}
              <div>
                <label htmlFor="arrivalDay" className="block text-sm font-medium text-gray-300 mb-2">
                  Arrival Day *
                </label>
                <select
                  id="arrivalDay"
                  name="arrivalDay"
                  required
                  value={formData.arrivalDay}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                >
                  <option className="bg-blue-900" value="">Select Arrival Day</option>
                  <option className="bg-blue-900" value="Monday">Monday</option>
                  <option className="bg-blue-900" value="Tuesday">Tuesday</option>
                  <option className="bg-blue-900" value="Wednesday">Wednesday</option>
                  <option className="bg-blue-900" value="Thursday">Thursday</option>
                  <option className="bg-blue-900" value="Friday">Friday</option>
                </select>
              </div>
            </div>

            {/* Special Needs */}
            <div className="md:col-span-2">
              <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-300 mb-2">
                Special Needs or Medical Conditions
              </label>
              <textarea
                id="specialNeeds"
                name="specialNeeds"
                rows={3}
                value={formData.specialNeeds}
                onChange={handleChange}
                placeholder="Any special dietary requirements, medical conditions, or accessibility needs..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={clearInputs}
                className="px-6 py-3 border border-white/20 rounded-xl text-sm font-semibold text-white hover:bg-white/20"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl shadow-lg text-sm font-bold text-white bg-blue-700/50 hover:bg-blue-700/80 disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register Participant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
