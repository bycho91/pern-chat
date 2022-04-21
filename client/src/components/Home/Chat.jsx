import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendContext } from "./Home";

const Chat = () => {
  const { friendList } = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        {friendList.map((friend) => (
          <TabPanel>{friend.username}</TabPanel>
        ))}
      </TabPanels>
    </VStack>
  ) : (
    <VStack justify="center" textAlign="center" width="100%" pt="5rem">
      <TabPanels>
        <Text fontSize="2xl">
          No conversations here. <br /> Please add friend to start chatting!
        </Text>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
