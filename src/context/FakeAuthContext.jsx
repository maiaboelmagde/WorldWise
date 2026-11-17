import React from 'react'

const AuthContext = React.createContext();

const initState = {
    user: null,
    userIsLoading: false,
    userError: null,
    isAuthed: false
}

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthed: true,
                userIsLoading: false
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthed: false,
                userIsLoading: false
            };
        case "LOADING":
            return {
                ...state,
                userIsLoading: true
            };
        case "ERROR":
            return {
                ...state,
                userError: action.payload,
                userIsLoading: false
            }
        default:
            throw "Unknown action From Auth Reducer";
    }

}

const Fakeuser = {
    id: 1,
    name: "Jack Doe",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

export function FakeAuthProvider({ children }) {
    const [{ user, userIsLoading, isAuthed,userError }, dispatch] = React.useReducer(reducer, initState);

    const login = (email, password) => {
        dispatch({ type: "LOADING" });
        // Simulate an API call to authenticate the user
        setTimeout(() => {
            if(Fakeuser.email === email && Fakeuser.password === password) dispatch({ type: "LOGIN", payload: Fakeuser });
            else dispatch({ type: "ERROR", payload: "Invalid Credentials" });
        }, 100);

    };
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, userIsLoading,isAuthed,userError }}>
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
