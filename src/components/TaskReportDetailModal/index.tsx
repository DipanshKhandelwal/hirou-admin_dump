import * as React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Image,
  ModalBody,
  Tr,
  Tbody,
  Td,
  Table,
  Center,
} from "@chakra-ui/react"
import { ITaskReport } from "../../models/taskReport";
import './styles.css'
import { BsDownload } from "react-icons/bs";

interface TaskReportDetailModalProps {
  isOpen: boolean
  onClose: () => void
  taskReport?: ITaskReport
}

export const TaskReportDetailModal = (props: TaskReportDetailModalProps) => {
  const { isOpen, onClose, taskReport } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report Details</ModalHeader>
        <ModalBody>
          <Center>
            <div className='task-report-image-container'>
              <a href={taskReport?.image} download={`${taskReport?.id}.png`}>
                <Image
                  cursor='pointer'
                  boxSize="150px"
                  borderRadius={5}
                  objectFit="cover"
                  src={taskReport?.image ?? "https://via.placeholder.com/150"}
                  alt="image"
                />
              </a>
              {taskReport?.image &&
                <BsDownload size={32} className='task-report-image-download-icon' />}
            </div>
          </Center>
          <Table size='sm' border="1px" borderColor="blue.100" my={3}  >
            <Tbody>
              <Tr>
                <Td fontWeight='bold' >Id</Td>
                <Td>{taskReport?.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Description</Td>
                <Td>{taskReport?.description}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Report Type</Td>
                <Td>{taskReport?.report_type.name}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Timestamp</Td>
                <Td>{taskReport?.timestamp}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal >
  )
}
