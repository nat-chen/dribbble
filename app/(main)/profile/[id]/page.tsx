import { getUserProjects } from "@/lib/actions";
import ProfilePage from "@/components/ProfilePage";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  // const result = (await getUserProjects(params.id, 100)) as {
  //   user: UserProfile;
  // };
  const res = await fetch(`http://localhost:3000/api/user/${params.id}`);
  const { data: profileDetails } = await res.json();
  if (!profileDetails)
    return <p className="no-result-text">Failed to fetch user info</p>;
  return <ProfilePage user={profileDetails} />;
};

export default UserProfile;
