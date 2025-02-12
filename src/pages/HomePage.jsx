import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import reformat from '../functions/reformat'

const HomePage = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const onSubmit = (e) => {
    e.preventDefault()

    // Generate output.
    setOutput(reformat(input))

    // Pop modal.
    onOpen()
  }

  const onCopy = () => {
    navigator.clipboard.writeText(output)

    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 4500,
      isClosable: true,
    })
  }

  return (
    <Box m={4}>
      <VStack alignContent='center' m={4}>
        <Heading mb={4} textAlign='center'>
          ManaBox Export Helper
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>ManaBox Decklist</FormLabel>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ fontFamily: 'Consolas' }}
              width='350px'
            />
            <FormErrorMessage>Decklist cannot be blank.</FormErrorMessage>
          </FormControl>

          <Button type='submit' colorScheme='blue'>
            Reformat
          </Button>
        </form>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reformatted Decklist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea isDisabled={true} value={output} height='50vh' />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme='blue' onClick={onCopy}>
              <CopyIcon mr={2} />
              Copy to Clipboard
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default HomePage
