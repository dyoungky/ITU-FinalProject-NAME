import React, { createContext, useContext, useState, ReactNode} from "react";

// Defines User interface
interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

// Defines the context interface with User information and methods
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Creates the new context. Either contains the AuthContextType or is undefined in case it isn't wrapped in a provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Defines interface for children props
interface Props {children: ReactNode;}

// Defines the provider which takes children af props
export const AuthProvider: React.FC<Props> = ({ children }) => {
    // Manages the state of the current user
    const [user, setUser] = useState<User | null>(null);

    // Updates the user state
    const login = (userData: User) => {
        setUser(userData);
    };

    // Sets the user state back to null
    const logout = () => {
        setUser(null);
    };

    // Returns the context
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
