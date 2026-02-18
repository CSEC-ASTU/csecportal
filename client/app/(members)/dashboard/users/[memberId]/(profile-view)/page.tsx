import SeeProfile from "../_components/_see_profile/SeeProfile";
const page = async ({ params }: { params: Promise<{ memberId: string }> }) => {
  const { memberId } = await params;

  return <SeeProfile memberId={memberId} />;
};

export default page;
