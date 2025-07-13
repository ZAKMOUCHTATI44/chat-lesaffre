import axios from 'axios';

const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NDM1MDc0NTcsImV4cCI6MTc3NTA0MzQ1NywianRpIjoieWtCZG84OXZabGNoIiwiYXBwbGljYXRpb25faWQiOiIwODdlMjgzZC0zZmYwLTRiMTMtYjkyZi0wYjQ0YzAyYjUxNzAiLCJzdWIiOiIiLCJhY2wiOiIifQ.A-_L6hYD0mDVXN4HoU9tKrsMe22j-0D3hvolWT3en8au4ZPMCXXgATLj0TFP5qBPaUxdV21oDsUkxFO2N6u0P_22T4TGZ_o5_wTzyyA3oVtBHpLoO9aDgkWL35QizhF90PDWPVpNLzogKMwlahVS_gEVxSoZ2JWM8loGbLrAPB4beTwoEN16Q7FoPniMyvAszuyh10wji8kY79kBpV-sUN58429DJUkuZoxuRSaHiZEPh8VhfC_KS9qNk3vJhT2N1e7FBxC_qRyhBKvYqEKszFyZF4lh12TByY8hMR4hfTYO4CGk2ol1V7X4KOhUBSk7fRMbdEHhRKnj2PNqXIG48A'; // Replace with your actual Bearer token

const url = 'https://api.nexmo.com/v2/verify/templates';

const data = {
  name: 'my-template'
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${bearerToken}`
};

axios.post(url, data, { headers })
  .then(response => {
    console.log('Template created:', response.data);
  })
  .catch(error => {
    console.error('Error creating template:', error.response?.data || error.message);
  });
