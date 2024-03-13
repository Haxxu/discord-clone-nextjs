import { create } from 'zustand';

export type ModalType = 'createServer';

interface ModalStore {
	type: ModalStore | null;
	isOpen: boolean;
	onOpen: (type: ModalStore) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	isOpen: false,
	onOpen: (type) => set({ isOpen: true, type }),
	onClose: () => set({ isOpen: false, type: null }),
}));
