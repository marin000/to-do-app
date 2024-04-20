export const currentTime = () => {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export const currentDate = () => {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
}