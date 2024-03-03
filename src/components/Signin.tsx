import { SigninForm } from "./SigninForm";
import Title from "./Title";
import SparklesFullPageWrapper from "./ui/sparklesFullPageWrapper";

function Signin() {
  return (
    <SparklesFullPageWrapper>
      <Title className="mb-10"></Title>
      <SigninForm></SigninForm>
    </SparklesFullPageWrapper>
  );
}

export default Signin;
