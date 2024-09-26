import React from 'react';

const UserProfileCard = ({ profile, onClick }) => {
  return (
    <div className="bg-neutral-700 text-white rounded-lg p-12 m-4 w-80 shadow-lg hover:scale-105 duration-300">
      <img src={profile.image} alt={profile.name} className="rounded-full w-48 h-48 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-center">{profile.name}</h2>
      <p className="text-sm text-center mt-2">{profile.description}</p>
      
      {/* Link Button */}
      <a href={profile.link} target="_blank" rel="noopener noreferrer">
        <button className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-400 duration-300">
          User Link
        </button>
      </a>
      
      {/* View Recipes Button */}
      <button className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-400 duration-300" onClick={onClick}>
        View Recipes by {profile.name}
      </button>
    </div>
  );
};

export default UserProfileCard;
