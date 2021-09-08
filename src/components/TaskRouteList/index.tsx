import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  HStack,
  Spinner,
  Button
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../services/navigation"
import { handleFetchTaskRoute } from "../../store/thunks/TaskRoute"
import { _taskRoute } from "../../store/selectors/TaskRoute"
import { ITaskRoute } from "../../models/taskRoute"
import { IGarbage } from "../../models/garbage"
import DatePicker from "../DatePicker"
import { useHistory } from "react-router"
import { getDateString } from "../../utils/date"

export const TaskRouteList = () => {
  const history = useHistory()
  const taskRoutesData: any = useSelector(_taskRoute)
  const [date, setDate] = React.useState<Date>(new Date())

  useEffect(() => {
    const historyListener = history.listen((a) => {
      const d = new URLSearchParams(a.search)
      let data: any = {};
      for (let params of d?.entries()) {
        data[params[0]] = params[1];
      }
      let newDate;
      if (data['date']) newDate = new Date(data['date'])
      else newDate = new Date()
      setDate(newDate)
    })
    return () => historyListener()
  }, [history])

  const fetchData = React.useCallback(() => {
    const dateParam = getDateString(date);
    handleFetchTaskRoute({ date: dateParam })
  }, [date])

  useEffect(() => fetchData(), [fetchData, date])

  const onChangeDate = (d: any) => {
    setDate(d)
    const dateParam = getDateString(d);
    navigate({ search: `?date=${dateParam}` });
  }

  const selectTaskRoute = (taskRouteId: number) => navigate(`${taskRouteId}`)

  let content;
  if (taskRoutesData.isLoaded) {
    if (taskRoutesData?.data.length === 0) {
      content = <Heading size='sm' >No task found for {date.toLocaleDateString()}</Heading>
    }
    else {
      content = (
        <Table size="sm" variant='simple' >
          <Thead>
            <Tr>
              <Th>S No.</Th>
              <Th>Id</Th>
              <Th>ルート名</Th>
              <Th>顧客</Th>
              <Th>品目</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody >
            {taskRoutesData?.data?.map((taskRoute: ITaskRoute, idx: number) => (
              <Tr
                key={taskRoute.id}
                _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
                onClick={() => selectTaskRoute(taskRoute.id)}
              >
                <Td>{idx + 1}</Td>
                <Td>{taskRoute.id}</Td>
                <Td>{taskRoute.name}</Td>
                <Td>{taskRoute.customer?.name ?? '--'}</Td>
                <Td>
                  {taskRoute.garbage.map((_garbage: IGarbage) => _garbage.name).join(', ')}
                </Td>
                <Td>{taskRoute.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )
    }
  }
  else {
    content = <Spinner />;
  }

  return (
    <Container maxW="container.lg">
      <HStack marginBottom={5} >
        <Heading textAlign='start' >Task Route List</Heading>
        <DatePicker
          id="published-date"
          selectedDate={date}
          onChange={onChangeDate}
          showPopperArrow={true}
        />
        <Button
          isLoading={!taskRoutesData.isLoaded}
          loadingText="Loading"
          variant="outline"
          onClick={() => onChangeDate(date)}
        >
          Reload
        </Button>
      </HStack>
      {content}
    </Container>
  )
}
