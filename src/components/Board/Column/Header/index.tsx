import React, { useState } from 'react';
import cl from './header.module.scss';
import { useTranslation } from 'react-i18next';

type ColumnHeaderProps = {
  header: string;
  onConfirm: (val: string) => void;
};

export const ColumnHeader: React.FC<ColumnHeaderProps> = (props: ColumnHeaderProps) => {
  const { t } = useTranslation();
  const [columnHeader, setColumnHeader] = useState(props.header);
  const [edit, setEdit] = useState(false);
  const handleConfirm = () => {
    props.onConfirm(columnHeader);
    setEdit(false);
  };
  const handleAbort = () => {
    setEdit(false);
  };
  const handleChange = (changedHeader: string) => {
    setColumnHeader(changedHeader);
  };

  return (
    <>
      {edit ? (
        <>
          <div className="button-mini fa fa-times" title={t('user.abort')} onClick={handleAbort} />
          <div
            className="button-mini fa fa-check"
            title={t('user.apply')}
            onClick={handleConfirm}
          />
          <input
            className={cl.column__header__input}
            value={columnHeader}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          />
        </>
      ) : (
        <h2 className={cl.column__header__title} onClick={() => setEdit(true)}>
          {props.header}
        </h2>
      )}
    </>
  );
};
