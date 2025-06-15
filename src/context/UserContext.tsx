import { jwtDecode } from "jwt-decode";
import { createContext, useState, useContext, ReactNode } from "react";

interface User{
    emp_id: string;
    email: string;
    id: number,
    exp: number;
}

interface UserContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleSetToken = (token: string) => {
        setToken(token);
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
    };

    return (
        <UserContext.Provider value={{ user, token, setUser, setToken: handleSetToken }}>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext };