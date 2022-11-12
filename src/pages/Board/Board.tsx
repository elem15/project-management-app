import { AddModal } from 'components/Modal/Modal.Window';
import React from 'react';

const Board: React.FC = () => (
  <AddModal
    typeButton={'primary'}
    titleTextButton={'Add column'}
    titleTextModal={'Add column'}
    titleForm={'Column title'}
    objField={'columnTitle'}
  />
);

export default Board;
