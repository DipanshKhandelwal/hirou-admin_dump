import React from 'react';
import {
  VStack,
  Container,
  Stack,
  Input,
  InputLeftElement,
  Button,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { Logo } from '../../components/common/Logo';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { handleLogin } from '../../store/thunks/App';
import { IUser } from '../../models/user';
import { useSelector } from 'react-redux';
import { _user } from '../../store/selectors/App';
import { Redirect } from 'react-router-dom';
import Footer from '../common/Footer';

const Login = () => {
  const toast = useToast();

  const user: IUser = useSelector(_user);

  const initialFormValues = { username: '', password: '' };

  if (user) {
    return <Redirect to='home' />;
  }

  return (
    <VStack spacing={8} padding={10}>
      <Logo h='7vmin' pointerEvents='none' />
      <Container maxW='container.sm' padding={20}>
        <Stack spacing={3}>
          <Formik
            initialValues={initialFormValues}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleLogin({
                  username: values.username,
                  password: values.password,
                });
                toast({
                  title: 'Login successful',
                  description: '',
                  status: 'success',
                });
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
            }) => (
              <form onSubmit={handleSubmit}>
                <InputGroup margin={2}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineUser color='gray.300' />}
                  />
                  <Input
                    type='username'
                    name='username'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder='username'
                    size='md'
                  />
                </InputGroup>
                {errors.username && touched.username && errors.username}
                <InputGroup margin={2}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<RiLock2Line color='gray.300' />}
                  />
                  <Input
                    value={values.password}
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='password'
                    size='md'
                  />
                </InputGroup>
                {errors.password && touched.password && errors.password}
                <Button variant='outline' type='submit' disabled={isSubmitting}>
                  ログイン
                </Button>
              </form>
            )}
          </Formik>
        </Stack>
      </Container>
      <Footer />
    </VStack>
  );
};

export default Login;
