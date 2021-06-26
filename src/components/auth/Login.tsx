import React from "react";
import {
  Heading,
  VStack,
  Container,
  Stack,
  Input,
  InputLeftElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { Formik } from 'formik';
import { Logo } from "../../components/common/Logo"
import { AiOutlineUser } from "react-icons/ai";
import { RiLock2Line } from "react-icons/ri";

const Login = () => {
  const initialFormValues = { username: '', password: '' }

  return (
    <VStack spacing={8} padding={10}>
      <Logo h="7vmin" pointerEvents="none" />
      <Heading as="h2" size="xl" >
        Field Protect Admin
      </Heading>
      <Container maxW="container.sm" padding={20} >
        <Stack spacing={3}>
          <Formik
            initialValues={initialFormValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 4000);
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
                <InputGroup margin={2} >
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineUser color="gray.300" />}
                  />
                  <Input
                    type="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username} placeholder="username" size="md" />
                </InputGroup>
                {errors.username && touched.username && errors.username}
                <InputGroup margin={2} >
                  <InputLeftElement
                    pointerEvents="none"
                    children={<RiLock2Line color="gray.300" />}
                  />
                  <Input
                    value={values.password}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur} placeholder="password" size="md" />
                </InputGroup>
                {errors.password && touched.password && errors.password}
                <Button variant="outline" type="submit" disabled={isSubmitting} >Login</Button>
              </form>
            )}
          </Formik>
        </Stack>
      </Container>
    </VStack>
  );
};

export default Login;
