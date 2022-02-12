import React, { useState, useEffect, useRef } from 'react';
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
  Image,
  Select,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { RiRouteFill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { ITaskRoute } from '../../../models/taskRoute';
import { ITaskReportType } from '../../../models/taskReportType';
import { getReportTypes } from '../../../services/apiRequests/reportTypes';
import { ITaskCollectionPoint } from '../../../models/taskCollectionPoint';
import {
  addTaskReport,
  editTaskReport,
} from '../../../services/apiRequests/taskReports';
import { handleFetchUpdatedTaskRoute } from '../../../store/thunks/TaskRoute';
import { ITaskReport } from '../../../models/taskReport';

interface AddReportModalProps {
  taskRoute: ITaskRoute;
  selectedTaskReport?: ITaskReport;
  isOpen: boolean;
  onClose: () => void;
}

export const AddReportModal = (props: AddReportModalProps) => {
  const [reportTypes, setReportTypes] = useState<ITaskReportType[]>([]);

  const toast = useToast();
  const { isOpen, onClose, taskRoute, selectedTaskReport } = props;

  const imageInputRef = useRef();

  useEffect(() => {
    async function _getReporTypes() {
      try {
        const _reportTypes = await getReportTypes();
        setReportTypes(_reportTypes);
      } catch (e) {
        toast({
          title: 'Error fetching report types',
          description: 'please try again',
          status: 'error',
        });
      }
    }

    _getReporTypes();
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add report</ModalHeader>
        <ModalCloseButton />
        <Formik
          enableReinitialize
          initialValues={{
            task_collection_point:
              selectedTaskReport?.task_collection_point ?? '',
            report_type: selectedTaskReport?.report_type.id ?? '',
            description: selectedTaskReport?.description ?? '',
            image: null,
          }}
          validate={(values) => {
            const errors: any = {};
            if (values.task_collection_point === '') {
              errors.task_collection_point = 'Required, please select a point';
            }

            if (values.report_type === '') {
              errors.report_type = 'Required, please select a report type';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const _description = values.description.trim();

              const formData = new FormData();
              formData.append('route', String(taskRoute.id));
              formData.append('description', _description);
              formData.append(
                'task_collection_point',
                String(values.task_collection_point)
              );
              formData.append('report_type', String(values.report_type));

              if (values.image) formData.append('image', values.image!);

              if (selectedTaskReport) {
                await editTaskReport(selectedTaskReport.id, formData);
                toast({
                  title: 'Updated task report',
                  description: '',
                  status: 'success',
                });
              } else {
                await addTaskReport(formData);
                toast({
                  title: 'Added task report',
                  description: '',
                  status: 'success',
                });
              }
              handleFetchUpdatedTaskRoute(taskRoute.id);
              onClose();
            } catch (e) {
              toast({
                title: 'Error adding report',
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
                  id='task_collection_point'
                  isInvalid={
                    !!(
                      errors.task_collection_point &&
                      touched.task_collection_point
                    )
                  }
                >
                  <FormLabel htmlFor='task_collection_point'>
                    Task collection point
                  </FormLabel>
                  <InputGroup marginY={2}>
                    <Field name='task_collection_point'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          {...field}
                          placeholder='Select task collection point'
                          id='task_collection_point'
                          name='task_collection_point'
                        >
                          {taskRoute.task_collection_point.map(
                            (tcp: ITaskCollectionPoint) => (
                              <option key={tcp.id} value={tcp.id}>
                                {tcp.name}
                              </option>
                            )
                          )}
                        </Select>
                      )}
                    </Field>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.task_collection_point &&
                      touched.task_collection_point}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id='report_type'
                  isInvalid={!!(errors.report_type && touched.report_type)}
                >
                  <FormLabel htmlFor='report_type'>Report Type</FormLabel>
                  <InputGroup marginY={2}>
                    <Field name='report_type'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          {...field}
                          placeholder='Select report type'
                          id='report_type'
                          name='report_type'
                        >
                          {reportTypes.map((reporType: ITaskReportType) => (
                            <option key={reporType.id} value={reporType.id}>
                              {reporType.name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.report_type && touched.report_type}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!(errors.description && touched.description)}
                >
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.description}
                      type='description'
                      name='description'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='description'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!(errors.image && touched.image)}>
                  <FormLabel htmlFor='memo'>
                    写真
                    <Button
                      mx={2}
                      colorScheme='blue'
                      size='xs'
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <MdEdit />
                    </Button>
                  </FormLabel>
                  <InputGroup marginY={2}>
                    {(values.image || selectedTaskReport?.image) && (
                      <Image
                        cursor='pointer'
                        border='1px #3182ce solid'
                        p={2}
                        onClick={() => imageInputRef.current?.click()}
                        boxSize='150px'
                        objectFit='cover'
                        src={
                          values.image
                            ? URL.createObjectURL(values.image)
                            : selectedTaskReport?.image
                        }
                        alt='image'
                      />
                    )}
                    <input
                      style={{ display: 'none' }}
                      ref={imageInputRef}
                      type='file'
                      accept='image/*'
                      name='file'
                      onChange={(event) => {
                        setFieldValue('image', event?.target?.files[0]);
                      }}
                    ></input>
                  </InputGroup>
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isSubmitting} onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  colorScheme='green'
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
