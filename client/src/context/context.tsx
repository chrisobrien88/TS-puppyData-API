import React, { createContext } from 'react';

interface IPuppy {
  puppyId: Number;
  name: String;
  dob: String;
  breed: String;
  image: String;
}

interface IPuppies {
    puppies: IPuppy[];
}

export const ThemeContext = createContext<String>('light');

export const puppyId = createContext<String>('');

export const puppy = createContext<IPuppy | null>(null);

export const newPuppy = createContext<IPuppy>({puppyId: 0, name: '', dob: '', breed: '', image: ''});

export const puppies = createContext<IPuppies | null>(null);

export const message = createContext<String>('');

export const trigger = createContext<Boolean>(false);

export const puppyTrigger = createContext<Boolean>(false);



export interface ContextProps {
    state: {
        user: any;
        puppies: any[];
        addNewPuppy: boolean;
        newPuppy: {
            name: string;
            dob: string;
            breed: string;
            image: string;
        };
        editPuppy: {
            name: string;
            dob: string;
            breed: string;
            image: string;
        };
        editPuppyId: string;
        editPuppyIndex: number;
        editPuppyOpen: boolean;
        editPuppyError: boolean;
        editPuppySuccess: boolean;
        deletePuppyId: string;
        deletePuppyIndex: number;
        deletePuppyOpen: boolean;
        deletePuppyError: boolean;
        deletePuppySuccess: boolean;
        addNewPuppyError: boolean;
        addNewPuppySuccess: boolean;
        addNewPuppyLoading: boolean;
        editPuppyLoading: boolean;
        deletePuppyLoading: boolean;
        loginError: boolean;
        loginLoading: boolean;
        loginSuccess: boolean;
        registerError: boolean;
        registerLoading: boolean;
        registerSuccess: boolean;
        logoutError: boolean;
        logoutLoading: boolean;
        logoutSuccess: boolean;
        login: (email: string, password: string) => void;
        register: (email: string, password: string) => void;
        logout: () => void;
        setAddNewPuppy: (value: boolean) => void;
        setNewPuppy: (value: any) => void;
        postNewPuppy: (value: any) => void;
        setEditPuppy: (value: any) => void;
        setEditPuppyId: (value: string) => void;
        setEditPuppyIndex: (value: number) => void;
        setEditPuppyOpen: (value: boolean) => void;
        setEditPuppyError: (value: string) => void;
        setEditPuppySuccess: (value: string) => void;
        setDeletePuppyId: (value: string) => void;
        setDeletePuppyIndex: (value: number) => void;
        setDeletePuppyOpen: (value: boolean) => void;
        setDeletePuppyError: (value: string) => void;
        setDeletePuppySuccess: (value: string) => void;
        setAddNewPuppyError: (value: string) => void;
        setAddNewPuppySuccess: (value: string) => void;
        setAddNewPuppyLoading: (value: boolean) => void;
        setEditPuppyLoading: (value: boolean) => void;
        setDeletePuppyLoading: (value: boolean) => void;
        setLoginError: (value: string) => void;
        setLoginLoading: (value: boolean) => void;
        setLoginSuccess: (value: string) => void;
        setRegisterError: (value: string) => void;
        setRegisterLoading: (value: boolean) => void;
        setRegisterSuccess: (value: string) => void;
        setLogoutError: (value: string) => void;
        setLogoutLoading: (value: boolean) => void;
        setLogoutSuccess: (value: string) => void;
        setPuppies: (value: any[]) => void;
    }
}

export const Context = createContext<ContextProps>({
    state: {
        user: null,
        puppies: [],
        addNewPuppy: false,
        newPuppy: {
            name: '',
            dob: '',
            breed: '',
            image: ''
        },
        editPuppy: {
            name: '',
            dob: '',
            breed: '',
            image: ''
        },
        editPuppyId: '',
        editPuppyIndex: 0,
        editPuppyOpen: false,
        editPuppyError: false,
        editPuppySuccess: false,
        deletePuppyId: '',
        deletePuppyIndex: 0,
        deletePuppyOpen: false,
        deletePuppyError: false,
        deletePuppySuccess: false,
        addNewPuppyError: false,
        addNewPuppySuccess: false,
        addNewPuppyLoading: false,
        editPuppyLoading: false,
        deletePuppyLoading: false,
        loginError: false,
        loginLoading: false,
        loginSuccess: false,
        registerError: false,
        registerLoading: false,
        registerSuccess: false,
        logoutError: false,
        logoutLoading: false,
        logoutSuccess: false,
        login: () => {},
        register: () => {},
        logout: () => {},
        setAddNewPuppy: () => {},
        setNewPuppy: () => {},
        postNewPuppy: () => {},
        setEditPuppy: () => {},
        setEditPuppyId: () => {},
        setEditPuppyIndex: () => {},
        setEditPuppyOpen: () => {},
        setEditPuppyError: () => {},
        setEditPuppySuccess: () => {},
        setEditPuppyLoading: () => {},
        setDeletePuppyId: () => {},
        setDeletePuppyIndex: () => {},
        setDeletePuppyOpen: () => {},
        setDeletePuppyError: () => {},
        setDeletePuppySuccess: () => {},
        setDeletePuppyLoading: () => {},
        setAddNewPuppyError: () => {},
        setAddNewPuppySuccess: () => {},
        setAddNewPuppyLoading: () => {},
        setLoginError: () => {},
        setLoginLoading: () => {},
        setLoginSuccess: () => {},
        setRegisterError: () => {},
        setRegisterLoading: () => {},
        setRegisterSuccess: () => {},
        setLogoutError: () => {},
        setLogoutLoading: () => {},
        setLogoutSuccess: () => {},
        setPuppies: () => {},
    }
});


    