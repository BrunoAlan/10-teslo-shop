import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomIcon from '../components/ui/CustomIcon';

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  children: React.ReactNode;
}
const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { goBack, canGoBack } = useNavigation();

  const renderBackAction = () => {
    return (
      <TopNavigationAction
        onPress={goBack}
        icon={<CustomIcon name='arrow-back-outline' />}
      />
    );
  };

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<CustomIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment='center'
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: '100%' }}>{children}</Layout>
    </Layout>
  );
};
export default MainLayout;
