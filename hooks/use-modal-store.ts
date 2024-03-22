import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
	| 'createServer'
	| 'invite'
	| 'editServer'
	| 'members'
	| 'createChannel'
	| 'leaveServer'
	| string;

interface ModalData {
	server?: Server;
}

interface ModalStore {
	type: ModalStore | string | null;
	data: ModalData;
	isOpen: boolean;
	onOpen: (type: ModalStore | string, data?: ModalData) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ isOpen: false, type: null }),
}));
