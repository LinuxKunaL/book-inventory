import { Button, Dialog, Flex } from "@radix-ui/themes";

type Props = {
  title: string;
  description: string;
  no: () => void;
  yes: () => void;
  yesColor: "red" | "green" | "crimson";
  yesText: string;
};

function ActionModal(props: Props) {
  return (
    <Dialog.Root defaultOpen onOpenChange={props.no}>
      <Dialog.Content
        maxWidth="350px"
        className="dark:!bg-gray-800/90 backdrop-blur-md !rounded-md border-[1px] border-gray-200 dark:border-gray-600/50 !shadow-none"
      >
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Description className="!text-gray-400" size="2" mb="4">
          {props.description}
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              size="3"
              color="gray"
              variant="soft"
              onClick={props.no}
              className="!border-none !outline-none !shadow-none"
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              variant="solid"
              size="3"
              color={props.yesColor}
              onClick={props.yes}
            >
              {props.yesText}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ActionModal;
