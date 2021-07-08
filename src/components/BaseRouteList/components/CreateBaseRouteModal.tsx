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
  Select,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react"
import { Formik, Field } from 'formik';
import { RiRouteFill } from "react-icons/ri";
import { ICustomer } from "../../../models/customer";
import { useEffect } from "react";
import { getCustomers } from "../../../services/apiRequests/customers";
import { useState } from "react";
import { saveBaseRoute } from "../../../services/apiRequests/baseRoute";
import { getGarbages } from "../../../services/apiRequests/garbages";
import { IGarbage } from "../../../models/garbage";
import { handleFetchBaseRoute } from "../../../store/thunks/BaseRoute";

interface CreateBaseRouteModalProps {
  isOpen: boolean
  onClose: () => void
}

interface IGarbageOptions {
  garbage: IGarbage
  value: number
  label: string
}

export const CreateBaseRouteModal = (props: CreateBaseRouteModalProps) => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const toast = useToast()

  const { isOpen, onClose } = props

  useEffect(() => {
    async function _getCustomers() {
      try {
        const customers = await getCustomers();
        setCustomers(customers)
      } catch (e) {
        toast({
          title: "Error fetching customers",
          description: "please try again",
          status: "error",
        })
      }
    }

    async function _getGarbages() {
      try {
        const _garbages = await getGarbages();
        const options: IGarbageOptions[] = []
        for (const gb of _garbages) {
          options.push({
            garbage: gb,
            value: gb.id,
            label: gb.name
          })
        }
        setGarbages(options)
      } catch (e) {
        toast({
          title: "Error fetching garbages",
          description: "please try again",
          status: "error",
        })
      }
    }

    _getCustomers()
    _getGarbages()
  }, [toast])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create base route</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            name: '',
            customer: '',
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
              await saveBaseRoute({
                name: _name,
                customer: values.customer,
                garbage: selectedGarbages
              })
              handleFetchBaseRoute()
              toast({
                title: "Created base route",
                description: "",
                status: "success",
              })
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
                  <FormLabel htmlFor="name" >Route Name</FormLabel>
                  <InputGroup marginY={2} >
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiRouteFill color="gray.300" />}
                    />
                    <Input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="name"
                      size="md" />
                  </InputGroup>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <InputGroup marginY={2} >
                  <FormControl id="customer" >
                    <Field name="customer" >
                      {({ field, form }: { field: any, form: any }) => (
                        <FormControl isInvalid={form.errors.customer && form.touched.customer}>
                          <FormLabel htmlFor="customer" >Customer</FormLabel>

                          <Select {...field} placeholder="Select customer" id="customer" name="customer" >
                            {customers.map((customer: ICustomer) => (
                              <option key={customer.id} value={customer.id} >{customer.description}</option>
                            ))}
                          </Select>
                          <FormErrorMessage>{form.errors.customer}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </FormControl>
                </InputGroup>
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
