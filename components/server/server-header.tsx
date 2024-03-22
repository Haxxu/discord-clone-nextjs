'use client';

import { MemberRole } from '@prisma/client';
import {
	ChevronDown,
	LogOut,
	PlusCircle,
	Settings,
	Trash,
	UserPlus,
	Users,
} from 'lucide-react';

import { ServerWithMembersWithProfiles } from '@/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';

interface ServerHeaderProps {
	server: ServerWithMembersWithProfiles;
	role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
	const { onOpen } = useModal();

	const isAdmin = role === MemberRole.ADMIN;
	const isModerator = isAdmin || MemberRole.MODERATOR;

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none" asChild>
					<button className="flex items-center w-full h-12 px-3 font-semibold transition border-b-2 text-md border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
						{server.name}
						<ChevronDown className="w-5 h-5 ml-auto" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
					{isModerator && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
							onClick={() => onOpen('invite', { server })}
						>
							Invite People
							<UserPlus className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isAdmin && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
							onClick={() => onOpen('editServer', { server })}
						>
							Server Settings
							<Settings className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isAdmin && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
							onClick={() => onOpen('members', { server })}
						>
							Manage Members
							<Users className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isModerator && (
						<DropdownMenuItem
							onClick={() => onOpen('createChannel')}
							className="px-3 py-2 text-sm cursor-pointer"
						>
							Create Channel
							<PlusCircle className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{isModerator && <DropdownMenuSeparator />}
					{isAdmin && (
						<DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500">
							Delete Server
							<Trash className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
					{!isAdmin && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer text-rose-500"
							onClick={() => onOpen('leaveServer', { server })}
						>
							Leave Server
							<LogOut className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ServerHeader;
