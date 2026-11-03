import React from 'react'

const AuthContext = React.createContext();

const Fakeuser = {
    id: 1,
    name: "Jack Doe",
    email: "jack@example.com",
    password: "qwerty",
};

export function FakeAuthProvider({children}) {
    const [user, setUser] = React.useState(null);

    const login = (email, password) => {
        // Simulate an API call to authenticate the user
        setTimeout(() => {
            setUser(Fakeuser);
        }, 100);
    };
    const logout = () => {
        setUser(null);
    }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
