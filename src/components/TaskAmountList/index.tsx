import * as React from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td, HStack, Heading, Button
} from "@chakra-ui/react"
import { useState } from "react"
import { ITaskAmount } from "../../models/taskAmount"
import { TaskAmountDetailModal } from "../TaskAmountDetailModal"
import { ITaskAmountItem } from "../../models/taskAmountItem"

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

export const TaskAmountList = ({ amountsList }: { amountsList: ITaskAmount[] }) => {
  const [selectedTaskAmount, setSelectedTaskAmount] = useState<ITaskAmount | undefined>(undefined)

  return (
    <>
      <TaskAmountDetailModal
        isOpen={!!selectedTaskAmount}
        onClose={() => setSelectedTaskAmount(undefined)}
        taskAmount={selectedTaskAmount}
      />
      <HStack my={6} justifyContent='space-between' >
        <Heading size='lg' textAlign='start' >Amounts</Heading>
        <Button onClick={() => { }} >Add Amounts</Button>
      </HStack>
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>S No.</Th>
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Timestamp</Th>
            <Th>Amount</Th>
            <Th>Memo</Th>
          </Tr>
        </Thead>
        <Tbody >
          {amountsList?.map((taskAmount: ITaskAmount, idx: number) => (
            <Tr
              key={taskAmount.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
              onClick={() => setSelectedTaskAmount(taskAmount)}
            >
              <Td>{idx + 1}</Td>
              <Td>{taskAmount.id}</Td>
              <Td>{taskAmount.garbage.name}</Td>
              <Td>{taskAmount.timestamp}</Td>
              <Td>{taskAmount.amount}</Td>
              <Td>{taskAmount.memo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )

}
