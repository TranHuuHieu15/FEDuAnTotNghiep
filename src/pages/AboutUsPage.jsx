import SiteLayout from "../layout/SiteLayout";
import { MdOutlinePlace } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const AboutUsPage = () => {
  return (
    <>
      <SiteLayout>
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center bg-image-five w-full h-[240px] object-cover">
            <h1 className="font-semibold text-[50px] font-eculid text-gray-50">
              Contact
            </h1>
          </div>
          <div className="flex justify-center gap-5">
            <div className="flex flex-col gap-10 w-[585px] h-auto border p-16">
              <h1 className="text-center text-2xl text-blue-gray-700">
                Send Us A Message
              </h1>
            </div>
            <div className="flex flex-col gap-10 w-[585px] h-auto border p-16">
              <div className="flex gap-3">
                <MdOutlinePlace className="w-6 h-6 text-blue-gray-700" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-blue-gray-700">Address</span>
                  <p className="text-md text-gray-600">
                    Coza Store Center 8th floor, 379 Hudson St, New York, NY
                    10018 US
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <BsTelephone className="w-6 h-6 text-blue-gray-700" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-blue-gray-700">Lets Talk</span>
                  <p className="text-md text-blue-300">+1 800 1236879</p>
                </div>
              </div>
              <div className="flex gap-3">
                <AiOutlineMail className="w-6 h-6 text-blue-gray-700" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-blue-gray-700">
                    Sale Support
                  </span>
                  <p className="text-md text-blue-300">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1AetQ6iNNUHBOhLgOF1Pbxv-njWBYpsPU&ehbc=2E312F"
            width="full"
            height="480"
          ></iframe>
        </div>
      </SiteLayout>
    </>
  );
};

export default AboutUsPage;
