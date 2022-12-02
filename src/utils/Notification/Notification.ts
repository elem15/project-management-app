import { notification } from 'antd';
import { DefaultTFuncReturn } from 'i18next';

export const openNotificationWithIcon = (
  type: 'success' | 'error' | 'warning',
  message: string,
  error: string | DefaultTFuncReturn = ''
) => {
  notification[type]({
    message: message,
    description: type === 'success' ? '' : `${error}`,
    duration: 3,
    placement: 'bottomRight',
  });
};
