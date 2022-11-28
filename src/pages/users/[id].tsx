import UserPageComponent from '@/components/pageComponents/userPage';
import useUserData from '@/hooks/useUserData';
import { getUser } from '@/services/getUser';
import formatUser from '@/utils/formatters/formatUser';
import { FormatedUser } from '@types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type Props = {
	user: FormatedUser;
};

const UserPage = ({ user }: Props) => {
	const { setUser } = useUserData();
	setUser(user);

	return (
		<>
			<UserPageComponent />
		</>
	);
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { id } = context.query;

	const user = await getUser(Number(id));

	if (!user.id) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}

	const formattedUser = formatUser(user);

	return {
		props: {
			user: formattedUser,
		},
	};
};