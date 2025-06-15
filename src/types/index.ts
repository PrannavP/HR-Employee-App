export interface UserCredentials {
    email: string;
    password: string;
}

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Leaves: undefined;
    Logout: undefined;
    MainTabs: undefined;
    ForgotPassword: undefined;
};

export type BottomTabParamList = {
    Leaves: undefined;
    Home: undefined;
    Logout: undefined;
};