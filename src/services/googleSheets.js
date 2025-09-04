// Google Sheets API integration
// Note: In a production environment, you would need to set up proper authentication
// with Google Sheets API and handle the integration securely

export const submitToGoogleSheets = async (participantData) => {
  try {
    // This is a placeholder for the actual Google Sheets API integration
    // You would typically use Google Apps Script or the Google Sheets API
    
    console.log('Submitting to Google Sheets:', participantData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would:
    // 1. Set up Google Sheets API credentials
    // 2. Create a service account or use OAuth
    // 3. Make actual API calls to append data to the sheet
    
    return {
      success: true,
      message: 'Participant registered successfully'
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Failed to register participant. Please try again.');
  }
};

export const getParticipants = async (branchRepEmail) => {
  try {
    // This would fetch participants for the specific branch rep
    // For now, returning mock data
    
    console.log('Fetching participants for:', branchRepEmail);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 1,
        fullName: 'John Doe',
        age: 16,
        gender: 'Male',
        branchName: 'Accra Central',
        contactNumber: '+233 20 123 4567',
        emergencyContact: '+233 24 987 6543',
        registeredAt: '2025-01-10',
        registeredBy: branchRepEmail
      }
    ];
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw new Error('Failed to load participants.');
  }
};