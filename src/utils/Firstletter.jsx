import React from 'react';

const IconWithDisplayName = ({ displayName }) => {
  const firstLetter = displayName.charAt(0);

  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 25,
        fontSize: 15
      }}
    >
      {firstLetter}
    </div>
  );
};

export default IconWithDisplayName;