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
        <ModalHeader>report details</ModalHeader>
        <ModalBody>
          <Center>
            <Image
              cursor='pointer'
              boxSize="150px"
              objectFit="cover"
              src={taskReport?.image ?? "https://via.placeholder.com/150"}
              alt="image"
            />
          </Center>
          <Table size='sm' border="1px" borderColor="blue.100" my={3}  >
            <Tbody>
              <Tr>
                <Td fontWeight='bold' >id</Td>
                <Td>{taskReport?.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >description</Td>
                <Td>{taskReport?.description}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >report type</Td>
                <Td>{taskReport?.report_type.name}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >timestamp</Td>
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
