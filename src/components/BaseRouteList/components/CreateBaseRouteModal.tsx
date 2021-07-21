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
import { editBaseRoute, saveBaseRoute } from "../../../services/apiRequests/baseRoute";
import MultiSelect from "../../common/MultiSelect";
import { getGarbages } from "../../../services/apiRequests/garbages";
import { IGarbage } from "../../../models/garbage";
import { handleFetchBaseRoute } from "../../../store/thunks/BaseRoute";
import { IBaseRoute } from "../../../models/baseRoute";

interface CreateBaseRouteModalProps {
  isOpen: boolean
  onClose: () => void
  baseRoute: IBaseRoute | null
}

interface IGarbageOptions {
  garbage: IGarbage
  value: number
  label: string
}

export const CreateBaseRouteModal = (props: CreateBaseRouteModalProps) => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [garbages, setGarbages] = useState<IGarbageOptions[]>([])
  const [selectedGarbages, setSelectedGarbages] = useState<number[]>([])
  const toast = useToast()

  const { isOpen, onClose, baseRoute } = props

  useEffect(() => {
    if (!baseRoute) return
    const _gb = []
    for (const gb of baseRoute.garbage) _gb.push(gb.id)
    setSelectedGarbages(_gb)
  }, [baseRoute])

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

  const save = async (data: any) => {
    if (baseRoute) {
      // editing
      await editBaseRoute(baseRoute?.id, data)
      toast({
        title: "編集",
        description: "",
        status: "success",
      })
    }
    else {
      // create new
      await saveBaseRoute(data)
      toast({
        title: "新規作成",
        description: "",
        status: "success",
      })
    }
  }

  const title = `${baseRoute ? '編集' : '新規作成'}`

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
            name: baseRoute?.name ?? '',
            customer: baseRoute?.customer?.id ?? '',
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
              await save({
                name: _name,
                customer: values.customer,
                garbage: selectedGarbages
              })
              handleFetchBaseRoute()
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
                  <FormLabel htmlFor="name" >ルート名</FormLabel>
                  <InputGroup marginY={2} >
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiRouteFill color="gray.300" />}
                    />
                    <Input
                      type="name"
                      name="name"
                      value={values.name}
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
                          <FormLabel htmlFor="customer" >顧客</FormLabel>

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
                <InputGroup marginY={2} >
                  <FormControl id="garbage" >
                    <Field name="garbage" >
                      {({ field, form }: { field: any, form: any }) => {
                        const initialGarbages = []
                        for (const gb of garbages) {
                          if (selectedGarbages.includes(gb.garbage.id)) {
                            initialGarbages.push({
                              garbage: gb,
                              value: gb.garbage.id,
                              label: gb.garbage.name
                            })
                          }
                        }
                        return (
                          <FormControl isInvalid={form.errors.customer && form.touched.customer}>
                            <FormLabel htmlFor="garbage" >品目</FormLabel>
                            <MultiSelect
                              {...field}
                              isMulti
                              name="garbage"
                              onChange={(e: any) => {
                                const x = []
                                for (const a of e) x.push(a.value)
                                setSelectedGarbages(x)
                              }}
                              defaultValue={initialGarbages}
                              options={garbages}
                              placeholder="Select garbage types..."
                              closeMenuOnSelect={false}
                              size="sm"
                            />
                            <FormErrorMessage>{form.errors.customer}</FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>
                  </FormControl>
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isSubmitting} onClick={onClose} mr={3}>キャンセル</Button>
                <Button disabled={isSubmitting} type="submit" colorScheme="green" >
                  保存
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal >
  )
}
