// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Services',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'My Account',
    path: '/dashboard/my-account',
    icon: icon('ic_user'),
  },
  {
    title: 'Previous Transactions',
    path: '/dashboard/previous-transactions',
    icon: icon('ic_disabled'),
  },
  {
    title: 'FAQ',
    path: '/dashboard/faq',
    icon: icon('ic_blog'),
  },
  {
    title: 'Change PIN',
    path: '/login',
    icon: icon('ic_lock'),
  },

];

export default navConfig;
