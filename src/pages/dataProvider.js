import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [collectionImages,setCollectionImages] = useState([]);
  const [onCollectionPage, setOnCollectionPage] = useState(false)

  return (
    <DataContext.Provider value={{ collectionImages,setCollectionImages, onCollectionPage, setOnCollectionPage }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;