import * as React from "react"
import {
  Modal,
  InputLeftElement,
  Button,
  InputGroup,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  ModalFooter,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react"
import { Formik } from 'formik';
import { RiRouteFill, RiTodoFill, RiSendPlaneLine } from "react-icons/ri";
import { handleFetchUpdatedBaseRoute } from "../../../store/thunks/BaseRoute";
import { editCollectionPoint, saveCollectionPoint } from "../../../services/apiRequests/collectionPoint";
import { ICollectionPoint } from "../../../models/collectionPoint";

interface AddCollectionPointModalProps {
  isOpen: boolean
  onClose: () => void
  baseRouteId: number
  marker: any
  collectionPoint: ICollectionPoint | null
}

export const AddCollectionPointModal = (props: AddCollectionPointModalProps) => {
  const toast = useToast()
  const { isOpen, onClose, baseRouteId, marker, collectionPoint } = props

  const title = `${collectionPoint ? 'Edit' : 'Create'} collection point`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <Formik
          enableReinitialize
          initialValues={{
            name: collectionPoint?.name ?? '',
            address: collectionPoint?.address ?? '',
            memo: collectionPoint?.memo ?? '',
          }}
          validate={(values) => {
            const errors = {}
            if (values.name.trim().length <= 0) {
              errors.name = 'Required, please enter name';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const _name = values.name.trim()
              const _address = values.address.trim()
              const _memo = values.memo.trim()

              if (collectionPoint) {
                await editCollectionPoint(collectionPoint.id, {
                  name: _name,
                  address: _address,
                  memo: _memo,
                  location: collectionPoint.location
                })
                toast({
                  title: "Updated collection point",
                  description: "",
                  status: "success",
                })
              }
              else {
                const _sequence = 0
                const _route = baseRouteId
                const { longitude, latitude } = marker;
                const _location = latitude + ',' + longitude
                await saveCollectionPoint({
                  name: _name,
                  location: _location,
                  address: _address,
                  memo: _memo,
                  route: _route,
                  sequence: _sequence,
                })
                toast({
                  title: "Created collection point",
                  description: "",
                  status: "success",
                })
              }
              handleFetchUpdatedBaseRoute(baseRouteId)
              onClose()
            }
            catch (e) {
              toast({
                title: "Error",
                description: "please check the credentials",
                status: "error",
              })
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl isInvalid={!!(errors.name && touched.name)}>
                  <FormLabel htmlFor="name" >Collection Point Name</FormLabel>
                  <InputGroup marginY={2} >
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiRouteFill color="gray.300" />}
                    />
                    <Input
                      value={values.name}
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="name"
                      size="md" />
                  </InputGroup>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!(errors.address && touched.address)}>
                  <FormLabel htmlFor="address" >Collection Point Address</FormLabel>
                  <InputGroup marginY={2} >
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiSendPlaneLine color="gray.300" />}
                    />
                    <Input
                      value={values.address}
                      type="address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="address"
                      size="md" />
                  </InputGroup>
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!(errors.memo && touched.memo)}>
                  <FormLabel htmlFor="memo" >Collection Point Memo</FormLabel>
                  <InputGroup marginY={2} >
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiTodoFill color="gray.300" />}
                    />
                    <Input
                      value={values.memo}
                      type="memo"
                      name="memo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="memo"
                      size="md" />
                  </InputGroup>
                  <FormErrorMessage>{errors.memo}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isSubmitting} onClick={onClose} mr={3}>Cancel</Button>
                <Button disabled={isSubmitting} type="submit" colorScheme="green" >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal >
  )
}
