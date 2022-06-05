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
import { ITaskAmount } from '../../../models/taskAmount';
import { ITaskAmountItem } from '../../../models/taskAmountItem';
import { getGarbages } from '../../../services/apiRequests/garbages';
import { IGarbage } from '../../../models/garbage';
import {
  addTaskAmountItem,
  editTaskAmountItem,
} from '../../../services/apiRequests/taskAmountItems';
import { isNumeric } from '../../../utils/numbers';

interface AddAmountItemModalProps {
  taskAmount?: ITaskAmount;
  taskRoute: ITaskRoute;
  selectedTaskAmountItem?: ITaskAmountItem;
  isOpen: boolean;
  onClose: () => void;
}

export const AddAmountItemModal = (props: AddAmountItemModalProps) => {
  const [grabagesList, setGarbagesList] = useState<IGarbage[]>([]);

  const toast = useToast();
  const { isOpen, onClose, taskAmount, taskRoute, selectedTaskAmountItem } =
    props;

  useEffect(() => {
    async function getAllGarbages() {
      try {
        const _grabagesList = await getGarbages();
        setGarbagesList(_grabagesList);
      } catch (e) {
        toast({
          title: 'Error fetching garbages',
          description: 'please try again',
          status: 'error',
        });
      }
    }

    getAllGarbages();
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
            garbage: selectedTaskAmountItem?.garbage.id ?? '',
            gross_weight: selectedTaskAmountItem?.gross_weight ?? 0,
            vehicle_weight: selectedTaskAmountItem?.vehicle_weight ?? 0,
          }}
          validate={(values) => {
            const errors: any = {};
            if (values.garbage === '') {
              errors.garbage = 'Required, please select a garbage type';
            }

            if (values.gross_weight === 0 || !isNumeric(values.gross_weight)) {
              errors.gross_weight = 'Required, please add a gross weight';
            }

            if (
              values.vehicle_weight === 0 ||
              !isNumeric(values.vehicle_weight)
            ) {
              errors.vehicle_weight = 'Required, please add a vehicle weight';
            }

            if (
              isNumeric(values.vehicle_weight) &&
              isNumeric(values.gross_weight) &&
              Number(values.gross_weight) < Number(values.vehicle_weight)
            ) {
              errors.vehicle_weight =
                'Vehicle weight cannot be more then gross weight';
              errors.gross_weight =
                'Vehicle weight cannot be more then gross weight';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append('task_amount', String(taskAmount?.id));
              formData.append('garbage', String(values.garbage));
              formData.append('gross_weight', String(values.gross_weight));
              formData.append('vehicle_weight', String(values.vehicle_weight));

              if (selectedTaskAmountItem) {
                await editTaskAmountItem(selectedTaskAmountItem.id, formData);
                toast({
                  title: 'Updated task amount item',
                  description: '',
                  status: 'success',
                });
              } else {
                await addTaskAmountItem(formData);
                toast({
                  title: 'Added task amount item',
                  description: '',
                  status: 'success',
                });
              }
              handleFetchUpdatedTaskRoute(taskRoute.id);
              onClose();
            } catch (e) {
              toast({
                title: 'Error adding amount item',
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
                  id='garbage'
                  isInvalid={!!(errors.garbage && touched.garbage)}
                >
                  <FormLabel htmlFor='garbage'>Garbage</FormLabel>
                  <InputGroup marginY={2}>
                    <Field name='garbage'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          {...field}
                          placeholder='Select garbage'
                          id='garbage'
                          name='garbage'
                        >
                          {grabagesList.map((grabageItem: IGarbage) => (
                            <option key={grabageItem.id} value={grabageItem.id}>
                              {grabageItem.name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.garbage && touched.garbage}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!(errors.gross_weight && touched.gross_weight)}
                >
                  <FormLabel htmlFor='gross_weight'>Gross Weight</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.gross_weight}
                      type='gross_weight'
                      name='gross_weight'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Gross Weight'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.gross_weight}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!(errors.vehicle_weight && touched.vehicle_weight)
                  }
                >
                  <FormLabel htmlFor='vehicle_weight'>Vehicle Weight</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.vehicle_weight}
                      type='vehicle_weight'
                      name='vehicle_weight'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Vehicle Weight'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.vehicle_weight}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Net Weight</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      disabled
                      value={values.gross_weight - values.vehicle_weight}
                      placeholder='net weight'
                      size='md'
                    />
                  </InputGroup>
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
