import { notification } from 'antd';
import { t } from 'i18next';

export const openNotificationWithIcon = (
  type: 'success' | 'error' | 'warning',
  message: string,
  error = ''
) => {
  notification[type]({
    message: message,
    description: type === 'success' ? '' : `${t('message.errorMessage')}: '${error}'`,
    duration: 3,
  });
};
