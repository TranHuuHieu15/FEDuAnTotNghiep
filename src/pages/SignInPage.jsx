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
                <Button className="w-[285px] bg-[#F7C59F]">Sign in</Button>
              </div>
              <div className="flex items-center justify-center my-5 space-x-2">
                <span className="w-16 h-px bg-gray-100"></span>
                <span className="font-normal text-gray-300">or</span>
                <span className="w-16 h-px bg-gray-100"></span>
              </div>
              <div className="flex justify-center w-full gap-5 ">
                <Button className="flex gap-2 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900">
                  <svg
                    className="w-4 mr-2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>
                  <span>Google</span>
                </Button>

                <Button className="flex gap-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900">
                  <svg
                    className="w-4 mr-2"
                    viewBox="0 0 100 100"
                    style={{ enableBackground: "new 0 0 100 100" }}
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Layer_1" />
                    <g id="Layer_2">
                      <path
                        d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z"
                        style={{ fill: "#1877f2" }}
                      />
                      <path
                        d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92V64.104z"
                        style={{ fill: "#f1f1f1" }}
                      />
                    </g>
                  </svg>
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
