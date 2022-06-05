import React, { useState, useEffect } from 'react';
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
  useToast,
  Select,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { RiRouteFill } from 'react-icons/ri';
import { ITaskRoute } from '../../../models/taskRoute';
import { handleFetchUpdatedTaskRoute } from '../../../store/thunks/TaskRoute';
import { getVehicles } from '../../../services/apiRequests/vehicles';
import { IVehicle } from '../../../models/vehicle';
import { ITaskAmount } from '../../../models/taskAmount';
import {
  addTaskAmount,
  editTaskAmount,
} from '../../../services/apiRequests/taskAmounts';

interface AddAmountModalProps {
  taskRoute: ITaskRoute;
  selectedTaskAmount?: ITaskAmount;
  isOpen: boolean;
  onClose: () => void;
}

export const AddAmountModal = (props: AddAmountModalProps) => {
  const [vehiclesList, setVehiclesList] = useState<IVehicle[]>([]);

  const toast = useToast();
  const { isOpen, onClose, taskRoute, selectedTaskAmount } = props;

  useEffect(() => {
    async function getAllVehicles() {
      try {
        const _vehiclesList = await getVehicles();
        setVehiclesList(_vehiclesList);
      } catch (e) {
        toast({
          title: 'Error fetching vehicles',
          description: 'please try again',
          status: 'error',
        });
      }
    }

    getAllVehicles();
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>搬入量</ModalHeader>
        <ModalCloseButton />
        <Formik
          enableReinitialize
          initialValues={{
            vehicle: selectedTaskAmount?.vehicle?.id ?? '',
            memo: selectedTaskAmount?.memo ?? '',
            deal_type: selectedTaskAmount?.deal_type ?? '',
            work_type: selectedTaskAmount?.work_type ?? '',
          }}
          validate={(values) => {
            const errors: any = {};
            if (values.vehicle === '') {
              errors.vehicle = 'Required, please select a vehicle';
            }

            if (values.deal_type === '') {
              errors.deal_type = '取引種別を選択してください';
            }

            if (values.work_type === '') {
              errors.work_type = '作業種別を選択してください';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append('route', String(taskRoute.id));
              formData.append('memo', values.memo);
              formData.append('vehicle', String(values.vehicle));
              formData.append('deal_type', String(values.deal_type));
              formData.append('work_type', String(values.work_type));

              if (selectedTaskAmount) {
                await editTaskAmount(selectedTaskAmount.id, formData);
                toast({
                  title: 'Updated task amount',
                  description: '',
                  status: 'success',
                });
              } else {
                await addTaskAmount(formData);
                toast({
                  title: 'Added task amount',
                  description: '',
                  status: 'success',
                });
              }
              handleFetchUpdatedTaskRoute(taskRoute.id);
              onClose();
            } catch (e) {
              toast({
                title: 'Error adding amount',
                description: 'please check the credentials',
                status: 'error',
              });
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl
                  id='vehicle'
                  isInvalid={!!(errors.vehicle && touched.vehicle)}
                >
                  <FormLabel htmlFor='vehicle'>Vehicle</FormLabel>
                  <InputGroup marginY={2}>
                    <Field name='vehicle'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          {...field}
                          placeholder='車両を選択してください'
                          id='vehicle'
                          name='vehicle'
                        >
                          {vehiclesList.map((vehicleItem: IVehicle) => (
                            <option key={vehicleItem.id} value={vehicleItem.id}>
                              {vehicleItem.registration_number}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.vehicle && touched.vehicle}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!(errors.deal_type && touched.deal_type)}
                >
                  <FormLabel htmlFor='deal_type'>取引種別</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.deal_type}
                      type='deal_type'
                      name='deal_type'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='取引種別を選択してください'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.deal_type}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!(errors.work_type && touched.work_type)}
                >
                  <FormLabel htmlFor='work_type'>作業種別</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.work_type}
                      type='work_type'
                      name='work_type'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='作業種別を選択してください'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.work_type}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!(errors.memo && touched.memo)}>
                  <FormLabel htmlFor='memo'>メモ</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.memo}
                      type='memo'
                      name='memo'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='memo'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.memo}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isSubmitting} onClick={onClose} mr={3}>
                  キャンセル
                </Button>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  colorScheme='green'
                >
                  保存
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
