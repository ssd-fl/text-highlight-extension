import { Box, Grid, Typography } from '@mui/material';
import { Completion } from '../../@types/Summary';
import { formatDateTime } from '../../common/helpers';
import { HistoryCardProps } from './HistoryCard.types';

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <Box
      sx={{
        width: 345,
        height: 60,
        overflow: 'hidden',
        backgroundColor: '#404040',
        borderRadius: 1,
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 8px 8px -6px',
        borderColor: '#404040',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#4d4d4d',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      p={2}
      my={1.5}
    >
      <Grid container>
        <Grid item xs={8}>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign={'left'}
            sx={{
              fontSize: 14,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            mr={1}
          >
            {data.keyword}
          </Typography>
        </Grid>
        <Grid item xs={4} display={'flex'} alignItems={'center'}>
          <Typography
            variant="subtitle2"
            color="white"
            textAlign={'right'}
            sx={{ fontSize: 12 }}
          >
            {formatDateTime(data.createdDate)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="white" align="left" sx={{ fontSize: 13 }} mt={1}>
            {data.text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

HistoryCard.displayName = 'HistoryCard';

export { HistoryCard };
