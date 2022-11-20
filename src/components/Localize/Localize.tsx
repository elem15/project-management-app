import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const lingRevert = {
  en: 'ru',
  ru: 'en',
};

export default function Localize() {
  const { i18n } = useTranslation();
  const lingChange = () => {
    const ling = i18n.resolvedLanguage as keyof typeof lingRevert;
    i18n.changeLanguage(lingRevert[ling]);
  };
  return (
    <>
      <Button type="text" onClick={lingChange}>
        {i18n.resolvedLanguage.toUpperCase()}
      </Button>
    </>
  );
}