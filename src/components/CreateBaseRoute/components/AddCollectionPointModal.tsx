import * as React from 'react';
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
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { RiRouteFill, RiTodoFill, RiSendPlaneLine } from 'react-icons/ri';
import { handleFetchUpdatedBaseRoute } from '../../../store/thunks/BaseRoute';
import {
  editCollectionPoint,
  saveCollectionPoint,
} from '../../../services/apiRequests/collectionPoint';
import { ICollectionPoint } from '../../../models/collectionPoint';
import { useRef } from 'react';
import { MdEdit } from 'react-icons/md';

interface AddCollectionPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseRouteId: number;
  marker: any;
  collectionPoint: ICollectionPoint | null;
}

export const AddCollectionPointModal = (
  props: AddCollectionPointModalProps
) => {
  const toast = useToast();
  const { isOpen, onClose, baseRouteId, marker, collectionPoint } = props;

  const title = `${collectionPoint ? '編集' : '追加'}`;

  const imageInputRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            image: null,
          }}
          validate={(values) => {
            const errors: any = {};
            if (values.name.trim().length <= 0) {
              errors.name = 'Required, please enter name';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const _name = values.name.trim();
              const _address = values.address.trim();
              const _memo = values.memo.trim();

              const formData = new FormData();
              formData.append('name', _name);
              formData.append('address', _address);
              formData.append('memo', _memo);

              if (values.image) formData.append('image', values.image!);

              if (collectionPoint) {
                formData.append('location', collectionPoint.location);
                await editCollectionPoint(collectionPoint!.id, formData);
                toast({
                  title: 'Updated collection point',
                  description: '',
                  status: 'success',
                });
              } else {
                const _sequence = 0;
                const { longitude, latitude } = marker;
                const _location = latitude + ',' + longitude;
                formData.append('location', _location);
                formData.append('route', baseRouteId.toString());
                formData.append('sequence', _sequence.toString());
                await saveCollectionPoint(formData);
                toast({
                  title: 'Created collection point',
                  description: '',
                  status: 'success',
                });
              }
              handleFetchUpdatedBaseRoute(baseRouteId);
              onClose();
            } catch (e) {
              toast({
                title: 'Error',
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
                <FormControl isInvalid={!!(errors.name && touched.name)}>
                  <FormLabel htmlFor='name'>集積所名</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiRouteFill color='gray.300' />}
                    />
                    <Input
                      value={values.name}
                      type='name'
                      name='name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='name'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!(errors.address && touched.address)}>
                  <FormLabel htmlFor='address'>住所</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiSendPlaneLine color='gray.300' />}
                    />
                    <Input
                      value={values.address}
                      type='address'
                      name='address'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='address'
                      size='md'
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!(errors.memo && touched.memo)}>
                  <FormLabel htmlFor='memo'>メモ</FormLabel>
                  <InputGroup marginY={2}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiTodoFill color='gray.300' />}
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

                <FormControl isInvalid={!!(errors.memo && touched.memo)}>
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
                    {(values.image || collectionPoint?.image) && (
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
                            : collectionPoint?.image
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
                        setFieldValue('image', event.target.files[0]);
                      }}
                    ></input>
                  </InputGroup>
                  <FormErrorMessage>{errors.memo}</FormErrorMessage>
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
