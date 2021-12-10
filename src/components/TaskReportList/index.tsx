import React, { useEffect } from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td, HStack, Heading, Button, Image, useToast
} from "@chakra-ui/react"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { ITaskReport } from "../../models/taskReport"
import { TaskReportDetailModal } from "../TaskReportDetailModal"
import { useState } from "react"
import { AddReportModal } from "./components/AddReportModal"
import { ITaskRoute } from "../../models/taskRoute"
import { TaskReportDeleteConfirmationModal } from "./components/TaskReportDeleteConfirmationModal";
import { deleteTaskReport } from "../../services/apiRequests/taskReports";
import { handleFetchUpdatedTaskRoute } from "../../store/thunks/TaskRoute";

export const TaskReportList = ({ reportsList, taskRoute }: { reportsList: ITaskReport[], taskRoute: ITaskRoute }) => {
  const [selectedTaskReport, setSelectedTaskReport] = useState<ITaskReport | undefined>(undefined)
  const toast = useToast()

  const [isAddReportModalOpen, setAddReportModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const addReportModalOpen = () => setAddReportModalOpen(true)

  const cancelRef = React.useRef()

  const onDeleteIconClicked = (reportId: number) => {
    const _taskReport = getReportFromId(reportId)
    if (_taskReport) {
      setSelectedTaskReport(_taskReport)
      setIsDeleteModalOpen(true)
    }
  }

  const onDelete = async () => {
    if (selectedTaskReport !== null) {
      try {
        await deleteTaskReport(selectedTaskReport!.id)
        handleFetchUpdatedTaskRoute(taskRoute.id)
        toast({
          title: "Task report deleted",
          description: "",
        })
      }
      catch {
        toast({
          title: "Error deleting task report",
          description: "please try again",
          status: "error",
        })
      }
    }
    onDeleteModalClose()
  }

  const onDeleteModalClose = () => {
    setSelectedTaskReport(undefined)
    setIsDeleteModalOpen(false)
  }

  const onEditIconClicked = (reportId: number) => {
    const _taskReport = getReportFromId(reportId)
    if (_taskReport) {
      setAddReportModalOpen(true)
      setSelectedTaskReport(_taskReport)
    }
  }

  const onEditModalClose = () => {
    setSelectedTaskReport(undefined)
    setAddReportModalOpen(false)
  }

  const getReportFromId = (reportId: number) => reportsList.find((taskReportItem: ITaskReport) => reportId === taskReportItem.id)

  return (
    <>
      <TaskReportDetailModal
        isOpen={!!selectedTaskReport && !isAddReportModalOpen && !isDeleteModalOpen}
        onClose={() => setSelectedTaskReport(undefined)}
        taskReport={selectedTaskReport}
      />
      <TaskReportDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
      <AddReportModal selectedTaskReport={selectedTaskReport} taskRoute={taskRoute} isOpen={isAddReportModalOpen} onClose={onEditModalClose} />
      <HStack my={6} justifyContent='space-between' >
        <Heading size='lg' textAlign='start' >Reports</Heading>
        <Button onClick={addReportModalOpen} >Add reports</Button>
      </HStack>
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>S No.</Th>
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Timestamp</Th>
            <Th>Description</Th>
            <Th>Image</Th>
            <Th>操作</Th>
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
              <Td>
                <Image
                  cursor='pointer'
                  boxSize="25px"
                  borderRadius={5}
                  objectFit="cover"
                  src={taskReport?.image ?? "https://via.placeholder.com/150"}
                  alt="image"
                /></Td>
              <Td>
                <HStack>
                  <Button colorScheme="blue" onClick={(e: any) => {
                    e.stopPropagation()
                    onEditIconClicked(taskReport.id)
                  }} >
                    <MdEdit />
                  </Button>

                  <Button colorScheme="red" onClick={(e: any) => {
                    e.stopPropagation()
                    onDeleteIconClicked(taskReport.id)
                  }} >
                    <MdDeleteForever />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )

}
