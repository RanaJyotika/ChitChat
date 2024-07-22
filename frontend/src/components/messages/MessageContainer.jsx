import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import MobileNav from "../sidebar/MobileNav";
import { BiBookAdd } from "react-icons/bi";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] w-full flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className="flex justify-between items-center bg-slate-500">
						<div className='bg-slate-500 px-4 py-2'>
							<span className='text-white sm:text-gray-900 font-bold'>{selectedConversation.fullName}</span>
						</div>
						<div className="cursor-pointer pr-2 sm:hidden" onClick={
							() => setShowModal(!showModal)
						}><BiBookAdd size={24} color="#fff" /></div>
					</div>
					<div className="h-[80vh] overflow-auto">
						<Messages />
					</div>
					<MessageInput />
					{showModal && <MobileNav className={'absolute'} showModal={showModal} setShowModal={setShowModal} />}
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className="">
			<div className='max-sm:hidden backdrop:flex items-center justify-center w-full h-full'>
				<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
					<p>Welcome 👋 {authUser.fullName} ❄</p>
					<p>Select a chat to start messaging</p>
					<TiMessages className='text-3xl md:text-6xl text-center' />
				</div>
			</div>

			<div className="sm:hidden z-50">
				<MobileNav showModal={true} />
			</div>
		</div>
	);
};

