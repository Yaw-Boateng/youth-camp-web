export const validateForm = (formData) => {
  const errors = {};

  // Required field validation
  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!formData.age || formData.age < 10 || formData.age > 25) {
    errors.age = 'Age must be between 10 and 25 years';
  }

  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  if (!formData.branchName?.trim()) {
    errors.branchName = 'Branch name is required';
  }

  if (!formData.contactNumber?.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!isValidPhoneNumber(formData.contactNumber)) {
    errors.contactNumber = 'Please enter a valid phone number';
  }

  if (!formData.emergencyContact?.trim()) {
    errors.emergencyContact = 'Emergency contact is required';
  } else if (!isValidPhoneNumber(formData.emergencyContact)) {
    errors.emergencyContact = 'Please enter a valid emergency contact number';
  }

  if (!formData.parentGuardianName?.trim()) {
    errors.parentGuardianName = 'Parent/Guardian name is required';
  }

  if (!formData.parentGuardianContact?.trim()) {
    errors.parentGuardianContact = 'Parent/Guardian contact is required';
  } else if (!isValidPhoneNumber(formData.parentGuardianContact)) {
    errors.parentGuardianContact = 'Please enter a valid parent/guardian contact number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidPhoneNumber = (phone) => {
  // Basic validation for Ghana phone numbers
  const phoneRegex = /^(\+233|0)[2-9][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const formatPhoneNumber = (phone) => {
  // Format phone number for display
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('233')) {
    return `+233 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};