import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Divider,
  Heading,
  HStack,
  Tab,
  TabList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import AddFriendModal from "./AddFriendModal";
import { FriendContext } from "./Home";
import { useDisclosure } from "@chakra-ui/hooks";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList} w="90%">
          {friendList.length &&
            friendList.map((friend) => (
              <HStack as={Tab} w="100%" justify="flex-start" py="1em">
                <Circle
                  background={friend.connected ? "green.700" : "red.500"}
                  w="15px"
                  h="15px"
                />
                <Text>{friend.username}</Text>
              </HStack>
            ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
