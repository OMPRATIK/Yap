import { useChartStore } from "../store/useChatStore";

function Chat() {
  const { setSelectedUser, selectedUser } = useChartStore();

  return <div>{selectedUser.email}</div>;
}

export default Chat;
