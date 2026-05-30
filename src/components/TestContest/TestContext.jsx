import React, { createContext, use } from 'react';
    const AuthContext = createContext();
    export const useAuth = ()=> use(AuthContext);

const TestContext = ({children}) => {
    const rohaHatun = `roha_hatun.teacher@boston.edu`;
    const roha = `she is a university teacher`;
    const value = {roha, rohaHatun};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default TestContext;