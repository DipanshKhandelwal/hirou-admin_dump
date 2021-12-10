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

      {amountsList?.map((taskAmount: ITaskAmount, idx: number) => (
        <>
          <Table border='solid 2px' borderColor='blue.600' size="sm" variant='unstyled' bgColor='blue.100' >
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
          <TaskAmountItemTable taskAmountItems={taskAmount.amount_item} />
        </>
      ))}

    </>
  )

}
