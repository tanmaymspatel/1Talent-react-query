import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useEffect } from 'react';

function StartupPopup() {
  const [opened, { open, close }] = useDisclosure(false);

  const isPopupSeen = JSON.parse(localStorage.getItem("isPopupSeen") as string) || 0;

  // to show the popup after 1 sec
  const showPopup = () => {
    setTimeout(() => {
      open();
    }, 1000);
  }
  // show popup for the first time
  useEffect(() => {
    if (!isPopupSeen) showPopup()
  }, [showPopup]);
  // set proprty in the local storage
  const onPopupClose = () => {
    localStorage.setItem("isPopupSeen", JSON.stringify(1))
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={onPopupClose} title="What's new!" centered>
        {/* Modal content */}
      </Modal>
    </>
  );
}

export default StartupPopup;