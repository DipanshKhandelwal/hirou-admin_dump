import * as React from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td, HStack, Heading, Button, useToast
} from "@chakra-ui/react"
import { useState } from "react"
import { ITaskAmount } from "../../models/taskAmount"
import { TaskAmountDetailModal } from "../TaskAmountDetailModal"
import { ITaskAmountItem } from "../../models/taskAmountItem"
import { TaskAmountDeleteConfirmationModal } from "./components/TaskAmountDeleteConfirmationModal"
import { AddAmountModal } from "./components/AddAmountModal"
import { handleFetchUpdatedTaskRoute } from "../../store/thunks/TaskRoute"
import { deleteTaskAmount } from "../../services/apiRequests/taskAmounts"
import { ITaskRoute } from "../../models/taskRoute"

const TaskAmountItemTable = ({ taskAmountItems }: { taskAmountItems: Array<ITaskAmountItem> }) => {
  return (
    <Table size="sm"  >
      <Thead>
        <Tr>
          <Th>S No.</Th>
          <Th>Id</Th>
          <Th>Garbage</Th>
          <Th>Gross Weight</Th>
          <Th>Vehicle Weight</Th>
          <Th>Net Weight</Th>
        </Tr>
      </Thead>
      <Tbody >
        {taskAmountItems?.map((taskAmountItem: ITaskAmountItem, idx: number) => (
          <Tr
            key={taskAmountItem.id}
            _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
          >
            <Td>{idx + 1}</Td>
            <Td>{taskAmountItem.id}</Td>
            <Td>{taskAmountItem.garbage.name}</Td>
            <Td>{taskAmountItem.gross_weight}</Td>
            <Td>{taskAmountItem.vehicle_weight}</Td>
            <Td>{taskAmountItem.net_weight}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export const TaskAmountList = ({ amountsList, taskRoute }: { amountsList: ITaskAmount[], taskRoute: ITaskRoute }) => {
  const [selectedTaskAmount, setSelectedTaskAmount] = useState<ITaskAmount | undefined>(undefined)

  const toast = useToast();

  const [isAddAmountModalOpen, setAddAmountModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const addAmountModalOpen = () => setAddAmountModalOpen(true)

  const cancelRef = React.useRef()

  const onDelete = async () => {
    if (selectedTaskAmount !== null) {
      try {
        await deleteTaskAmount(selectedTaskAmount!.id)
        handleFetchUpdatedTaskRoute(taskRoute.id)
        toast({
          title: "Task amount deleted",
          description: "",
        })
      }
      catch {
        toast({
          title: "Error deleting task amount",
          description: "please try again",
          status: "error",
        })
      }
    }
    onDeleteModalClose()
  }

  const onDeleteModalClose = () => {
    setSelectedTaskAmount(undefined)
    setIsDeleteModalOpen(false)
  }

  const onEditModalClose = () => {
    setSelectedTaskAmount(undefined)
    setAddAmountModalOpen(false)
  }

  return (
    <>
      <TaskAmountDetailModal
        isOpen={!!selectedTaskAmount && !isAddAmountModalOpen && !isDeleteModalOpen}
        onClose={() => setSelectedTaskAmount(undefined)}
        taskAmount={selectedTaskAmount}
      />
      <TaskAmountDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
      <AddAmountModal selectedTaskAmount={selectedTaskAmount} taskRoute={taskRoute} isOpen={isAddAmountModalOpen} onClose={onEditModalClose} />

      <HStack my={6} justifyContent='space-between' >
        <Heading size='lg' textAlign='start' >Amounts</Heading>
        <Button onClick={addAmountModalOpen} >Add Amounts</Button>
      </HStack>

      {amountsList?.map((taskAmount: ITaskAmount, idx: number) => (
        <>
          <Table mt={10} size="sm" variant='unstyled' bgColor='blue.100' >
            <Thead>
              <Tr>
                {/* <Th>S No.</Th> */}
                <Th>Id</Th>
                <Th>Vehicle</Th>
                <Th>Timestamp</Th>
                <Th>Work Type</Th>
                <Th>Deal Type</Th>
              </Tr>
            </Thead>
            <Tbody >
              <Tr
                key={taskAmount.id}
                _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
                onClick={() => setSelectedTaskAmount(taskAmount)}
              >
                {/* <Td>{idx + 1}</Td> */}
                <Td>{taskAmount.id}</Td>
                <Td>{taskAmount.vehicle?.registration_number ?? '-'}</Td>
                <Td>{taskAmount.timestamp}</Td>
                <Td>{taskAmount.work_type ?? '-'}</Td>
                <Td>{taskAmount.deal_type ?? '-'}</Td>
              </Tr>
            </Tbody>
          </Table>
          {taskAmount.amount_item.length > 0 && <TaskAmountItemTable taskAmountItems={taskAmount.amount_item} />}
        </>
      ))}

    </>
  )

}
