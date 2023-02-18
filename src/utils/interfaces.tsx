import { ReactNode } from "react";

export interface BtnInterface {
    title: string;
    action: () => void;
    icon?: ReactNode;
}

export interface BlogInterface {
    _id: string;
    title: string;
    body: string;
    photo: string;
    createdAt: string;
    updatedAt: string;
    tags?: TagInterface[];
    category?: CategoryInterface;
}

export interface TagInterface {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryInterface {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}