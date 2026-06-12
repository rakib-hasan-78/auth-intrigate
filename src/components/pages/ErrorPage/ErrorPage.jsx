import React from 'react';
import { useNavigate } from 'react-router';


const ErrorPage = () => {
    const returnPrevious = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg opacity-70">Page not found</p>

      <button onClick={()=>returnPrevious(-1)} className="btn btn-primary">
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;