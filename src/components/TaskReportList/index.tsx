import * as React from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td,
} from "@chakra-ui/react"
import { ITaskReport } from "../../models/taskReport"
import { TaskReportDetailModal } from "../TaskReportDetailModal"
import { useState } from "react"

export const TaskReportList = ({ reportsList }: { reportsList: ITaskReport[] }) => {
  const [selectedTaskReport, setSelectedTaskReport] = useState<ITaskReport | undefined>(undefined)

  return (
    <>
      <TaskReportDetailModal
        isOpen={!!selectedTaskReport}
        onClose={() => setSelectedTaskReport(undefined)}
        taskReport={selectedTaskReport}
      />
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>S No.</Th>
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Timestamp</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody >
          {reportsList?.map((taskReport: ITaskReport, idx: number) => (
            <Tr
              key={taskReport.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
              onClick={() => setSelectedTaskReport(taskReport)}
            >
              <Td>{idx + 1}</Td>
              <Td>{taskReport.id}</Td>
              <Td>{taskReport.report_type.name}</Td>
              <Td>{taskReport.timestamp}</Td>
              <Td>{taskReport.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )

}
