import ProfileCard from "../../components/card/ProfileCard";
import Heading from "../../components/heading/Heading";

const profileData = [
  {
    id: 1,
    name: "Natalie Paisley",
    role: "CEO / Co-Founder",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Natalie Paisley",
    role: "CEO / Co-Founder",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Natalie Paisley",
    role: "CEO / Co-Founder",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const HomeProfile = () => {
  return (
    <>
      <Heading className="text-center">ABOUT US</Heading>
      <div className="flex flex-row justify-center gap-5 mx-24">
        {profileData.length > 0 &&
          profileData.map((item) => (
            <ProfileCard key={item.id} item={item}></ProfileCard>
          ))}
      </div>
    </>
  );
};

export default HomeProfile;
