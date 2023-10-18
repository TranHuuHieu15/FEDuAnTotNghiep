import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/button/Button";
import Input from "../components/input/Input";

const SignInPage = () => {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="flex-col self-start hidden text-gray-300 lg:flex">
            <h1 className="my-3 text-4xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="pr-3 text-sm text-gray-900 opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="z-10 flex self-center justify-center">
          <div className="p-12 mx-auto bg-white rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In </h3>
              <p className="text-gray-400">
                Don't have an account?
                <a
                  href="#"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className="space-y-6">
              <form>
                <Input
                  type="text"
                  label="Enter your username"
                  className="w-[285px] my-4"
                />

                <Input
                  type="password"
                  label="Enter your password"
                  className="w-[285px]"
                />
              </form>
              <div className="flex items-center justify-between">
                <div className="ml-auto text-sm">
                  <a href="#" className="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button className="w-[285px] bg-[#F7C59F] text-gray-800">
                  Sign in
                </Button>
              </div>
              <div className="flex items-center justify-center my-5 space-x-2">
                <span className="w-16 h-px bg-gray-100"></span>
                <span className="font-normal text-gray-300">or</span>
                <span className="w-16 h-px bg-gray-100"></span>
              </div>
              <div className="flex justify-between w-full gap-4 ">
                <Button className="flex w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900">
                  <FcGoogle className="w-4 h-4" />
                  <span>Google</span>
                </Button>

                <Button className="flex w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 w- hover:border-gray-900 hover:bg-gray-900">
                  <BsFacebook color="blue" className="w-4 h-4" />
                  <span>Facebook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};

export default SignInPage;
