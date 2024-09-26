// utils.js
const sanitizeName = (name) => {
    return name.trim().toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '_');
  };
  
  