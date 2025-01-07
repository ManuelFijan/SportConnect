import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface User {
	id: number;
	email: string;
	userName: string;
	firstName: string;
	lastName: string;
	userType: string;
	subscriptionPlan: string;
	mobileNumber: string;
	profilePicture: string;
}

interface AuthContextType {
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
	userEmail: string | null;
	setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	token: null,
	setToken: () => {},
	userEmail: null,
	setUserEmail: () => {},
	user: null,
	setUser: () => {},
	logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);

	const [userEmail, setUserEmail] = useState<string | null>(
		localStorage.getItem("userEmail")
	);

	const [user, setUser] = useState<User | null>(null);

    // Fetch user podataka kada su userEmail i token postojeci
	useEffect(() => {
		if (userEmail && token) {
			fetch(
				`${import.meta.env.VITE_BACKEND_API}/users/get-information/${encodeURIComponent(userEmail)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data: User) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setToken(null);
                setUserEmail(null);
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");
            });
		}
	}, [userEmail, token, import.meta.env.VITE_BACKEND_API]);

	const logout = () => {
		setToken(null);
		setUserEmail(null);
		setUser(null);
		localStorage.removeItem("token");
		localStorage.removeItem("userEmail");
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				userEmail,
				setUserEmail,
				user,
				setUser,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};