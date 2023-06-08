import { Box } from '@mui/material';
import { Completion } from '../../@types/Summary';
import { HistoryCard } from '../HistoryCard';
import { useContext } from 'react';
import ActionContext from '../../context';
import { ActionContextType } from '../../@types/action';
import { CardListProps } from './CardList.types';

const CardList = ({ items }: CardListProps) => {
  const { action } = useContext(ActionContext) as ActionContextType;
  if (items.length === 0) {
    return <></>;
  }

  const { filter, sort } = action;

  let list = [...items];
  if (filter) {
    list = list.filter((v) =>
      v.tags.join(' ').toLowerCase().includes(filter.toLowerCase())
    );
  }

  list = list.sort((a, b) =>
    sort === 'asc'
      ? a.createdDate > b.createdDate
        ? 1
        : -1
      : a.createdDate < b.createdDate
      ? 1
      : -1
  );

  return (
    <>
      {list.map((item: Completion) => (
        <Box key={item._id} display={'flex'} justifyContent={'center'}>
          <HistoryCard data={item} />
        </Box>
      ))}
    </>
  );
};

export default CardList;
